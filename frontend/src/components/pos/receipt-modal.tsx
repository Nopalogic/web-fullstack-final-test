import { formatCurrency, formatDate } from "@/utils";
import { Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { Transaction } from "@/types/pos";

interface ReceiptModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal = ({
  transaction,
  isOpen,
  onClose,
}: ReceiptModalProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    const receiptText = generateReceiptText();
    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${transaction.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateReceiptText = () => {
    return `
RETAILPOS RECEIPT
================
Transaction ID: ${transaction.id}
Date: ${formatDate(transaction.timestamp)}
Cashier: ${transaction.cashierName}

ITEMS:
${transaction.items
  .map(
    (item) =>
      `${item.product.name} x${item.quantity} - ${formatCurrency("id-ID", "IDR", item.product.price * item.quantity)}`
  )
  .join("\n")}

SUMMARY:
Subtotal: ${formatCurrency("id-ID", "IDR", transaction.subtotal)}
Tax: ${formatCurrency("id-ID", "IDR", transaction.tax)}
${transaction.discount > 0 ? `Discount: -${formatCurrency("id-ID", "IDR", transaction.discount)}\n` : ""}Total: $${transaction.total}

Payment Method: ${transaction.paymentMethod.toUpperCase()}

Thank you for your purchase!
    `.trim();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 print:text-black'>
          {/* Header */}
          <div className='text-center'>
            <h3 className='text-xl font-bold'>Jua Bareh</h3>
            <p className='text-sm text-gray-600'>Transaction Receipt</p>
          </div>

          <Separator />

          {/* Transaction Info */}
          <div className='space-y-1 text-sm'>
            <div className='flex justify-between'>
              <span>Transaction ID:</span>
              <span className='font-mono'>{transaction.id}</span>
            </div>
            <div className='flex justify-between'>
              <span>Date:</span>
              <span>{formatDate(transaction.timestamp)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Cashier:</span>
              <span>{transaction.cashierName}</span>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div className='space-y-2'>
            <h4 className='font-semibold'>Items:</h4>
            {transaction.items.map((item, index) => (
              <div key={index} className='flex justify-between text-sm'>
                <div className='flex-1'>
                  <div>{item.product.name}</div>
                  <div className='text-gray-600'>
                    {formatCurrency("id-ID", "IDR", item.product.price)} x{" "}
                    {item.quantity}
                  </div>
                </div>
                <div className='font-semibold'>
                  {formatCurrency(
                    "id-ID",
                    "IDR",
                    item.product.price * item.quantity
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Summary */}
          <div className='space-y-1 text-sm'>
            <div className='flex justify-between'>
              <span>Subtotal:</span>
              <span>
                {formatCurrency("id-ID", "IDR", transaction.subtotal)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Tax (8%):</span>
              <span>{formatCurrency("id-ID", "IDR", transaction.tax)}</span>
            </div>
            <Separator />
            <div className='flex justify-between text-lg font-semibold'>
              <span>Total:</span>
              <span>{formatCurrency("id-ID", "IDR", transaction.total)}</span>
            </div>
          </div>

          <div className='text-center text-sm text-gray-600'>
            <div>Payment Method: {transaction.paymentMethod.toUpperCase()}</div>
            <div className='mt-2'>Thank you for your purchase!</div>
          </div>

          {/* Actions */}
          <div className='flex space-x-2 print:hidden'>
            <Button onClick={handlePrint} className='flex-1' variant='outline'>
              <Printer className='mr-2 h-4 w-4' />
              Print
            </Button>
            <Button
              onClick={handleDownload}
              className='flex-1'
              variant='outline'
            >
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
