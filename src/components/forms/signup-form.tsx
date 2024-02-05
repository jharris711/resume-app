'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signup } from '@/lib/actions/signup';
import { cn } from '@/lib/utils';
import { SignUpValidation } from '@/lib/validation/signup';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SignUpForm = ({ className }: SignUpFormProps) => {
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <div className={cn('grid gap-6', className)}>
      <Form {...form}>
        <form className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="email">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="pb-2">
                <FormLabel className="sr-only" htmlFor="email">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button formAction={signup} className={cn(buttonVariants())}>
            Sign Up with Email
          </button>
        </form>
      </Form>
    </div>
  );
};
