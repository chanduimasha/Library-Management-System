<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    function addCategory(Request $req) {
        $category = new Category;
        $category->name = $req->input('name');
        $category->save();
        return $category;
    }

    function listCategories() {
        return Category::all();
    }

    function deleteCategory($id) {
        $result = Category::where('id', $id)->deleteCategory();
        if($result) {
            return ["result" => "Category has been deleted"];
        } else {
            return ["result" => "Operation failed"];
        }
    }

    function getCategory($id) {
        return Category::find($id);
    }

    function updateCategory($id, Request $req) {
        $category = Category::find($id);
        $category->name = $req->input('name');
        $category->save();
        return $category;
    }

    function searchCategory($key) {
        return Category::where('name', 'LIKE', "%$key%")->get();
    }

}
