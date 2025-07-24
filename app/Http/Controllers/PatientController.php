<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Room;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patients = Patient::with('doctor', 'room')->get();
        return Inertia::render('Admin/Pasien/Index', [
            'patients' => $patients,// atau sesuai kebutuhan
            'success' => session('success') // untuk menampilkan pesan sukses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Pasien/Create', [
            'doctors' => Doctor::all(), 
            'rooms' => Room::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|max:16',
            'phone' => 'required|string|max:16',
            'alamat' => 'required|string|max:255',
            'doctors_id' => 'required|exists:doctors,id',
            'rooms_id' => 'required|exists:rooms,id',
            'jenis_kelamin' => 'required',
        ]);
        
        Patient::create($validated);
        return redirect()->route('patient.index')->with('success', 'Data Pasien Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return Inertia::render('Admin/Pasien/Show', [
            'patient' => $patient,
            'doctor' => $patient->doctor,
            'room' => $patient->room
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        return Inertia::render('Admin/Pasien/Edit', [
            'patient' => $patient,
            'doctors' => Doctor::all(),
            'rooms' => Room::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|max:16',
            'phone' => 'required|string|max:16',
            'alamat' => 'required|string|max:255',
            'doctors_id' => 'required|exists:doctors,id',
            'rooms_id' => 'required|exists:rooms,id',
            'jenis_kelamin' => 'required',
        ]);

        $patient->update($validated);
        return redirect()->route('patient.index')->with('success', 'Data Pasien Berhasil Diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return redirect()->route('patient.index');
    }
}
