<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all(); // Changed variable name to plural for clarity

        if ($users->isEmpty()) {
            return response()->json(['message' => 'Tidak ada user yang terdaftar'], 404); // Using 404 Not Found for no resources
        }

        return response()->json(['message' => 'User list retrieved successfully', 'data' => $users]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'role'     => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'User berhasil dibuat', 'data' => $user], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::select('id', 'name', 'email', 'role', 'created_at')->find($id);
        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }
        return response()->json([
            'message' => 'User details retrieved successfully',
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'role' => 'nullable|string|max:10',
            'password' => 'nullable|string|min:6',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json(['message' => 'User updated successfully', 'data' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User removed successfully']);
    }

    public function restore($id)
    {
        // Mencari user yang sudah di-soft delete
        $user = User::withTrashed()->find($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan atau belum dihapus'], 404);
        }

        // Memulihkan user
        $user->restore(); // Mengatur `deleted_at` kembali ke NULL

        return response()->json(['message' => 'User berhasil dipulihkan'], 200);
    }

    /**
     * Permanently delete the specified user.
     */
    public function forceDelete($id)
    {
        // Mencari user yang sudah di-soft delete (atau yang belum jika ingin langsung hapus permanen)
        $user = User::withTrashed()->find($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        // Menghapus user secara permanen dari database
        $user->forceDelete();

        return response()->json(['message' => 'User berhasil dihapus permanen'], 200);
    }

    /**
     * Get all users, including soft deleted ones.
     */
    public function showAllWithTrashed()
    {
        $users = User::withTrashed()->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'Tidak ada user terdaftar (termasuk yang dihapus)'], 404);
        }

        return response()->json(['message' => 'Daftar user (termasuk yang dihapus) berhasil diambil', 'data' => $users]);
    }

    /**
     * Get only soft deleted users.
     */
    public function showOnlyTrashed()
    {
        $users = User::onlyTrashed()->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'Tidak ada user yang di-soft delete'], 404);
        }

        return response()->json(['message' => 'Daftar user yang di-soft delete berhasil diambil', 'data' => $users]);
    }
}
