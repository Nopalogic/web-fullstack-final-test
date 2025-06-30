import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

export const CustomBadge = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => (
  <Badge
    className={cn(
      "flex max-h-fit w-[85px] justify-center rounded-full capitalize shadow-none",
      {
        "border-emerald-600/60 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/10 dark:bg-emerald-600/20":
          label === "cashier",
        "rounded-full border-blue-600/60 bg-blue-600/10 text-blue-500 hover:bg-blue-600/10 dark:bg-blue-600/20":
          label === "admin",
      },
      className
    )}
  >
    {label}
  </Badge>
);
