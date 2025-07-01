<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        return response()->json([
            'success' => true,
            'message' => 'Product details retrieved successfully',
            'data' => $products
        ]);
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Validasi lebih spesifik
        ]);

        // Handle File Upload
        if ($request->hasFile('image')) {
            // Simpan gambar di folder 'public/products' dan simpan path-nya
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $validated['creator_id'] = Auth::id();
        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan.',
            'data' => $product
        ], 201);
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
        return response()->json([
            'success' => true,
            'message' => 'Products list retrieved successfully',
            'data' => $product
        ]);
    }

    /**
     * @OA\Put(
     * path="/products/{id}",
     * summary="Update the specified product in storage.",
     * @OA\Response(response="200", description="Success")
     * )
     */
    // app/Http/Controllers/Api/ProductController.php

public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);

    // Langkah 1: Validasi HANYA data yang bukan file.
    // 'sometimes' berarti validasi hanya berjalan jika field tersebut ada di request.
    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'price' => 'sometimes|required|integer|min:0',
        'stock' => 'sometimes|required|integer|min:0',
    ]);

    // Langkah 2: Update produk dengan data yang sudah divalidasi.
    $product->update($validated);

    // Langkah 3: Handle gambar HANYA jika file baru diunggah.
    if ($request->hasFile('image')) {
        // Validasi khusus untuk file gambar
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Hapus gambar lama jika ada
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        // Simpan gambar baru dan update path di model
        $product->image = $request->file('image')->store('products', 'public');
    }

    // Langkah 4: Set editor dan simpan semua perubahan.
    $product->editor_id = Auth::id();
    $product->save();

    return response()->json([
        'success' => true,
        'message' => 'Product updated successfully',
        'data' => $product
    ], 200);
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

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus.'
        ], 200);
    }

    public function showOnlyTrashed()
    {
        $trashedProducts = Product::onlyTrashed()->latest()->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Products trashed retrieved successfully',
            'data' => $trashedProducts
        ]);
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
            return response()->json([
                'message' => 'Produk tidak ditemukan di dalam sampah.'
            ], 404);
        }

        $product->restore();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dikembalikan.',
            'data' => $product
        ], 200);
    }
}
