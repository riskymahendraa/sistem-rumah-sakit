<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Doctor;
use App\Models\Patient;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
            $totalDoctors = Doctor::count();
            $totalPatients = Patient::count();
            $maleCount = Patient::where('jenis_kelamin', 'Laki-laki')->count();
            $femaleCount = Patient::where('jenis_kelamin', 'Perempuan')->count();

            $malePercentage = $totalPatients > 0 ? round(($maleCount / $totalPatients) * 100, 2) : 0;
            $femalePercentage = $totalPatients > 0 ? round(($femaleCount / $totalPatients) * 100, 2) : 0;          

            return Inertia::render('Admin/Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'genderStats' => [
                'maleCount' => $maleCount,
                'femaleCount' => $femaleCount,
                'malePercentage' => $malePercentage,
                'femalePercentage' => $femalePercentage,
            ],
            'totalDoctors' => $totalDoctors,
            'totalPatients' => $totalPatients,
        ]);
    }
}
