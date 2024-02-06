'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '../supabase/server';

export async function createWorkHistory(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser();

  if (getUserError || !user) redirect('/error');

  const data = {
    job_title: formData.get('job_title') as string,
    company_name: formData.get('company_name') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
    location: formData.get('location') as string,
    job_description: formData.get('job_description') as string
  };

  const { error } = await supabase
    .from('work-history')
    .upsert({
      user_id: user.id,
      updated_at: new Date(Date.now()).toISOString(),
      ...data
    })
    .select();

  if (error) {
    console.log(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard/work-history');
}
