import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Package, Plus } from "lucide-react";

import { getProducts } from "@/services/product";

import { Main } from "@/components/dashboard/main";
import { ProductCard } from "@/components/product/product-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Product } from "@/types/product";
import { Separator } from "@/components/ui/separator";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data.data);
        setIsLoading(false);
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <Main fixed>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Products</h1>
        <p className='text-muted-foreground'>
          Manage your inventory and product information
        </p>
      </div>

      <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
        <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
          <Input
            placeholder='Search by name...'
            className='h-9 w-40 lg:w-[250px]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to='/dashboard/products/create'>
          <Button className='flex items-center space-x-2'>
            <Plus className='h-4 w-4' />
            <span>Add Product</span>
          </Button>
        </Link>
      </div>
      <Separator className='shadow mb-4' />
      <ul className='no-scrollbar grid gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className='py-12 text-center'>
            <Package className='mx-auto mb-4 h-12 w-12 text-gray-400' />
            <div className='text-lg text-gray-500'>No products found</div>
            <div className='mt-1 text-sm text-gray-400'>
              Try adjusting your search criteria or add new products
            </div>
          </div>
        )}
      </ul>
    </Main>
  );
}
