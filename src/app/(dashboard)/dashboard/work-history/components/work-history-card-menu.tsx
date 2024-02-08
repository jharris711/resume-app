'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons/icons';
import { Database } from '@/lib/types/supabase';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type WorkHistory = Database['public']['Tables']['work-history']['Row'];

export function WorkHistoryCardMenu({
  workHistory
}: {
  workHistory: WorkHistory;
}) {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await supabase
      .from('work-history')
      .delete()
      .eq('id', workHistory.id);

    if (error) {
      router.push('/error');
    }
  };

  return (
    <div className="bg-secondary text-secondary-foreground flex items-center space-x-1 rounded-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="w-full gap-3 px-2 shadow-none">
            More
            <Icons.ellipsisHorizontal className="text-secondary-foreground size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-5}
          className="w-[200px]"
          forceMount
        >
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.pencil className="mr-2 size-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Icons.trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
