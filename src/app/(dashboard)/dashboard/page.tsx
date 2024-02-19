import * as React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Database } from '@/lib/types/supabase';
import { createClient } from '@/lib/supabase/server';
import { readUserSession } from '@/lib/actions/read-user-session';

import Resume from './components/resume';

type Resume = Database['public']['Tables']['resumes']['Row'];

export default async function ResumesPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  const { data: initialResumeList, error } = await supabase
    .from('resumes')
    .select()
    .eq('user_id', user.id);

  if (error) console.error(error);

  return <Resume userId={user.id} />;
}
