<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
       // Nome della tabella associata (se differente dalla convenzione)
       protected $table = 'categories';

       // Chiave primaria personalizzata (se necessario)
       protected $primaryKey = 'id';
   
       // Attributi assegnabili in massa, se usi l'assegnamento di massa
       protected $fillable = ['category'];
   
       // Timestamps: disabilita se non hai created_at e updated_at nella tabella
       public $timestamps = false;
}
