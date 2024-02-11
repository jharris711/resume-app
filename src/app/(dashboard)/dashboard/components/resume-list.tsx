'use client';

import { useState, ComponentProps, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { cn } from '@/lib/utils';
import { Database } from '@/lib/types/supabase';

/* import { Badge } from '@/components/ui/badge'; */
import { ScrollArea } from '@/components/ui/scroll-area';
import { createClient } from '@/lib/supabase/client';

type Resume = Database['public']['Tables']['resumes']['Row'];

interface ResumeListProps {
  initialResumeList: Resume[];
}

export function ResumeList({ initialResumeList }: ResumeListProps) {
  const [resumes, setResumes] = useState<Resume[]>(initialResumeList || []);
  const [selected, selectResume] = useState<Resume['id'] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!initialResumeList || !initialResumeList.length) return;

    selectResume(initialResumeList[0].id);
  }, [initialResumeList]);

  useEffect(
    function subscribeToDb() {
      const channel = supabase
        .channel('resumes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'resumes' },
          (payload) => {
            setResumes((prevState) => [payload.new, ...prevState] as Resume[]);
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'resumes' },
          (payload) => {
            setResumes((prevState) => {
              return prevState.filter((x) => x.id !== payload.old.id);
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
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {resumes.map((resume) => (
          <button
            key={resume.id}
            className={cn(
              'hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all',
              selected === resume.id && 'bg-muted'
            )}
            onClick={() => selectResume(resume.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{resume.file_name}</div>
                  {/* {!resume.read && (
                    <span className="flex size-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    selected === resume.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatDistanceToNow(new Date(resume.created_at), {
                    addSuffix: true
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{resume.user_id}</div>
            </div>
            {/* <div className="text-muted-foreground line-clamp-2 text-xs">
              {resume.text.substring(0, 300)}
            </div> */}
            {/* {resume.labels.length ? (
              <div className="flex items-center gap-2">
                {resume.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

/* function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default';
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
} */
