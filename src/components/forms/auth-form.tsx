'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { LogInValidation } from '@/lib/validation/login';
import { buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/actions/login';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthForm({ className, ...props }: AuthFormProps) {
  const form = useForm<z.infer<typeof LogInValidation>>({
    resolver: zodResolver(LogInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className={cn('grid gap-6', className)}>
      <Form {...form}>
        <form className='grid gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='sr-only' htmlFor='email'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id='email'
                    type='email'
                    autoCapitalize='none'
                    autoComplete='email'
                    autoCorrect='off'
                    placeholder='Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='pb-2'>
                <FormLabel className='sr-only' htmlFor='email'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button formAction={login} className={cn(buttonVariants())}>
            Sign In with Email
          </button>
        </form>
      </Form>
    </div>
  );
}
