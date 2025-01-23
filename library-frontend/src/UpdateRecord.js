import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UpdateRecord.css";

function UpdateRecord() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getRecord/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading record data");
      }
    }
    fetchData();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("author", data.author || "");
      formData.append("category", data.category || "");
      formData.append("description", data.description || "");
      formData.append("no_of_coppies", data.no_of_coppies || "");

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        `http://localhost:8000/api/updateRecord/${id}`,
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
      alert("Record updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating record:", error);
      alert(`Update failed: ${error.message}`);
    }
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="update-card p-4 shadow-lg rounded-lg">
          <h1 className="mb-4 text-center text-primary">Update Record</h1>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Enter name"
                className="form-control form-input"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                value={data.author || ""}
                onChange={(e) => setData({ ...data, author: e.target.value })}
                placeholder="Enter author name"
                className="form-control form-input"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                value={data.category || ""}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                placeholder="Enter category"
                className="form-control form-input"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                value={data.description || ""}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                placeholder="Enter description"
                className="form-control form-input"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Number of Copies</label>
              <input
                type="number"
                value={data.no_of_coppies || ""}
                onChange={(e) =>
                  setData({ ...data, no_of_coppies: e.target.value })
                }
                placeholder="Enter number of copies"
                className="form-control form-input"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control file-input"
              />
            </div>

            {data.file_path && (
              <div className="mb-3">
                <label className="form-label">Current File:</label>
                <div className="file-preview">
                  <img
                    className="d-block"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:8000/${data.file_path}`}
                    alt="File Preview"
                  />
                </div>
              </div>
            )}

            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg update-btn"
              >
                Update Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRecord;
