import { Link } from "react-router";

import { ColumnDef } from "@tanstack/react-table";

import { SquarePen } from "lucide-react";

import { removeUser } from "@/services/user";


import { User } from "@/types/user";

import AlertDialog from "../shared/alert-dialog";
import { CustomBadge } from "../shared/custom-badge";
import { Button } from "../ui/button";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => <div className='ml-6'>Name</div>,
    cell: ({ row }) => (
      <div className='ml-6 font-medium'>{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className='text-center'>Role</div>,
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <CustomBadge label={row.getValue("role")} />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className='text-center'>Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const handleRemove = async () => {
        try {
          const response = await removeUser(row.getValue("id"));
          if (response.success) {
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className='flex justify-center gap-2'>
          <Link to={`/dashboard/users/${row.getValue("id")}`}>
            <Button variant='ghost' size='icon'>
              <SquarePen className='text-yellow-600' />
            </Button>
          </Link>
          <AlertDialog onRemove={handleRemove} />
        </div>
      );
    },
  },
];
