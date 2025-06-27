<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{
    /**
     * @OA\Get(
     * path="/sales",
     * summary="Display a listing of the sales.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function index()
    {
        $sales = Sale::with('user', 'details.product')->latest()->paginate(10);
        return response()->json(['data' => $sales]);
    }

    /**
     * @OA\Post(
     * path="/sales",
     * summary="Store a newly created sale in storage.",
     * @OA\Response(response="201", description="Success")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            $sale = DB::transaction(function () use ($validated) {
                $totalAmount = 0;
                $sale = Sale::create([
                    'user_id' => Auth::id(),
                    'sale_date' => now(),
                    'total_amount' => 0, // Placeholder
                ]);

                foreach ($validated['items'] as $item) {
                    $product = Product::find($item['product_id']);
                    if ($product->stock < $item['quantity']) {
                        throw new \Exception('Stok produk "' . $product->name . '" tidak mencukupi.');
                    }
                    
                    $subtotal = $product->price * $item['quantity'];
                    $totalAmount += $subtotal;
                    $sale->details()->create([
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                        'subtotal' => $subtotal,
                    ]);
                    $product->decrement('stock', $item['quantity']);
                }

                $sale->update(['total_amount' => $totalAmount]);
                return $sale;
            });

            $sale->load('user', 'details.product');
            return response()->json([
                'message' => 'Transaksi berhasil disimpan.',
                'data' => $sale
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan transaksi.',
                'error' => $e->getMessage()
            ], 422); // 422 Unprocessable Entity lebih cocok untuk error bisnis seperti ini
        }
    }

    /**
     * @OA\Get(
     * path="/sales/{id}",
     * summary="Display the specified sale.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function show(Sale $sale)
    {
        $sale->load('user', 'details.product');
        return response()->json(['data' => $sale]);
    }

    /**
     * @OA\Delete(
     * path="/sales/{id}",
     * summary="Cancel a sale and restore stock.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function destroy(Sale $sale)
    {
        // Logika pembatalan/refund yang benar harusnya mengembalikan stok produk
        DB::transaction(function () use ($sale) {
            foreach ($sale->details as $detail) {
                Product::find($detail->product_id)->increment('stock', $detail->quantity);
            }
            $sale->delete(); // Soft delete transaksi
        });

        return response()->json(['message' => 'Transaksi berhasil dibatalkan dan stok dikembalikan.'], 200);
    }
}