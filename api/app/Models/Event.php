<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'image',
        'description',
        'date',
        'time_start',
        'time_end',
        'location',
        'latitude',
        'longitude',
        'creator_id',
        'category_id'
    ]; // Campi della tabella 'events'

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
    public function threads()
    {
        return $this->hasMany(Thread::class,'event_id');
    }
}

