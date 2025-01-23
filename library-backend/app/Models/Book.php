<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_id';

    public function readers() {
        return $this->belongsToMany(Reader::class, 'book_readers', 'book_id', 'reader_id');
    }

}
