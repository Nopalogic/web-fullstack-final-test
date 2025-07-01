import { useNavigate } from "react-router";

import { formatCurrency, getImageUrl } from "@/utils";
import { Edit } from "lucide-react";

import { removeProduct } from "@/services/product";

import { Product } from "@/types/product";

import AlertDialog from "../shared/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const getStockStatus = (stock: number) => {
  if (stock === 0)
    return { label: "Out of Stock", variant: "destructive" as const };
  if (stock < 10) return { label: "Low Stock", variant: "secondary" as const };
  return { label: "In Stock", variant: "default" as const };
};

export function ProductCard({ id, image, name, stock, price }: Product) {
  const stockStatus = getStockStatus(stock);
  const navigate = useNavigate();

  const handleRemove = async () => {
    const response = await removeProduct(id!);
    if (response.success) {
      window.location.reload();
    }
  };

  return (
    <Card className='transition-shadow duration-200 hover:shadow-lg'>
      <CardContent className='space-y-3 p-0'>
        <div className="rounded-t-lg overflow-hidden">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${getImageUrl(image)}`}
            alt={name}
            className='aspect-square h-full w-full object-cover'
          />
        </div>

        <div className='space-y-3 px-4 pb-4'>
          <div>
            <h3 className='text-lg font-semibold leading-tight'>{name}</h3>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-2xl font-bold text-emerald-600'>
              {formatCurrency("id-ID", "IDR", price)}
            </span>
            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
          </div>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='text-gray-500'>Stock:</span>
              <div className='font-medium'>{stock} units</div>
            </div>
          </div>
          <div className='flex space-x-2 pt-2'>
            <Button
              variant='outline'
              size='sm'
              className='flex-1'
              onClick={() => navigate(`/dashboard/products/${id}`)}
            >
              <Edit className='mr-1 h-4 w-4' />
              Edit
            </Button>
            <AlertDialog onRemove={handleRemove} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
