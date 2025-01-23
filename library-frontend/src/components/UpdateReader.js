import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../Header";
import "./Reader.css";

function UpdateReader() {
  const [data, setData] = useState({
    name: "",
    address: "",
    contact: "",
    age: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  // Fetch author data when component mounts
  useEffect(() => {
    fetchReaderData();
    fetchBooks();
  }, [id]);

  const fetchReaderData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/getReader/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching reader:", error);
      setError("Failed to load reader data");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listBooks");
      const result = await response.json();
      setBooks(result);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("book_id", data.book_id);
      formData.append("address", data.address);
      formData.append("contact", data.contact);
      formData.append("age", data.age);

      const response = await fetch(
        `http://localhost:8000/api/updateReader/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("Reader updated successfully!");
      navigate("/reader");
    } catch (error) {
      console.error("Error updating reader:", error);
      alert("Failed to update reader. Please try again.");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Update Reader</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                value={data.name || ""}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Enter author name"
                required
              />
            </div>
            <br />

            <div className="mb-3">
              <select
                value={data.book_id || ""}
                onChange={(e) => setData({ ...data, book_id: e.target.value })}
                className="form-control form-input"
                required
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book.book_id} value={book.book_id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
            <br />

            <div className="form-group">
              <input
                type="text"
                id="address"
                className="form-control form-control-lg"
                value={data.address || ""}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                placeholder="Enter reader address"
                required
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                id="contact"
                className="form-control form-control-lg"
                value={data.contact || ""}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                placeholder="Enter reader contact number"
                required
              />
            </div>
            <br />

            <div className="form-group">
              <input
                type="text"
                id="age"
                className="form-control form-control-lg"
                value={data.age || ""}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                placeholder="Enter reader age"
                required
              />
            </div>
            <br />
            <div className="text-center">
              <Button
                type="submit"
                variant="dark"
                className="btn-lg mt-4"
                style={{
                  padding: "10px 30px",
                  fontSize: "18px",
                  borderRadius: "5px",
                }}
              >
                Update Reader
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateReader;
