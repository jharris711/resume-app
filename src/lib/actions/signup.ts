'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  // Sign up user to Auth service
  const { data: res, error: authError } = await supabase.auth.signUp(data);

  if (authError) {
    redirect('/error');
  }

  if (res && res.user) {
    // Save auth user to DB
    const { error: dbError } = await supabase.from('profiles').insert({
      id: res.user.id,
      email: res.user.email
    });

    if (dbError) {
      redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
  }
}
