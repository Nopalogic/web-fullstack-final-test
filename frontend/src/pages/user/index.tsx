import { useEffect, useState } from "react";

import { getUsers } from "@/services/user";

import { DataTable } from "@/components/shared/data-table";
import { DataTableSkeleton } from "@/components/shared/data-table/skeleton";
import { columns } from "@/components/user/columns";

import { User } from "@/types/user";
import { Main } from "@/components/dashboard/main";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Main>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight'>Users</h1>
        <p className='text-muted-foreground'>
          Here&apos;s a list of your staff!
        </p>
      </div>

      <div>
        {isLoading ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={columns} data={users} searchedColumn="name" />
        )}
      </div>
    </Main>
  );
}
