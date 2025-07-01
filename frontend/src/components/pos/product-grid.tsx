import { useEffect, useState } from "react";

import { formatCurrency } from "@/utils";
import { Search } from "lucide-react";

import { getProducts } from "@/services/product";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Product } from "@/types/product";

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data.data);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
          <Input
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className='group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg'
            onClick={() => onAddToCart(product)}
          >
            <CardContent className='p-3'>
              <div className='mb-3 aspect-square overflow-hidden rounded-lg'>
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${product.image}`}
                  alt={product.name}
                  className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-110'
                />
              </div>

              <div className='space-y-2'>
                <div className='flex items-start justify-between'>
                  <h3 className='line-clamp-2 text-sm font-medium leading-tight'>
                    {product.name}
                  </h3>
                  <Badge
                    variant={product.stock > 10 ? "secondary" : "destructive"}
                    className='ml-2 flex-shrink-0 text-xs'
                  >
                    {product.stock}
                  </Badge>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-lg font-bold text-emerald-600'>
                    {formatCurrency("id-ID", "IDR", product.price)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className='py-12 text-center'>
          <div className='text-lg text-gray-500'>No products found</div>
          <div className='mt-1 text-sm text-gray-400'>
            Try adjusting your search or filter criteria
          </div>
        </div>
      )}
    </div>
  );
};
