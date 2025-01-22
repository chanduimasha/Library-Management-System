<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookAuthorController;

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

Route::post('addCategory', [CategoryController::class, 'addCategory']);
Route::get('listCategories', [CategoryController::class, 'listCategories']);
Route::delete('deleteCategory/{id}', [CategoryController::class, 'deleteCategory']);
Route::get('getCategory/{id}', [CategoryController::class, 'getCategory']);
Route::post('updateCategory/{id}', [CategoryController::class, 'updateCategory']);
Route::get('searchCategory/{key}', [CategoryController::class, 'searchCategory']);

Route::post('addBook', [BookController::class, 'addBook']);
Route::get('listBooks', [BookController::class, 'listBooks']);
Route::delete('deleteBook/{id}', [BookController::class, 'deleteBook']);
Route::get('getBook/{id}', [BookController::class, 'getBook']);
Route::post('updateBook/{id}', [BookController::class, 'updateBook']);
Route::get('searchBook/{key}', [BookController::class, 'searchBook']);
Route::put('/updateStatus/{id}', [BookController::class, 'updateStatus']);


Route::post('storeBookAuthor', [BookAuthorController::class, 'storeBookAuthor']);
