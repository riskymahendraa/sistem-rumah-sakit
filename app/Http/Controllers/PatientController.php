<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Room;
use Illuminate\Support\Facades\DB;
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
            'auth' => [
                'user' => Auth::user(),
            ],
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
            'auth' => [
                'user' => Auth::user(),
            ],
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
        
        DB::beginTransaction();

    try {
        // Kunci data kamar agar tidak bentrok
        $room = Room::lockForUpdate()->findOrFail($request->rooms_id);

        if ($room->available_beds <= 0) {
            return redirect()->back()->withErrors(['rooms_id' => 'Kamar tidak tersedia']);
        }

        // Kurangi bed count
        $room->decrement('available_beds');

        // Tambah pasien
        Patient::create($validated);

        DB::commit(); // Komit transaksi setelah semuanya berhasil

        return redirect()->route('patient.index')->with('success', 'Data Pasien Berhasil Ditambahkan');
    } catch (\Exception $e) {
        DB::rollBack(); // Batalkan semua perubahan jika ada error

        return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data pasien.']);
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return Inertia::render('Admin/Pasien/Show', [
            'auth' => [
                'user' => Auth::user(),
            ],
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
            'auth' => [
                'user' => Auth::user(),
            ],
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

    DB::transaction(function () use ($validated, $patient) {
        if ($patient->rooms_id !== $validated['rooms_id']) {
            $oldRoom = Room::find($patient->rooms_id);
            if ($oldRoom) {
                $oldRoom->available_beds++;
                $oldRoom->save();
            }

            // Kamar baru: kurangi 1 bed
            $newRoom = Room::where('id', $validated['rooms_id'])->lockForUpdate()->first();

            if ($newRoom->available_beds <= 0) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'rooms_id' => 'Kamar yang dipilih sudah penuh.',
                ]);
            }

            $newRoom->available_beds--;
            $newRoom->save();
        }

        // Update data pasien
        $patient->update($validated);
    });

    return redirect()->route('patient.index')->with('success', 'Data Pasien Berhasil Diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        DB::transaction(function () use ($patient) {
            $room = Room::lockForUpdate()->findOrFail($patient->rooms_id);
            if ($room) {
                $room->increment('available_beds');
                $room->save();
            }  
            $patient->delete();
        });
        return redirect()->route('patient.index');
    }
}
