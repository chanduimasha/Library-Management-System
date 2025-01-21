<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\Category;
use Illuminate\Http\Request;

class BookController extends Controller
{

    function addBook(Request $req) {
        $book = new Book;
        $book->title = $req->input('title');
        $book->author_id = $req->input('author_id');
        $book->category_id = $req->input('category_id');
        $book->stock = $req->input('stock');
        $book->save();
        return $book;
    }
    
    public function index()
    {
        // Fetch books with author and category relationships
        $books = Book::with(['author', 'category'])->get();
        return response()->json($books);
    }

    public function store(Request $request)
    {
        // Validate request data
        $validated = $request->validate([
            'title' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'stock' => 'required|integer',
        ]);

        // Create a new book
        $book = Book::create($validated);

        return response()->json($book, 201);
    }

    public function update(Request $request, $id)
    {
        // Find the book and update it
        $book = Book::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'stock' => 'required|integer',
        ]);

        $book->update($validated);

        return response()->json($book, 200);
    }

    public function destroy($id)
    {
        // Delete the book
        $book = Book::findOrFail($id);
        $book->delete();

        return response()->json(null, 204);
    }
}