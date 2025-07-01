import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { useTransactions } from "@/hooks/use-transactions";

import { Product } from "@/types/product";

import { CartSidebar } from "@/components/pos/cart-sidebar";
import { ProductGrid } from "@/components/pos/product-grid";
import { ReceiptModal } from "@/components/pos/receipt-modal";
import { PaymentMethod } from "@/types/pos";

interface POSViewProps {
  onTransactionComplete?: () => void;
}

export const POSView = ({ onTransactionComplete }: POSViewProps) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
  } = useCart();

  const { addTransaction } = useTransactions();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentReceipt, setCurrentReceipt] = useState<any>(null);

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast({ title: "Product out of stock" });
      return;
    }

    addToCart(product);
    toast({ title: `${product.name} added to cart` });
  };

  const handleCheckout = (paymentMethod: PaymentMethod, discount: number) => {
    if (cartItems.length === 0) return;

    const transaction = addTransaction(cartItems, paymentMethod, discount);
    setCurrentReceipt(transaction);
    clearCart();

    toast({ title: "Transaction completed successfully!" });
    onTransactionComplete?.();
  };

  return (
    <div className='flex h-full bg-gray-50'>
      {/* Main Content - Product Grid */}
      <div className='flex-1 overflow-auto p-6'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900'>Products</h2>
            <p className='mt-1 text-gray-600'>
              Select products to add to cart • {getCartItemCount()} items in
              cart
            </p>
          </div>

          <ProductGrid onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* Sidebar - Cart */}
      <div className='w-96 border-l border-gray-200 bg-white'>
        <CartSidebar
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          onClearCart={clearCart}
        />
      </div>

      {/* Receipt Modal */}
      {currentReceipt && (
        <ReceiptModal
          transaction={currentReceipt}
          isOpen={!!currentReceipt}
          onClose={() => setCurrentReceipt(null)}
        />
      )}
    </div>
  );
};
