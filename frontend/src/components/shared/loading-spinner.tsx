import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex h-screen w-full items-center justify-center",
      className
    )}
  >
    <div className='h-7 w-7 animate-spin rounded-full border-[3px] border-secondary border-t-primary' />
  </div>
);
