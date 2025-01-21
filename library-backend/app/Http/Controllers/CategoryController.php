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

    function list() {
        return Category::all();
    }

    // public function index()
    // {
    //     $categories = Category::all();
    //     return response()->json($categories);
    // }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string',
    //     ]);

    //     $category = Category::create($validated);

    //     return response()->json($category, 201);
    // }

    // public function update(Request $request, $id)
    // {
    //     $category = Category::findOrFail($id);
    //     $validated = $request->validate([
    //         'name' => 'required|string',
    //     ]);

    //     $category->update($validated);

    //     return response()->json($category, 200);
    // }

    // public function destroy($id)
    // {
    //     $category = Category::findOrFail($id);
    //     $category->delete();

    //     return response()->json(null, 204);
    // }
}
