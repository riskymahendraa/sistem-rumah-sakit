<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// route CRUD doctor
Route::get('/doctor',[DoctorController::class,'index'])->name('doctor.index');
Route::get('/create-doctor', [DoctorController::class,'create'])->name('doctor.create');
Route::post('/doctor', [DoctorController::class,'store'])->name('doctor.store');
route::get('/show-doctor/{id}', [DoctorController::class,'show'])->name('doctor.show');



Route::get('/pasien', function () {
    return Inertia::render('Admin/Pasien/Index');
})->name('pasien.index');

Route::get('/kamar', function () {
    return Inertia::render('Admin/Kamar/Index');
})->name('kamar.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
