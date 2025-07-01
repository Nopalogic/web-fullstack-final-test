import { Outlet } from "react-router";

import { POSSidebar } from "@/components/pos/sidebar";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function CashierLayout() {
  return (
    <ProtectedRoute allowedRoles={["cashier"]}>
      <SidebarProvider defaultOpen={false}>
        <POSSidebar />
        <div
          id='content'
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
