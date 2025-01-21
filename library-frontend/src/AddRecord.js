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
import { useState } from "react";
import "./AddRecord.css"; // Add this line to import the custom CSS file

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
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Add New Record</h2>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file" className="form-label">File Upload</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author" className="form-label">Author</label>
            <input
              type="text"
              id="author"
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter Author Name"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="form-control form-control-lg"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="coppies" className="form-label">Copies</label>
            <input
              type="number"
              id="coppies"
              onChange={(e) => setCoppies(e.target.value)}
              placeholder="Enter Number of Copies"
              className="form-control form-control-lg"
            />
          </div>
          <button onClick={addRecord} className="btn btn-dark btn-lg btn-block mt-4">
            Add Record
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRecord;
