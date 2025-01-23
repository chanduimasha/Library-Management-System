<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reader;

class ReaderController extends Controller
{

    function addReader(Request $req) {
        $reader = new Reader;
        $reader->name = $req->input('name');
        $reader->contact = $req->input('contact');
        $reader->address = $req->input('address');
        $reader->age = $req->input('age');
        $reader->save();
        return $reader;
    }


    function listReaders() {
        return Reader::with('books')->get();
    }


    function deleteReader($id) {
        $reader = Reader::find($id);
        if ($reader) {
            $reader->active = 0; // Set active status to 0
            $reader->save();
            return response()->json(['message' => 'Reader status updated to inactive.'], 200);
        } else {
            return response()->json(['message' => 'Reader not found.'], 404);
        }
    }

    function updateReaderStatus($id, Request $request) {
        try {
            // Validate input
            $validated = $request->validate([
                'active' => 'required|boolean', // Ensure 'active' is boolean
            ]);

            // Find the reader
            $reader = Reader::find($id);
            if (!$reader) {
                return response()->json(['success' => false, 'message' => 'Reader not found.'], 404);
            }

            // Update and save
            $reader->active = $validated['active'];
            $reader->save();

            return response()->json(['success' => true, 'message' => 'Reader status updated successfully.'], 200);
        } catch (\Exception $e) {
            \Log::error('Error updating status: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Server error.'], 500);
            }
    }

    function getReader($id) {
        return Reader::find($id);
    }

    function updateReader($id, Request $req) {
        $reader = Reader::find($id);
        $reader->name = $req->input('name');
        $reader->contact = $req->input('contact');
        $reader->address = $req->input('address');
        $reader->age = $req->input('age');
        $reader->save();
        return $reader;
    }

    function searchReader($key) {
        return Reader::where('name', 'LIKE', "%$key%")->get();
    }
    
}
