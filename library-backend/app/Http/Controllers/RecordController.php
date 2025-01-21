<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
class RecordController extends Controller
{
    //
    function addRecord(Request $req) {
        $record = new Record;
        $record->name = $req->input('name');
        $record->author = $req->input('author');
        $record->category = $req->input('category');
        $record->description = $req->input('description');
        $record->no_of_coppies = $req->input('coppies');
        $record->file_path=$req->file('file')->store('records');
        $record->save();
        return $record;
    }

    function list() {
        return Record::all();
    }
}
