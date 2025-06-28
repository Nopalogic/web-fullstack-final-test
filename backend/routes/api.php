<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('users', UserController::class);
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/with-trashed', [UserController::class, 'showAllWithTrashed'])->name('with-trashed');
        Route::get('/only-trashed', [UserController::class, 'showOnlyTrashed'])->name('only-trashed');
        Route::put('/{user}/restore', [UserController::class, 'restore'])->name('restore');
        Route::delete('/{user}/force-delete', [UserController::class, 'forceDelete'])->name('force-delete');
    });

    Route::apiResource('products', ProductController::class);
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/only-trashed', [ProductController::class, 'showOnlyTrashed'])->name('only-trashed');
        Route::put('/{product}/restore', [ProductController::class, 'restore'])->name('restore');
        // Route::delete('/{product}/force-delete', [ProductController::class, 'forceDelete'])->name('force-delete');
    });

  
    Route::apiResource('sales', SaleController::class);
    Route::prefix('sales')->name('sales.')->group(function () {
        Route::get('/only-trashed', [SaleController::class, 'showOnlyTrashed'])->name('only-trashed');
        Route::put('/{sale}/restore', [SaleController::class, 'restore'])->name('restore');
    });
});
    