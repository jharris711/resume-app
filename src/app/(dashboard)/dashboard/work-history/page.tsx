import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';

import { readUserSession } from '@/lib/actions/read-user-session';
import { createClient } from '@/lib/supabase/server';
import { Separator } from '@/components/ui/separator';
import { WorkHistoryForm } from '@/components/forms/work-history-form';
import { WorkHistoryCardList } from './components/work-history-card-list';

export default async function WorkHistoryPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id);

  if (error) {
    redirect('/error');
  }
  if (!profile) redirect('/login');

  const { data: initialWorkHistoryList, error: workHistoryError } =
    await supabase.from('work-history').select().eq('user_id', user.id);

  if (workHistoryError) {
    redirect('/error');
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-4 space-y-6 p-4">
        <div>
          <h3 className="text-lg font-medium">Work History</h3>
          <p className="text-muted-foreground text-sm">
            View and edit your most recent positions
          </p>
        </div>
        <Separator />
        <WorkHistoryForm userId={user.id} />
      </div>
      <div className="col-span-3">
        <WorkHistoryCardList initialWorkHistoryList={initialWorkHistoryList} />
      </div>
    </div>
  );
}
