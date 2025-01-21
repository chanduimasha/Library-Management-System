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
    function delete($id) {
        $result = Record::where('id', $id)->delete();
        if($result) {
            return ["result" => "Record has been deleted"];
        } else {
            return ["result" => "Operation failed"];
        }
    }
    function getRecord($id) {
        return Record::find($id);
    }
    function updateRecord($id, Request $req) {
        $record = Record::find($id);
        $record->name = $req->input('name');
        $record->author = $req->input('author');
        $record->category = $req->input('category');
        $record->description = $req->input('description');
        $record->no_of_coppies = $req->input('coppies');
        $record->file_path=$req->file('file')->store('records');
        $record->save();
        return $record;
    }
    function search($key) {
        return Record::where('name', 'LIKE', "%$key%")->get();
    }
}
