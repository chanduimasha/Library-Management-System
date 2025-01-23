<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\BookAuthor;

class BookController extends Controller
{

    function addBook(Request $req) {
        $book = new Book;
        $book->title = $req->input('title');
        $book->author_id = $req->input('author_id');
        $book->category_id = $req->input('category_id');
        $book->stock = $req->input('stock');
        $book->description = $req->input('description');
        $book->active = $req->input('active', 1); // Default to 1 (active) if not provided
        $book->save();
        return $book;
    }

    function deleteBook($id) {
        $book = Book::find($id);
        if ($book) {
            $book->active = 0;
            $book->save();
            return response()->json(['message' => 'Book status updated to inactive.'], 200);
        } else {
            return response()->json(['message' => 'Book not found.'], 404);
        }
    }

    function listBooks(){
        return Book::where('active', 1)->get(); // Fetch only active books
    }

    function updateStatus($id, Request $request) {
        try {
            // Validate input
            $validated = $request->validate([
                'active' => 'required|boolean',
            ]);

            // Find the book
            $book = Book::find($id);
            if (!$book) {
                return response()->json(['success' => false, 'message' => 'Book not found.'], 404);
            }

            // Update and save
            $book->active = $validated['active'];
            $book->save();

            return response()->json(['success' => true, 'message' => 'Book status updated successfully.'], 200);
        }   catch (\Exception $e) {
                \Log::error('Error updating status: ' . $e->getMessage());
                return response()->json(['success' => false, 'message' => 'Server error.'], 500);
            }
    }


    function getBook($id) {
        return Book::find($id);
    }

    public function updateBook(Request $request, $id) {
        $book = Book::find($id);
        $book->title = $request->title;
        $book->author_id = $request->author_id;
        $book->category_id = $request->category_id;
        $book->description = $request->description;
        $book->stock = $request->stock;   
        $book->save();
        return response()->json(['success' => true]);
    }

    function searchBook($key) {
        return Book::where('title', 'LIKE', "%$key%")->get();
    }
    
}