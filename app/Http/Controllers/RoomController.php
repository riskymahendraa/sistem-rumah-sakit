<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Doctor;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Kamar/Index', [
            'rooms' => Room::all(), // atau sesuai kebutuhan
            'success' => session('success') // untuk menampilkan pesan sukses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Kamar/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'type' => 'required|string',
        'bed_count' => 'required|integer|min:1',
        'class' => 'required|string',
    ]);
    $validated['available_beds'] = $validated['bed_count'];

    Room::create($validated);
    
    return redirect()->route('room.index')->with('success', 'Data Kamar Berhasil Ditambahkan');

    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        return Inertia::render('Admin/Kamar/Edit', [
            'room' => $room
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'type' => 'required|string',
        'class' => 'required|string',
        'bed_count' => 'required|integer|min:1',
    ]);

    $room->update($validated);

    return redirect()->route('room.index')->with('success', 'Kamar berhasil diupdate');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
