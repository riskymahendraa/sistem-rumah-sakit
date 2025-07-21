<?php

namespace App\Models;
use App\Models\Doctor;
use App\Models\Room;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{

    protected $fillable = [
        'nama', 'nik', 'phone', 'alamat', 'doctors_id', 'rooms_id', 'jenis_kelamin'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctors_id');
    }
    public function room()
    {
        return $this->belongsTo(Room::class, 'rooms_id');
    }
}
