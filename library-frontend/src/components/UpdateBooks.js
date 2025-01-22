import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Header from "../Header";
import "./Books.css";

function UpdateBooks() {
  const [data, setData] = useState({});
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch book data
  useEffect(() => {
    fetchBookData();
    fetchAuthors();
    fetchCategories();
  }, [id]);

  const fetchBookData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/getBook/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Failed to load book data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listAuthors");
      const result = await response.json();
      setAuthors(result);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listCategories");
      const result = await response.json();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("author_id", data.author_id || "");
      formData.append("category_id", data.category_id || "");
      formData.append("description", data.description || "");
      formData.append("stock", data.stock || "");

      const response = await fetch(
        `http://localhost:8000/api/updateBook/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error);
      alert(`Update failed: ${error.message}`);
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="update-card p-4 shadow-lg rounded-lg">
          <h1 className="mb-4 text-center text-primary">Update Book</h1>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Enter title"
                className="form-control form-input"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <Form.Select
                value={data.author_id || ""}
                onChange={(e) => setData({ ...data, author_id: e.target.value })}
                className="form-control form-input"
                required
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.author_id} value={author.author_id}>
                    {author.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <Form.Select
                value={data.category_id || ""}
                onChange={(e) => setData({ ...data, category_id: e.target.value })}
                className="form-control form-input"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                value={data.description || ""}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                placeholder="Enter description"
                className="form-control form-input"
                rows="3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                value={data.stock || ""}
                onChange={(e) => setData({ ...data, stock: e.target.value })}
                placeholder="Enter stock quantity"
                className="form-control form-input"
                required
              />
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg update-btn">
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBooks;