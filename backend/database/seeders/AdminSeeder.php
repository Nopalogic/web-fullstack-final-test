<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',  //Nama Admin
            'username' => 'admin',
            'role' => 'admin',
            'password' => Hash::make('password'), //Masukan password admin, ubah kata password dengan kata yg lain
            'created_at' => now(),
            'updated_at' => now(),

        ]);
    }
}
