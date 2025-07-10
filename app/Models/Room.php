<?php

namespace App\Models;
use App\Models\Patient;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['name', 'type', 'bed_count', 'class', 'available_beds', 'status'];
    public function patients()
    {
        return $this->hasMany(Patient::class);
    }

}
