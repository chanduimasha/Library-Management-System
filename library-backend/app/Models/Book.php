<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_id';

    public function readers()
{
    return $this->belongsToMany(Reader::class, 'book_readers', 'book_id', 'reader_id');
}



//     public function authors()
// {
//     return $this->belongsToMany(Author::class, 'book_author');
// }


    // protected $fillable = ['title', 'author_id', 'category_id', 'stock'];

    // public function author()
    // {
    //     return $this->belongsTo(Author::class);
    // }

    // public function category()
    // {
    //     return $this->belongsTo(Category::class);
    // }

    // public function transactions()
    // {
    //     return $this->hasMany(Transaction::class);
    // }
}
