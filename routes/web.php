<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\PatientController;
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
// route::resource('doctor', DoctorController::class);

// routes/web.php
Route::get('doctor', [DoctorController::class, 'index'])->name('doctor.index');
Route::get('doctor/create', [DoctorController::class, 'create'])->name('doctor.create');
Route::post('doctor', [DoctorController::class, 'store'])->name('doctor.store');
Route::get('doctor/{doctor}/edit', [DoctorController::class, 'edit'])->name('doctor.edit');
Route::get('doctor/{doctor}', [DoctorController::class, 'show'])->name('doctor.show');
Route::put('doctor/{doctor}', [DoctorController::class, 'update'])->name('doctor.update');
Route::delete('doctor/{doctor}', [DoctorController::class, 'destroy'])->name('doctor.destroy');


Route::get('room', [RoomController::class, 'index'])->name('room.index');
Route::get('room/create', [RoomController::class, 'create'])->name('room.create');
Route::post('room', [RoomController::class, 'store'])->name('room.store');
Route::get('room/{room}/edit', [RoomController::class, 'edit'])->name('room.edit');
Route::put('room/{room}', [RoomController::class, 'update'])->name('room.update');
Route::get('room/{room}', [RoomController::class, 'show'])->name('room.show');
Route::delete('room/{room}', [RoomController::class, 'destroy'])->name('room.destroy');


Route::get('patient', [PatientController::class, 'index'])->name('patient.index');
Route::get('patient/create', [PatientController::class, 'create'])->name('patient.create');
Route::post('patient', [PatientController::class, 'store'])->name('patient.store');
Route::get('patient/{patient}/edit', [PatientController::class, 'edit'])->name('patient.edit');
Route::put('patient/{patient}', [PatientController::class, 'update'])->name('patient.update');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
