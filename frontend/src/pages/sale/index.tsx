import { useEffect, useState } from "react";

import { formatCurrency, formatDate } from "@/utils";

import { getTransactions } from "@/services/sales";

import { Main } from "@/components/dashboard/main";
import { DataTable } from "@/components/shared/data-table";
import { DataTableSkeleton } from "@/components/shared/data-table/skeleton";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

import { Sale } from "@/types/sales";
import { columns } from "@/components/sale/columns";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getTransactions();
      if (response.success) {
        setSales(response.data.data);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(sales);
  

  return (
    <Main>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Sales</h1>
        <p className='text-muted-foreground'>
          Here&apos;s a list of your sales!
        </p>
      </div>

      <div>
        {isLoading ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={columns} data={sales} searchedColumn='name' />
        )}
      </div>
    </Main>
  );
}
