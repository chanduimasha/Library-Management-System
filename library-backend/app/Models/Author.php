<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $primaryKey = 'author_id';


//     public function books()
// {
//     return $this->belongsToMany(Book::class, 'book_author');
// }


    // protected $fillable = ['name', 'biography'];

    // public function books()
    // {
    //     return $this->hasMany(Book::class);
    // }
}
