import * as React from 'react';
import { redirect } from 'next/navigation';

import { readUserSession } from '@/lib/actions/read-user-session';

import { Resume } from './components/resume';

export default async function ResumesPage() {
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  return <Resume userId={user.id} />;
}
