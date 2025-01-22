import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../Header";
import "./Author.css";

function UpdateAuthor() {
  const [data, setData] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch author data when component mounts
  useEffect(() => {
    fetchAuthorData();
  }, [id]);

  const fetchAuthorData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/getAuthor/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching author:", error);
      setError("Failed to load author data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      const response = await fetch(
        `http://localhost:8000/api/updateAuthor/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("Author updated successfully!");
      navigate("/author"); // Redirect to author list
    } catch (error) {
      console.error("Error updating author:", error);
      alert("Failed to update author. Please try again.");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Update Author</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
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
                Update Author
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAuthor;