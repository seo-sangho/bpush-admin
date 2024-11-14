import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { push_history } from '@prisma/client';

export function RecentSales({ users }: { users: push_history[] }) {
  console.log(`${users}`);
  return (
    <div className='space-y-8'>
      {users.map((element, index) => {
        return (
          <div
            className='flex items-center'
            key={index}
          >
            <Avatar className='h-9 w-9'>
              {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className='ml-4 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {element.TITLE}
              </p>
              <p className='text-sm text-muted-foreground'>{element.CONTENT}</p>
            </div>
            <div className='ml-auto font-medium'>{element.USER_ID}</div>
          </div>
        );
      })}
    </div>
  );
}
