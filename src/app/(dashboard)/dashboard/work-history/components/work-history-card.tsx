import { CircleIcon } from '@radix-ui/react-icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Database } from '@/lib/types/supabase';
import { WorkHistoryCardMenu } from './work-history-card-menu';

type WorkHistory = Database['public']['Tables']['work-history']['Row'];

export function WorkHistoryCard({ workHistory }: { workHistory: WorkHistory }) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-2">
          <CardTitle>{workHistory.job_title}</CardTitle>
          <div className="text-md text-muted-foreground flex items-center">
            {workHistory.company_name}
            <span className="pl-1 italic">{workHistory.location}</span>
          </div>
          <Separator />
          <CardDescription>{workHistory.job_description}</CardDescription>
        </div>
        <WorkHistoryCardMenu workHistory={workHistory} />
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex space-x-4 text-sm">
          <div className="flex items-center">
            <CircleIcon className="mr-1 size-3 fill-green-400 text-green-400" />
            {workHistory.start_date}
          </div>
          <div className="flex items-center">
            <CircleIcon className="mr-1 size-3 fill-red-400 text-red-400" />
            {workHistory.end_date}
          </div>
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
}
