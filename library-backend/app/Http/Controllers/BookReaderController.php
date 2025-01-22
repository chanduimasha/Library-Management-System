<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookReader;
use App\Models\Book;
use App\Models\Reader;

class BookReaderController extends Controller
{
    function addBookReader(Request $req) {
        $book = new BookReader;
        $book->book_id = $req->input('book_id');
        $book->reader_id = $req->input('reader_id');
        $book->save();
        return $book;
    }
}
