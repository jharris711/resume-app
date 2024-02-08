'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { WorkHistoryValidation } from '@/lib/validation/work-history';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '../icons/icons';
import { Calendar } from '../ui/calendar';
import { createClient } from '@/lib/supabase/client';

type WorkHistoryFormValues = z.infer<typeof WorkHistoryValidation>;

export function WorkHistoryForm({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const defaultValues: Partial<WorkHistoryFormValues> = {
    job_title: '',
    company_name: '',
    location: '',
    start_date: '',
    end_date: '',
    job_description: ''
  };

  const form = useForm<WorkHistoryFormValues>({
    resolver: zodResolver(WorkHistoryValidation),
    defaultValues,
    mode: 'onChange'
  });

  const handleSubmit = async (data: WorkHistoryFormValues) => {
    const { error } = await supabase
      .from('work-history')
      .upsert({
        user_id: userId,
        updated_at: new Date(Date.now()).toISOString(),
        ...data
      })
      .select();

    if (error) {
      router.push('/error');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="job_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="flex flex-row justify-start gap-6">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Icons.calendar className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value ?? '')}
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate?.toISOString());
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Icons.calendar className="style-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value ?? '')}
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate?.toISOString());
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </span>

        <FormField
          control={form.control}
          name="job_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description/Duties</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Summarize your experience and responsibilities"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Work History</Button>
      </form>
    </Form>
  );
}
