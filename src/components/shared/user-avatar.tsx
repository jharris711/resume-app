import { AvatarProps } from '@radix-ui/react-avatar';

import { Database } from '@/lib/types/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/shared/icons';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserAvatarProps extends AvatarProps {
  user: Pick<Profile, 'full_name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarFallback>
        <span className='sr-only'>{user.full_name}</span>
        <Icons.user className='h-4 w-4' />
      </AvatarFallback>
    </Avatar>
  );
}
