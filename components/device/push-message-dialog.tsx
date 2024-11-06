'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';

import { useTaskStore } from '@/lib/store';

export default function NewTaskDialog() {
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== 'string' || typeof description !== 'string') return;
    addTask(title, description);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='secondary'
          size='sm'
        >
          Push 메세지 보내기
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Push 메세지 작성</DialogTitle>
          <DialogDescription>
            선택한 디바이스를 대상으로 메세지를 전송합니다
          </DialogDescription>
        </DialogHeader>
        <form
          id='todo-form'
          className='grid gap-4 py-4'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input
              id='title'
              name='title'
              placeholder='title...'
              className='col-span-4'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Textarea
              id='content'
              name='content'
              placeholder='content...'
              className='col-span-4'
            />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              type='submit'
              size='sm'
              form='todo-form'
            >
              보내기
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
