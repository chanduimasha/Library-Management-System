import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddRecord from "./AddRecord";
import UpdateRecord from "./UpdateRecord";
import Protected from "./Protected";
import RecordList from "./RecordList";
import SearchRecord from "./SearchRecord";

import Author from "./components/Author";

import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddRecord} />} />

          <Route path="/addAuthor" element={<Author />} />



          <Route path="/books" element={<BookList />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route
            path="/update/:id"
            element={<Protected Cmp={UpdateRecord} />}
          />
          <Route path="/search" element={<Protected Cmp={SearchRecord} />} />
          <Route path="/" element={<Protected Cmp={RecordList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
