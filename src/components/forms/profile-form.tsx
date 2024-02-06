'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Database } from '@/lib/types/supabase';
import { profileFormSchema } from '@/lib/validation/profile';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateProfile } from '@/lib/actions/update-profile';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ profile }: { profile: Profile }) {
  const defaultValues: Partial<ProfileFormValues> = {
    full_name: profile.full_name ?? '',
    email: profile.email ?? '',
    summary: profile.summary ?? '',
    linkedin: profile.linkedin ?? '',
    github: profile.github ?? '',
    twitter: profile.twitter ?? '',
    website: profile.website ?? ''
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  if (!profile) return;

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input defaultValue={profile.full_name || ''} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  defaultValue={profile.full_name || ''}
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Summarize your experience, skills, and what you&rsquo;re looking for"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input defaultValue={profile.linkedin || ''} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input defaultValue={profile.github || ''} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input defaultValue={profile.twitter || ''} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website/Portfolio</FormLabel>
              <FormControl>
                <Input defaultValue={profile.website || ''} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button formAction={updateProfile} type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
