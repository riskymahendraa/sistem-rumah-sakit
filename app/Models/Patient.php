<?php

namespace App\Models;
use App\Models\Doctor;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
