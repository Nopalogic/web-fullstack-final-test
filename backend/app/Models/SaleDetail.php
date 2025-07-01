<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SaleDetail extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     * Laravel akan mencoba mencari tabel 'sale_details' (plural), jadi ini tidak wajib.
     * Tapi terkadang baik untuk menuliskannya secara eksplisit.
     * @var string
     */
    protected $table = 'sales_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'subtotal',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'subtotal' => 'integer',
    ];

    /**
     * Relasi yang akan otomatis di-load (eager loaded).
     *
     * @var array
     */
    protected $with = ['product'];

    /**
     * Mendapatkan data penjualan utama dari detail ini.
     */
    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }

    /**
     * Mendapatkan data produk dari detail ini.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}