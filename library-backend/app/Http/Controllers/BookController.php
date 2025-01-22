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

    function addBookAuthor(Request $req) {
        $book = new BookAuthor;
        $book->book_id = $req->input('book_id');
        $book->author_id = $req->input('author_id');
        $book->save();
        return $book;
    }
    
    function addBookCategory(Request $req) {
        $book = new Book;
        $book->category_id = $req->input('category_id');
        $book->save();
        return $book;
    }


    function deleteBook($id) {
        $book = Book::find($id);
        if ($book) {
            $book->active = 0; // Set active status to 0
            $book->save();
            return response()->json(['message' => 'Book status updated to inactive.'], 200);
        } else {
            return response()->json(['message' => 'Book not found.'], 404);
        }
    }

    function listBooks(){
        return Book::where('active', 1)->get(); // Fetch only active books
    }

    function updateStatus($id, Request $request)
{
    try {
        // Validate input
        $validated = $request->validate([
            'active' => 'required|boolean', // Ensure 'active' is boolean
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
    } catch (\Exception $e) {
        \Log::error('Error updating status: ' . $e->getMessage());
        return response()->json(['success' => false, 'message' => 'Server error.'], 500);
    }
}


    function getBook($id) {
        return Book::find($id);
    }

    public function updateBook(Request $request, $id)
{
    $book = Book::find($id);
    $book->title = $request->title;
    $book->author_id = $request->author_id;
    $book->category_id = $request->category_id;
    $book->description = $request->description;
    $book->stock = $request->stock;
    
    if ($request->hasFile('file')) {
        // Handle file upload logic here
        $file = $request->file('file');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads'), $filename);
        $book->file_path = 'uploads/' . $filename;
    }
    
    $book->save();
    return response()->json(['success' => true]);
}

    function searchBook($key) {
        return Book::where('title', 'LIKE', "%$key%")->get();
    }
    
    
    // public function index()
    // {
    //     // Fetch books with author and category relationships
    //     $books = Book::with(['author', 'category'])->get();
    //     return response()->json($books);
    // }

    // public function store(Request $request)
    // {
    //     // Validate request data
    //     $validated = $request->validate([
    //         'title' => 'required|string',
    //         'author_id' => 'required|exists:authors,id',
    //         'category_id' => 'required|exists:categories,id',
    //         'stock' => 'required|integer',
    //     ]);

    //     // Create a new book
    //     $book = Book::create($validated);

    //     return response()->json($book, 201);
    // }

    // public function update(Request $request, $id)
    // {
    //     // Find the book and update it
    //     $book = Book::findOrFail($id);
    //     $validated = $request->validate([
    //         'title' => 'required|string',
    //         'author_id' => 'required|exists:authors,id',
    //         'category_id' => 'required|exists:categories,id',
    //         'stock' => 'required|integer',
    //     ]);

    //     $book->update($validated);

    //     return response()->json($book, 200);
    // }

    // public function destroy($id)
    // {
    //     // Delete the book
    //     $book = Book::findOrFail($id);
    //     $book->delete();

    //     return response()->json(null, 204);
    // }
}