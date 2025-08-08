<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Dokter/Index', [
            'doctors' => Doctor::all(), // atau sesuai kebutuhan
            'success' => session('success') // untuk menampilkan pesan sukses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Dokter/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'str' => 'required|min:16|max:16',
        'nama' => 'required|string|max:255',
        'jenis_kelamin' => 'required',
        'phone' => 'required|max:16',
        'alamat' => 'required|string|max:255',
        'spesialis' => 'required|string|max:255',
    ]);

    Doctor::create($validated);

    return redirect()->route('doctor.index')->with('success', 'Data Dokter Berhasil Ditambahkan');

    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        // $room = Room::with('patients_id')->where('doctors_id', $doctor->id)->get();
        $patient = Patient::with(['room', 'doctor'])->where('doctors_id', $doctor->id)->get();
        return Inertia::render('Admin/Dokter/Show', [
            'doctor' => $doctor,
            'patient' => $patient,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Doctor $doctor)
    {
        return Inertia::render('Admin/Dokter/Edit', [
            'doctor' => $doctor,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
        'str' => 'required|min:16|max:16',
        'nama' => 'required|string|max:255',
        'jenis_kelamin' => 'required',
        'phone' => 'required|max:16',
        'alamat' => 'required|string|max:255',
        'spesialis' => 'required|string|max:255',
    ]);
    

    $doctor->update($validated);
    return redirect()->route('doctor.index')->with('success', 'Data Dokter Berhasil Diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        try { $doctor->delete();
        return redirect()->route('doctor.index')->with('success', 'Data Dokter Berhasil Dihapus');
        } catch (\Exception $e) {
            return redirect()->route('doctor.index')->with('error', 'Data Dokter Gagal Dihapus');
        };
    }
}
