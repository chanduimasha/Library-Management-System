import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./AddBook.css";

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

    try {
      const response = await fetch("http://localhost:8000/api/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Call the addBookAuthor function with necessary data
      await addBookAuthor(data?.book_id, author);

      alert("Data has been saved successfully");
      navigate("/books");
    } catch (error) {
      console.error("Error while adding book:", error);
    }
  }

  async function addBookAuthor(bookId, authorId) {
    const formData2 = {
      author_id: authorId,
      book_id: bookId,
    };

    try {
      const result2 = await fetch("http://localhost:8000/api/addBookAuthor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      });
    } catch (error) {
      console.error("Error while adding book author:", error);
    }
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
