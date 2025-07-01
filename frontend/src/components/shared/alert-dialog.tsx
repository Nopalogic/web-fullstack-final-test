import { useState } from "react";

import { OctagonAlert, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AlertDialog({ onRemove }: { onRemove: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = async () => {
    try {
      await onRemove();
      setIsOpen(false);
    } catch (error) {
      console.error("Remove action failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Trash2 className='text-destructive' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='items-center'>
          <DialogTitle>
            <div className='mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10'>
              <OctagonAlert className='h-7 w-7 text-destructive' />
            </div>
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className='text-center text-[15px]'>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-2 sm:justify-center'>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button variant='destructive' onClick={handleRemove}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
