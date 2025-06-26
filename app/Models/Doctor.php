<?php

namespace App\Models;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = ['nama', 'phone', 'str', 'alamat', 'spesialis', 'jenis_kelamin'];
    public function patients()
    {
        return $this->hasMany(Patient::class);
    }
}
