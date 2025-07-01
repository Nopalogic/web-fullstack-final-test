import { useEffect, useState } from "react";

import { formatCurrency, formatDate, formatTime } from "@/utils";
import { Calendar, Filter, ShoppingCart, User } from "lucide-react";

import { getTransactions } from "@/services/sales";

import { Main } from "@/components/dashboard/main";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Sale } from "@/types/sales";

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <Main>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Sales</h1>
        <p className='text-muted-foreground'>
          Here&apos;s a list of your sales!
        </p>
      </div>

      <div className='mt-8'>
        {sales.length === 0 ? (
          <div className='p-8 text-center'>
            <Filter className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
            <h3 className='mb-2 text-lg font-semibold'>No sales found</h3>
            <p className='text-muted-foreground'>
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/50'>
                <TableHead className='font-semibold'>Sale ID</TableHead>
                <TableHead className='font-semibold'>Cashier</TableHead>
                <TableHead className='font-semibold'>Date</TableHead>
                <TableHead className='font-semibold'>Time</TableHead>
                <TableHead className='font-semibold'>Items</TableHead>
                <TableHead className='font-semibold'>Products</TableHead>
                <TableHead className='text-right font-semibold'>
                  Total Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow
                  key={sale.id}
                  className='cursor-pointer transition-colors hover:bg-muted/30'
                >
                  <TableCell className='font-medium'>
                    <div className='flex items-center space-x-2'>
                      <ShoppingCart className='h-4 w-4 text-blue-600' />
                      <span className='font-mono text-sm'>{sale.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <User className='h-4 w-4 text-muted-foreground' />
                      <span>Cashier #{sale.user_id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='h-4 w-4 text-muted-foreground' />
                      <span>{formatDate(sale.sale_date)}</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {formatTime(String(sale.sale_date))}
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary' className='text-xs'>
                      {sale.details.reduce(
                        (sum, detail) => sum + detail.quantity,
                        0
                      )}{" "}
                      items
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col space-y-1'>
                      {sale.details.slice(0, 2).map((detail, index) => (
                        <div key={index} className='text-sm'>
                          <span className='font-medium'>
                            {detail.product.name}
                          </span>
                          <span className='ml-1 text-muted-foreground'>
                            ×{detail.quantity}
                          </span>
                        </div>
                      ))}
                      {sale.details.length > 2 && (
                        <span className='text-xs text-muted-foreground'>
                          +{sale.details.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <span className='text-lg font-bold text-green-600'>
                      {formatCurrency("id-ID", "IDR", sale.total_amount)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Main>
  );
}
