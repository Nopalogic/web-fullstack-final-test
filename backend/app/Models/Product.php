<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'price',
        'stock',
        'image',
        'creator_id',
        'editor_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'integer',
        'stock' => 'integer',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['image_url'];

    /**
     * Secara otomatis menghapus file gambar saat model dihapus.
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {
            // Cek jika ada path gambar sebelum menghapus
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
        });
    }

    /**
     * Accessor untuk mendapatkan URL lengkap dari gambar.
     * Atribut ini akan menjadi 'image_url' di response JSON.
     *
     * @return string|null
     */
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            return Storage::url($this->image);
        }
        return null;
    }

    /**
     * Mendapatkan detail penjualan yang terkait dengan produk ini.
     */
    public function salesDetails(): HasMany
    {
        return $this->hasMany(SaleDetail::class);
    }

    /**
     * Mendapatkan user yang membuat produk ini (creator).
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * Mendapatkan user yang terakhir mengubah produk ini (editor).
     */
    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'editor_id');
    }
}
