import {
  Boxes,
  ChartColumnIncreasing,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users
} from "lucide-react";

import { SidebarData } from "@/types/sidebar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Products",
          url: "/dashboard/products",
          icon: Boxes,
        },
        {
          title: "Sales",
          url: "/dashboard/sales",
          icon: ChartColumnIncreasing,
        },
        {
          title: "Staff",
          icon: Users,
          url: "/dashboard/settings",
        },
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Store",
              icon: FolderKanban,
              url: "/dashboard/settings",
            },
            {
              title: "Payment",
              icon: CreditCard,
              url: "/dashboard/payments",
            },
          ],
        },
      ],
    },
  ],
};
