import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddBook from "./AddBook";
import UpdateRecord from "./UpdateRecord";
import Protected from "./Protected";
import RecordList from "./RecordList";
import SearchRecord from "./SearchRecord";
import Author from "./components/Author";
import Category from "./components/Category";
import Books from "./components/Books";
import UpdateAuthor from "./components/UpdateAuthor";
import UpdateCategory from "./components/UpdateCategory";
import UpdateBooks from "./components/UpdateBooks";
import Reader from "./components/Reader";
import UpdateReader from "./components/UpdateReader";


import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddBook} />} />

          {/* <Route path="/addAuthor" element={<Author />} /> */}
          {/* <Route path="/addCategory" element={<Category />} /> */}
          <Route path="/category" element={<Category />} />
          <Route path="/books" element={<Books />} />
          <Route path="/reader" element={<Reader />} />
          <Route path="/author" element={<Author />} />

          <Route path="/updateAuthor/:id" element={<UpdateAuthor />} />
          <Route path="/updateCategory/:id" element={<UpdateCategory />} />
          <Route path="/updateBooks/:id" element={<UpdateBooks />} />
          <Route path="/updateReader/:id" element={<UpdateReader />} />

          <Route
            path="/updateBooks/:id"
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
