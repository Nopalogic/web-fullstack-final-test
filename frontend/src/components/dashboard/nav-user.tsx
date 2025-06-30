import { useNavigate } from "react-router";

import { LogOut } from "lucide-react";

import { logoutUser } from "@/services/auth";

import { useAuthStore } from "@/stores/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

export default function NavUser({
  name,
  username,
}: {
  name?: string;
  username?: string;
}) {
  const { isMobile } = useSidebar();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (!response.success) throw new Error("Logout failed");
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <img
                src='/user-placeholder.png'
                className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'
              />
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='line-clamp-1 truncate font-semibold'>
                  {name}
                </span>
                <span className='line-clamp-1 truncate text-xs'>
                  {username}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? "bottom" : "right"}
            align='end'
            sideOffset={9}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='line-clamp-1 truncate font-semibold'>
                    {name}
                  </span>
                  <span className='line-clamp-1 truncate text-xs'>
                    {username}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
