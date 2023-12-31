<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;
    protected $fillable = ['event_id', 'user_id', 'message'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
