import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { dashboardConfig } from '@/config/dashboard';
import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { UserAccountNav } from '@/components/user-account-nav';
import { createClient } from '@/lib/supabase/server';
import { readUserSession } from '@/lib/actions/read-user-session';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { data: user, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', sessionData.session.user.id);

  if (error) redirect('/error');
  if (!user) redirect('/login');

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="bg-background sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              full_name: user[0].full_name || '',
              email: user[0].email
            }}
          />
        </div>
      </header>
      {/* <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'> */}
      <div className="container grid w-full flex-1 gap-12">
        {/* <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside> */}
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
