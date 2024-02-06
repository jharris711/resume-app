'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '../supabase/server';

export async function updateProfile(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser();

  if (getUserError || !user) redirect('/error');

  const data = {
    full_name: formData.get('full_name') as string,
    summary: formData.get('summary') as string,
    linkedin: formData.get('linkedin') as string,
    github: formData.get('github') as string,
    twitter: formData.get('twitter') as string,
    website: formData.get('website') as string
  };

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      updated_at: new Date(Date.now()).toISOString(),
      ...data
    })
    .select();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard/profile');
}
