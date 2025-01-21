<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{

    function addAuthor(Request $req) {
        $author = new Author;
        $author->name = $req->input('name');
        $author->save();
        return $author;
    }

    function listAuthors() {
        return Author::all();
    }

    function delete($id) {
        $result = Author::where('id', $id)->delete();
        if($result) {
            return ["result" => "Author has been deleted"];
        } else {
            return ["result" => "Operation failed"];
        }
    }

    function getAuthor($id) {
        return Author::find($id);
    }

    function updateAuthor($id, Request $req) {
        $author = Author::find($id);
        $author->name = $req->input('name');
        $author->save();
        return $author;
    }

    function search($key) {
        return Author::where('name', 'LIKE', "%$key%")->get();
    }


    // public function index()
    // {
    //     $authors = Author::all();
    //     return response()->json($authors);
    // }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string',
    //         'biography' => 'nullable|string',
    //     ]);

    //     $author = Author::create($validated);

    //     return response()->json($author, 201);
    // }

    // public function update(Request $request, $id)
    // {
    //     $author = Author::findOrFail($id);
    //     $validated = $request->validate([
    //         'name' => 'required|string',
    //         'biography' => 'nullable|string',
    //     ]);

    //     $author->update($validated);

    //     return response()->json($author, 200);
    // }

    // public function destroy($id)
    // {
    //     $author = Author::findOrFail($id);
    //     $author->delete();

    //     return response()->json(null, 204);
    // }
}
