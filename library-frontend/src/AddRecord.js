import Header from "./Header";
import { useState } from "react";

function AddRecord() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coppies, setCoppies] = useState("");

  async function addRecord() {
    console.warn(name, file, author, category, description, coppies);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("coppies", coppies);

    let result = await fetch("http://localhost:8000/api/addRecord", {
        method: "POST",
        body: formData,
    });
    alert("Data has been saved successfully");

  }
  return (
    <div>
      <Header />
      <div className="col-md-6 offset-md-3 mt-5">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="form-control"
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          placeholder="File"
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="form-control"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setCoppies(e.target.value)}
          placeholder="Coppies"
          className="form-control"
        />
        <br />
        <button onClick={addRecord} className="btn btn-primary">
          Add Record
        </button>
      </div>
    </div>
  );
}

export default AddRecord;
