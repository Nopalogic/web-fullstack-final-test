<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     * path="/products",
     * summary="Display a listing of the products.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function index()
    {
        $products = Product::latest()->paginate(10);
        return response()->json(['data' => $products]);
    }

    /**
     * @OA\Post(
     * path="/products",
     * summary="Store a newly created product in storage.",
     * @OA\Response(response="201", description="Success")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            // 'image' => 'nullable|image' // Validasi gambar bisa ditambahkan jika perlu
        ]);

        $validated['creator_id'] = Auth::id();
        $product = Product::create($validated);

        return response()->json([
            'message' => 'Produk berhasil ditambahkan.',
            'data' => $product
        ], 201); // 201 Created
    }

    /**
     * @OA\Get(
     * path="/products/{id}",
     * summary="Display the specified product.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function show(Product $product)
    {
        // Route-Model Binding otomatis menangani 404 Not Found jika produk tidak ada
        return response()->json(['data' => $product]);
    }

    /**
     * @OA\Put(
     * path="/products/{id}",
     * summary="Update the specified product in storage.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|integer|min:0',
            'stock' => 'sometimes|required|integer|min:0',
        ]);

        $validated['editor_id'] = Auth::id();
        $product->update($validated);

        return response()->json([
            'message' => 'Produk berhasil diperbarui.',
            'data' => $product
        ], 200); // 200 OK
    }

    /**
     * @OA\Delete(
     * path="/products/{id}",
     * summary="Remove the specified product from storage.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function destroy(Product $product)
    {
        $product->delete(); // Melakukan soft delete

        return response()->json(['message' => 'Produk berhasil dihapus.'], 200);
    }

    public function showOnlyTrashed()
    {
        $trashedProducts = Product::onlyTrashed()->latest()->paginate(10);

        return response()->json(['data' => $trashedProducts]);
    }

    /**
     * @OA\Put(
     * path="/products/{id}/restore",
     * summary="Mengembalikan produk dari sampah.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    public function restore($id)
    {
        // Cari produk HANYA di dalam data yang sudah di-soft delete
        $product = Product::onlyTrashed()->find($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan di dalam sampah.'], 404);
        }

        $product->restore();

        return response()->json([
            'message' => 'Produk berhasil dikembalikan.',
            'data' => $product
        ], 200);
    }
}
