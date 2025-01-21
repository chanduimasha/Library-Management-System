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
import Category from "./components/Category";
import Books from "./components/Books";

import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddRecord} />} />

          <Route path="/addAuthor" element={<Author />} />
          <Route path="/addCategory" element={<Category />} />
          <Route path="/addBooks" element={<Books />} />

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
