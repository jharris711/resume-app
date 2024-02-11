import React from 'react';
import { ResumeDropzoneCard } from '../components/resume-dropzone-card';
import { readUserSession } from '@/lib/actions/read-user-session';
import { redirect } from 'next/navigation';

export default async function page() {
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  return (
    <div>
      <ResumeDropzoneCard userId={user.id} />
    </div>
  );
}
