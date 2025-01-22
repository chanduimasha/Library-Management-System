<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReaderController;
use App\Http\Controllers\BookReaderController;

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

Route::post('addReader', [ReaderController::class, 'addReader']);
Route::get('listReaders', [ReaderController::class, 'listReaders']);
Route::delete('deleteReader/{id}', [ReaderController::class, 'deleteReader']);
Route::get('getReader/{id}', [ReaderController::class, 'getReader']);
Route::post('updateReader/{id}', [ReaderController::class, 'updateReader']);
Route::get('searchReader/{key}', [ReaderController::class, 'searchReader']);
Route::put('updateReaderStatus/{id}', [ReaderController::class, 'updateReaderStatus']);

Route::post('addBookReader', [BookReaderController::class, 'addBookReader']);