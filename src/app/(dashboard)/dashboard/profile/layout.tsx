import { redirect } from 'next/navigation';

import { readUserSession } from '@/lib/actions/read-user-session';

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  return <div>{children}</div>;
};

export default SettingsLayout;
