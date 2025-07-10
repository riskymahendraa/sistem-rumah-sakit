<?php

namespace App\Models;
use App\Models\Doctor;
use App\Models\Room;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
