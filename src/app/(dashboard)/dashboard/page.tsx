import * as React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { readUserSession } from '@/lib/actions/read-user-session';

import ResumeColumn from './components/resume-column';

export default async function ResumesPage() {
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  return <ResumeColumn userId={user.id} />;
}
