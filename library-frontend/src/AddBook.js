// import Header from "./Header";
// import { useState } from "react";

// function AddRecord() {
//   const [name, setName] = useState("");
//   const [file, setFile] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [coppies, setCoppies] = useState("");

//   async function addRecord() {
//     console.warn(name, file, author, category, description, coppies);
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("file", file);
//     formData.append("author", author);
//     formData.append("category", category);
//     formData.append("description", description);
//     formData.append("coppies", coppies);

//     let result = await fetch("http://localhost:8000/api/addRecord", {
//         method: "POST",
//         body: formData,
//     });
//     alert("Data has been saved successfully");

//   }
//   return (
//     <div>
//       <Header />
//       <div className="col-md-6 offset-md-3 mt-5">
//         <input
//           type="text"
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           placeholder="File"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="text"
//           onChange={(e) => setAuthor(e.target.value)}
//           placeholder="Author"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="text"
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="text"
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="text"
//           onChange={(e) => setCoppies(e.target.value)}
//           placeholder="Coppies"
//           className="form-control"
//         />
//         <br />
//         <button onClick={addRecord} className="btn btn-primary">
//           Add Record
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddRecord;

import Header from "./Header";
import { useState, useEffect } from "react";
import "./AddBook.css";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  async function addBook() {
    const formData = {
      title: title,
      author_id: author, // Send author_id instead of author name
      category_id: category, // Send category_id instead of category name
      description: description,
      stock: stock,
      active: 1, // Default to active
    };

    let result = await fetch("http://localhost:8000/api/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    alert("Data has been saved successfully");
    navigate("/books");
  }

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listAuthors");
      result = await result.json();
      setAuthorsList(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listCategories");
      result = await result.json();
      setCategoryList(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Add New Book</h2>
          <div className="form-group">
            {/* <label htmlFor="title" className="form-label">
              Title
            </label> */}
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="form-control form-control-lg"
            />
          </div>
          <br />

          <div className="form-group">
            {/* <label htmlFor="author" className="form-label">
              Author
            </label> */}
            <select
              id="author"
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control form-control-lg"
            >
              <option value="">Select Author</option>
              {authorsList.map((author) => (
                <option key={author.author_id} value={author.author_id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className="form-group">
            {/* <label htmlFor="category" className="form-label">
              Category
            </label> */}
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control form-control-lg"
            >
              <option value="">Select Category</option>
              {categoryList.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className="form-group">
            {/* <label htmlFor="description" className="form-label">
              Description
            </label> */}
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="form-control form-control-lg"
              rows="4"
            ></textarea>
          </div>
          <br />
          <div className="form-group">
            {/* <label htmlFor="stock" className="form-label">
              Stock
            </label> */}
            <input
              type="number"
              id="stock"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter Number of Stock"
              className="form-control form-control-lg"
            />
          </div>
          <br />
          <button
            onClick={addBook}
            className="btn btn-dark btn-lg btn-block mt-4"
            style={{
              padding: "10px 10px",
              fontSize: "18px",
              borderRadius: "5px",
            }}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
