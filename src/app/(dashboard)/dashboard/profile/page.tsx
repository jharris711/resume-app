import { redirect } from 'next/navigation';

import { readUserSession } from '@/lib/actions/read-user-session';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/components/forms/profile-form';

export default async function SettingsProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { data: profile, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', sessionData.session.user.id);

  if (error) redirect('/error');
  if (!profile) redirect('/login');

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          View and edit your profile details
        </p>
      </div>
      <Separator />
      <ProfileForm profile={profile[0]} />
    </div>
  );
}
