'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter
} from '@/components/ui/card';
import { Icons } from '@/components/icons/icons';

import { createClient } from '@/lib/supabase/client';

const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'text/plain': ['.txt'],
  'application/rtf': ['.rtf']
};

export function ResumeDropzoneCard({ userId }: { userId: string }) {
  const [currentFile, setCurrentFile] = React.useState<File | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setCurrentFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ACCEPTED_FILE_TYPES
  });

  const handleUploadResume = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentFile)
      return {
        data: null,
        error: 'No file to upload'
      };

    const { data: storedFile, error } = await supabase.storage
      .from('resumes')
      .upload(currentFile.name, currentFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Can't save resume to DB", error);
      return;
    }

    const resume = {
      /* @ts-ignore */
      file_id: storedFile.id,
      /* @ts-ignore */
      file_path: storedFile.fullPath,
      file_name: storedFile.path,
      updated_at: new Date(Date.now()).toISOString(),
      user_id: userId
    };

    const { error: resumeUploadError } = await supabase
      .from('resumes')
      .upsert(resume)
      .select();

    if (resumeUploadError) router.push('/error');
  };

  return (
    <Card className="size-full">
      <CardHeader className="flex flex-col items-center p-4">
        <div className="text-center">
          <Icons.upload className="mx-auto size-12" />
          {isDragActive ? (
            <>
              <CardTitle className="mt-4 shrink-0">
                Drop your resume here
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-none">
                Let&apos;s get to work
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="mt-4 shrink-0">Drop your resume</CardTitle>
              <CardDescription className="mt-2 text-sm leading-none">
                or click to browse
              </CardDescription>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent
        className="flex cursor-pointer items-center justify-center p-4"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div
          className={`flex w-full flex-col items-center rounded-lg border-2 ${isDragActive ? 'border-primary bg-primary-foreground border' : currentFile ? 'border-primary' : 'border-dashed border-gray-200'} p-6 text-center text-gray-200 shadow-sm hover:shadow-md`}
        >
          <Icons.fileText
            className={`size-8 ${currentFile ? 'stroke-primary' : ''}`}
          />
          <p className="mt-4 text-sm leading-none">
            {currentFile ? `${currentFile.name}` : 'Drop files here'}
          </p>
        </div>
      </CardContent>
      <form action="">
        <CardFooter className="flex w-full items-center justify-around gap-4">
          <Button className="w-full" onClick={handleUploadResume}>
            <Icons.upload className="mr-2 size-4 " /> Upload
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={(e: React.FormEvent) => {
              e.preventDefault();

              setCurrentFile(null);
            }}
          >
            <Icons.trash className="mr-2 size-4" /> Reset
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
