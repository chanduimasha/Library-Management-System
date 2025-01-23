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

    function deleteAuthor($id) {
        $result = Author::where('id', $id)->deleteAuthor();
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

    function searchAuthor($key) {
        return Author::where('name', 'LIKE', "%$key%")->get();
    }

}
