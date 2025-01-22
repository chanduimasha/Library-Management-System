<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;

class BookAuthorController extends Controller
{
    //
     function storeBookAuthor(Request $request)
    {
        $book_id = $request->book_id;
        $author_id = $request->author_id;

        // Find the book and author by their IDs
        $book = Book::find($book_id);
        $author = Author::find($author_id);

        if ($book && $author) {
            // Attach the author to the book
            $book->authors()->attach($author->id);

            return response()->json(['message' => 'Author successfully associated with the book.'], 200);
        }

        return response()->json(['message' => 'Book or Author not found.'], 404);
    }
}
