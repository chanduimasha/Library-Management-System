<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reader extends Model
{
    use HasFactory;

    protected $primaryKey = 'reader_id';

    public function books() {
        return $this->belongsToMany(Book::class, 'book_readers', 'reader_id', 'book_id');
    }

}
