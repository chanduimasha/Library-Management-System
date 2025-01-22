import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../Header";
import "./Author.css"; // You can reuse the same CSS or create Category.css

function UpdateCategory() {
  const [data, setData] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/getCategory/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching category:", error);
      setError("Failed to load category data");
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
        `http://localhost:8000/api/updateCategory/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("Category updated successfully!");
      navigate("/category"); // Redirect to category list
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category. Please try again.");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Update Category</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                value={data.name || ""}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Enter category name"
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
                Update Category
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;