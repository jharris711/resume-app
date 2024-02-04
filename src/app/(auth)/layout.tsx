import { redirect } from 'next/navigation';

import { readUserSession } from '@/lib/actions/read-user-session';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect('/dashboard');
  }

  return <div className='min-h-screen'>{children}</div>;
}
