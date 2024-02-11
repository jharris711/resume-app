import React from 'react';
import { FileDropzoneCard } from '../components/file-dropzone-card';
import { readUserSession } from '@/lib/actions/read-user-session';
import { redirect } from 'next/navigation';

export default async function page() {
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  return (
    <div>
      <FileDropzoneCard userId={user.id} />
    </div>
  );
}
