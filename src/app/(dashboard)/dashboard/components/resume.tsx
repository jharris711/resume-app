'use client';

import React, { useState, useEffect } from 'react';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/supabase';

import { CardContent, Card } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';

import { ResumeDropzoneCard } from './resume-dropzone-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Resume = Database['public']['Tables']['resumes']['Row'];

interface ResumeProps {
  userId: string;
}

export function Resume({ userId }: ResumeProps) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const supabase = createClient();

  useEffect(() => {
    if (!resume || !resume.file_name) return;
    console.log('resume.file_path', resume.file_path);

    supabase.storage
      .from('resumes')
      .createSignedUrl(resume.file_name, 60)
      .then(({ data }) => {
        if (!data) return;
        console.log('publicUrl', data.signedUrl);

        setSelectedFileUrl(data.signedUrl);
      })
      .catch((err) => {});
  }, [resume, supabase]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={400}
          className="container flex flex-col gap-2"
        >
          <ResumeDropzoneCard userId={userId} setResume={setResume} />

          <Card className="max-size-half flex-1 whitespace-pre-wrap text-sm">
            <CardContent className="flex size-full cursor-pointer items-center justify-center p-4">
              <object
                data={selectedFileUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{' '}
                  <a href={selectedFileUrl}>to the PDF!</a>
                </p>
              </object>
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel
          defaultSize={750}
          className="container flex flex-col gap-2"
        >
          <main className="flex h-full flex-col">
            <header className="p-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Resume Assistant
              </h1>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="flex items-end justify-start">
                <div className="max-w-xs rounded-lg border-2 border-blue-100 px-3 py-2 text-blue-800 dark:border-blue-900 dark:text-blue-100">
                  <p>Hello, how can I assist you today?</p>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <div className="border-primary dark:border-primary max-w-xs rounded-lg border-2 px-3 py-2 text-green-800 dark:text-green-100">
                  <p>I need help with my account.</p>
                </div>
              </div>
              <div className="flex items-end justify-start">
                <div className="max-w-xs rounded-lg border-2 border-blue-100 px-3 py-2 text-blue-800 dark:border-blue-900 dark:text-blue-100">
                  <p>
                    Of course, I&apos;d be happy to help. Could you please
                    provide more details?
                  </p>
                </div>
              </div>
            </div>
            <Card className="bg-white p-4 shadow-md dark:bg-gray-800">
              <div className="flex space-x-2">
                <Input
                  className="flex-1"
                  placeholder="Type your message here..."
                />
                <Button>Send</Button>
              </div>
            </Card>
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
