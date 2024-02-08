import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentResumesList() {
  const date = new Date().toLocaleDateString();

  /**
   * TODO: Limit to 5 resumes in list
   */
  function ResumeListItem() {
    return (
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            To: Lockheed-Martin
          </p>
          <p className="text-muted-foreground text-sm">Created: {date}</p>
        </div>
        <div className="ml-auto font-medium">Submitted</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ResumeListItem />
    </div>
  );
}
