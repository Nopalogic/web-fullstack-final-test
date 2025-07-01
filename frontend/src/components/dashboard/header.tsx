import { Fragment, Ref } from "react";
import { useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export const Header = ({ ...props }: HeaderProps) => {
  const { pathname } = useLocation();

  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean) // Remove empty strings
    .map((item, index, array) => {
      const isLastItem = index === array.length - 1;
      const displayText = Number(item) ? "Show" : item;

      return isLastItem ? (
        <BreadcrumbPage key={index} className='font-semibold'>
          {displayText}
        </BreadcrumbPage>
      ) : (
        <Fragment key={index}>
          <BreadcrumbItem>{item}</BreadcrumbItem>
          <BreadcrumbSeparator />
        </Fragment>
      );
    });

  return (
    <header
      className='header-fixed peer/header fixed z-50 flex h-16 w-[inherit] items-center gap-3 bg-background p-4 sm:gap-4'
      {...props}
    >
      <SidebarTrigger variant='outline' className='scale-125 sm:scale-100' />
      <Separator orientation='vertical' />
      <Breadcrumb>
        <BreadcrumbList className='cursor-pointer capitalize'>
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

Header.displayName = "Header";
