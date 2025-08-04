<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Room;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
            $rooms = Room::select('class', 'bed_count', 'available_beds')->get();            $totalDoctors = Doctor::count();
            $totalPatients = Patient::count();
            $maleCount = Patient::where('jenis_kelamin', 'Laki-laki')->count();
            $femaleCount = Patient::where('jenis_kelamin', 'Perempuan')->count();

            return Inertia::render('Admin/Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'genderStats' => [
                'maleCount' => $maleCount,
                'femaleCount' => $femaleCount,
            ],
            'totalDoctors' => $totalDoctors,
            'totalPatients' => $totalPatients,
            'rooms' => $rooms,
        ]);
    }
}
