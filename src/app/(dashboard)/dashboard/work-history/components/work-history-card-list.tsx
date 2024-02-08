'use client';

import React, { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/supabase';
import { WorkHistoryCard } from './work-history-card';

type WorkHistory = Database['public']['Tables']['work-history']['Row'];

export function WorkHistoryCardList({
  initialWorkHistoryList
}: {
  initialWorkHistoryList: WorkHistory[];
}) {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>(
    initialWorkHistoryList.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  );
  const supabase = createClient();

  useEffect(
    function subscribeToDb() {
      const channel = supabase
        .channel('work-history')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'work-history' },
          (payload) => {
            setWorkHistory(
              (prevWorkHistory) =>
                [payload.new, ...prevWorkHistory] as WorkHistory[]
            );
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'work-history' },
          (payload) => {
            setWorkHistory((prevWorkHistory) => {
              return prevWorkHistory.filter((x) => x.id !== payload.old.id);
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    [supabase]
  );

  return (
    <div className="space-y-4">
      {workHistory.length ? (
        workHistory.map((workHistory) => {
          return (
            <WorkHistoryCard key={workHistory.id} workHistory={workHistory} />
          );
        })
      ) : (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Add some of your previous positions!
        </h4>
      )}
    </div>
  );
}
