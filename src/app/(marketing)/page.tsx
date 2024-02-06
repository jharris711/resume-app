import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="bg-muted rounded-2xl px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Elevate Your Career with Our AI-Driven Resume Assistant
          </h1>
          <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
            Discover the future of job applications - a smart platform designed
            to tailor your resume perfectly for every opportunity. Join our
            journey in revolutionizing resume customization.
          </p>
          <div className="space-x-4">
            <Link href="/signup" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-24 dark:bg-transparent"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
            Experience personalized resume crafting powered by AI, designed to
            align your unique skills with your dream job effortlessly
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.cpu className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">AI Resume Tailoring</h3>
                <p className="text-muted-foreground text-sm">
                  App dir, Routing, Layouts, Loading UI and API routes
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.checkCircle className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Skill-to-Job Matching</h3>
                <p className="text-muted-foreground text-sm">
                  Maps skills to job requirements precisely
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.bot className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Automated Resume Building</h3>
                <p className="text-muted-foreground text-sm">
                  Create impactful resumes with guided AI
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.layoutTemplate className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Template Customization</h3>
                <p className="text-muted-foreground text-sm">
                  Professional, industry-optimized resume designs
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.messageCircle className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Real-Time Feedback</h3>
                <p className="text-muted-foreground text-sm">
                  Instant, AI-powered resume suggestions
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.wand className="size-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Content Auto-Generation</h3>
                <p className="text-muted-foreground text-sm">
                  Generates key points and summaries effortlessly
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="text-muted-foreground leading-normal sm:text-lg sm:leading-7">
            Our platform also offers a rich resource center and detailed user
            guides to enhance your resume creation experience.
          </p>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Dedicated to Your Career Success
          </h2>
          <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
            Our platform is dedicated to providing you with cutting-edge tools
            for your job search. Enhance your applications with AI-driven
            precision—crafted for the modern job market.
          </p>
          <div className="space-x-4">
            <Link href="/signup" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
