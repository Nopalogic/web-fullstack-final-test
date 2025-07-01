import { Link } from "react-router";

import { ColumnDef } from "@tanstack/react-table";

import { formatCurrency, formatDate } from "@/utils";
import { SquarePen } from "lucide-react";

import { Sale } from "@/types/sales";

import { Button } from "../ui/button";

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "sale_date",
    header: () => <div className='ml-6'>Date</div>,
    cell: ({ row }) => (
      <div className='ml-6 font-medium'>
        {formatDate(row.getValue("sale_date"))}
      </div>
    ),
  },
  {
    accessorKey: "user_id",
    header: () => <div className='text-center'>Cashier Name</div>,
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue("user_id")}</div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div>{formatCurrency("id-ID", "IDR", row.getValue("total_amount"))}</div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className='text-center'>Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className='flex justify-center gap-2'>
          <Link to={`/dashboard/users/${row.getValue("id")}`}>
            <Button variant='ghost' size='icon'>
              <SquarePen className='text-yellow-600' />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
