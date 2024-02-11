import * as React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';

import { Database } from '@/lib/types/supabase';
import { createClient } from '@/lib/supabase/server';
import { readUserSession } from '@/lib/actions/read-user-session';

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

// import { MailDisplay } from './components/mail-display';
import { ResumeList } from './components/resume-list';
import { ResumeDropzoneCard } from './components/resume-dropzone-card';

type Resume = Database['public']['Tables']['resumes']['Row'];
type ResumePageProps = {};

const tabs = {
  resumes: 'resumes',
  addResume: 'add-resume'
};

export default async function ResumesPage({}: ResumePageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: sessionData } = await readUserSession();

  if (!sessionData.session) redirect('/login');

  const { user } = sessionData.session;

  const { data: initialResumeList, error } = await supabase
    .from('resumes')
    .select()
    .eq('user_id', user.id);

  if (error) console.error(error);

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
              <ResumeList initialResumeList={initialResumeList as Resume[]} />
            </TabsContent>
            <TabsContent value={tabs.addResume} className="container">
              <ResumeDropzoneCard userId={user.id} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={750}>
          {/* <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          /> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
