<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('addRecord', [RecordController::class, 'addRecord']);
Route::get('list', [RecordController::class, 'list']);
Route::delete('delete/{id}', [RecordController::class, 'delete']);
Route::get('getRecord/{id}', [RecordController::class, 'getRecord']);
Route::post('updateRecord/{id}', [RecordController::class, 'updateRecord']);
Route::get('search/{key}', [RecordController::class, 'search']);

Route::post('addAuthor', [AuthorController::class, 'addAuthor']);
Route::get('listAuthors', [AuthorController::class, 'listAuthors']);
Route::delete('deleteAuthor/{id}', [AuthorController::class, 'deleteAuthor']);
Route::get('getAuthor/{id}', [AuthorController::class, 'getAuthor']);
Route::post('updateAuthor/{id}', [AuthorController::class, 'updateAuthor']);
Route::get('searchAuthor/{key}', [AuthorController::class, 'searchAuthor']);





// Route::resource('books', BookController::class);
// Route::resource('authors', AuthorController::class);
// Route::resource('categories', CategoryController::class);
Route::post('addBook', [BookController::class, 'addBook']);
Route::post('addCategory', [CategoryController::class, 'addCategory']);
