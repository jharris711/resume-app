'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/supabase';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { Icons } from '@/components/icons/icons';

import { ResumeList } from './resume-list';
import { ResumeDropzoneCard } from './resume-dropzone-card';
import { ResumeDisplay } from './resume-display';

type Resume = Database['public']['Tables']['resumes']['Row'];

interface ResumeProps {
  initialResumeList: Resume[];
  userId: string;
}

const tabs = {
  resumes: 'resumes',
  addResume: 'add-resume'
};

export default function Resume({ initialResumeList, userId }: ResumeProps) {
  const [resumes, setResumes] = useState<Resume[]>(initialResumeList || []);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(
    initialResumeList[0]
  );
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const supabase = createClient();

  useEffect(() => {
    if (!selectedResume || !selectedResume.file_name) return;
    console.log('selectedResume.file_path', selectedResume.file_path);

    supabase.storage
      .from('resumes')
      .createSignedUrl(selectedResume.file_name, 60)
      .then(({ data }) => {
        if (!data) return;
        console.log('publicUrl', data.signedUrl);

        setSelectedFileUrl(data.signedUrl);
      })
      .catch((err) => {});
  }, [selectedResume, supabase]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={400}>
          <Tabs defaultValue={tabs.resumes}>
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Resumes</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value={tabs.resumes}
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icons.fileText className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View</p>
                    </TooltipContent>
                  </Tooltip>{' '}
                </TabsTrigger>
                <TabsTrigger
                  value={tabs.addResume}
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icons.add className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
              <form>
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-2 top-2.5 size-4" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value={tabs.resumes} className="m-0">
              <ResumeList
                initialResumeList={initialResumeList as Resume[]}
                resumes={resumes}
                selectedResume={selectedResume}
                setResumes={setResumes}
                setSelectedResume={setSelectedResume}
              />
            </TabsContent>
            <TabsContent value={tabs.addResume} className="container">
              <ResumeDropzoneCard userId={userId} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={750}>
          <ResumeDisplay
            resume={
              resumes.find((item) => item.id === selectedResume?.id) || null
            }
            selectedFilePublicUrl={selectedFileUrl}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
