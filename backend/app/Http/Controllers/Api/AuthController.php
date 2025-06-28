<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required|min:6',
        ]);

        // Mencari pengguna berdasarkan username
        $user = User::where('username', $request->username)->first();

        // Jika pengguna tidak ditemukan atau password salah
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Username atau password salah'
            ], 401);
        }

        // Membuat token dan memastikan bahwa token terasosiasi dengan pengguna yang benar
        $token = $user->createToken('api-token')->plainTextToken;

        // Mengembalikan respons JSON sesuai format yang diminta
        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'role' => $user->role,  // Sesuaikan dengan kolom role yang ada pada model User
            ],
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout berhasil']);
    }
}
