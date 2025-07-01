import { useState } from "react";

import { formatCurrency } from "@/utils";
import { DollarSign, Minus, Plus, Trash2 } from "lucide-react";

import { createTransaction } from "@/services/sales";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { CartItem, PaymentMethod } from "@/types/pos";

interface CartSidebarProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string | number, quantity: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onCheckout: (paymentMethod: PaymentMethod) => void;
  onClearCart: () => void;
}

export const CartSidebar = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClearCart,
}: CartSidebarProps) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cash");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const paymentMethods = [
    { id: "cash" as PaymentMethod, label: "Cash", icon: DollarSign },
  ];

  const handleCheckout = async () => {
    const data: {
      product_id: string | number;
      quantity: number;
    }[] = [];

    cartItems.map((item) => {
      data.push({ product_id: item.product.id!, quantity: item.quantity });
    });
    console.log(data);
    const response = await createTransaction(data);
    
    if (response.success) {
      onCheckout(selectedPayment);
    }
  };

  return (
    <Card className='flex h-screen flex-col'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>Cart</CardTitle>
          {cartItems.length > 0 && (
            <Button
              variant='outline'
              size='sm'
              onClick={onClearCart}
              className='text-red-600 hover:text-red-700'
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className='flex-1 overflow-auto px-4'>
        {cartItems.length === 0 ? (
          <div className='py-8 text-center text-gray-500'>
            <div className='mb-2 text-lg'>Cart is empty</div>
            <div className='text-sm'>Add products to get started</div>
          </div>
        ) : (
          <div className='space-y-3'>
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className='flex items-center space-x-3 rounded-lg bg-gray-50 p-3'
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.product.image}`}
                  alt={item.product.name}
                  className='h-12 w-12 rounded object-cover'
                />

                <div className='min-w-0 flex-1'>
                  <div className='truncate text-sm font-medium'>
                    {item.product.name}
                  </div>
                  <div className='font-semibold text-emerald-600'>
                    {formatCurrency("id-ID", "IDR", item.product.price)}
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      onUpdateQuantity(item.product.id!, item.quantity - 1)
                    }
                    className='h-8 w-8 p-0'
                  >
                    <Minus className='h-3 w-3' />
                  </Button>

                  <Badge
                    variant='secondary'
                    className='min-w-[2rem] px-2 py-1 text-center'
                  >
                    {item.quantity}
                  </Badge>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      onUpdateQuantity(item.product.id!, item.quantity + 1)
                    }
                    className='h-8 w-8 p-0'
                  >
                    <Plus className='h-3 w-3' />
                  </Button>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onRemoveItem(item.product.id!)}
                    className='h-8 w-8 p-0 text-red-600 hover:text-red-700'
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {cartItems.length > 0 && (
        <CardFooter className='flex-col space-y-4 pt-4'>
          {/* Payment Methods */}
          <div className='w-full space-y-2'>
            <Label>Payment Method</Label>
            <div className='grid grid-cols-3 gap-2'>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Button
                    key={method.id}
                    variant={
                      selectedPayment === method.id ? "default" : "outline"
                    }
                    size='sm'
                    onClick={() => setSelectedPayment(method.id)}
                    className='flex h-auto flex-col items-center p-3'
                  >
                    <Icon className='mb-1 h-4 w-4' />
                    <span className='text-xs'>{method.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className='w-full space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Subtotal:</span>
              <span>{formatCurrency("id-ID", "IDR", subtotal)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Tax (10%):</span>
              <span>{formatCurrency("id-ID", "IDR", tax)}</span>
            </div>
            <Separator />
            <div className='flex justify-between text-lg font-semibold'>
              <span>Total:</span>
              <span>{formatCurrency("id-ID", "IDR", total)}</span>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className='w-full'
            size='lg'
            disabled={total <= 0}
          >
            Complete Payment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
