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
import { useState } from 'react';
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { useTaskStore } from '@/lib/store';
// import { useToast } from '../ui/use-toast';
// import { number } from 'zod';

export default function PushMessageDialog({
  submit,
  selectedCount,
}: {
  submit: any;
  selectedCount: Function;
}) {
  // const addTask = useTaskStore((state) => state.addTask);
  // const { toast } = useToast();

  // const contentRef = useRef();
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, content } = Object.fromEntries(formData);

    // console.log('handleSubmit', title, content);
    // if (typeof title !== 'string' || typeof content !== 'string') return;

    submit(title, content);
    setContent('');
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger
        asChild
        onClick={(e) => {
          if (selectedCount() === 0) {
            e.preventDefault();
            alert('전송 대상이 선택되지 않았습니다.');
            return;
          }
        }}
      >
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
              placeholder='제목 입력(선택 사항)'
              className='col-span-4'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Textarea
              id='content'
              name='content'
              placeholder='Push 메세지 입력'
              className='col-span-4'
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              type='submit'
              size='sm'
              form='todo-form'
              onClick={(e) => {
                if (!content) {
                  e.preventDefault();
                  alert('전달 메세지는 필수입니다.');
                  return;
                }
              }}
            >
              보내기
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
