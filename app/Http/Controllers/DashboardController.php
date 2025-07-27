<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Doctor;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
            return Inertia::render('Admin/Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'totalDoctors' => Doctor::count(),
        ]);
    }
}
