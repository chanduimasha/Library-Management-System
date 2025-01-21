// import Header from "./Header";
// import { withRouter } from "react-router-dom";
// import { useState, useEffect } from "react";

// function UpdateRecord(props) {
//   const [data, setData] = useState([]);
//   console.warn("props", props);

//   useEffect(() => {
//     async function fetchData() {
//       let result = await fetch(
//         "http://localhost:8000/api/list" + props.match.params.id
//       );
//       result = await result.json();
//       setData(result);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <h1>UpdateRecord</h1>
//       <input
//         type="text"
//         defaultValue={data.name}
//         placeholder="name"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.author}
//         placeholder="author"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.category}
//         placeholder="category"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.description}
//         placeholder="description"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.no_of_coppies}
//         placeholder="coppies"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="file"
//         defaultValue={data.file_path}
//         placeholder="image"
//         className="form-control"
//       />
//       <br />
//       <img style={{width:50}} src={"http://localhost:8000/"+ data.file_path}/><br/>
//       <button className="btn btn-primary">Update</button>
//     </div>
//   );
// }

// export default withRouter(UpdateRecord);


import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateRecord() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8000/api/getRecord/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  async function handleUpdate() {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("author", data.author);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("no_of_coppies", data.no_of_coppies);
      formData.append("file_path", data.file_path);

      const response = await fetch(`http://localhost:8000/api/updateRecord/${id}`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Record updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update record.");
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/getRecord/${id}`);
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   fetchData();
  // }, [id]);

  // async function handleUpdate() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/updateRecord/${id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (response.ok) {
  //       alert("Record updated successfully!");
  //       navigate("/");
  //     } else {
  //       alert("Failed to update record.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating record:", error);
  //   }
  // }

  return (
    <div>
      <Header />
      <h1>Update Record</h1>
      <input
        type="text"
        value={data.name || ""}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="Name"
        className="form-control"
      />
      <br />
      <input
        type="text"
        value={data.author || ""}
        onChange={(e) => setData({ ...data, author: e.target.value })}
        placeholder="Author"
        className="form-control"
      />
      <br />
      <input
        type="text"
        value={data.category || ""}
        onChange={(e) => setData({ ...data, category: e.target.value })}
        placeholder="Category"
        className="form-control"
      />
      <br />
      <input
        type="text"
        value={data.description || ""}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        placeholder="Description"
        className="form-control"
      />
      <br />
      <input
        type="number"
        value={data.no_of_coppies || ""}
        onChange={(e) => setData({ ...data, no_of_coppies: e.target.value })}
        placeholder="Copies"
        className="form-control"
      />
      <br />
      <input
        type="file"
        onChange={(e) => setData({ ...data, file_path: e.target.files[0] })}
        className="form-control"
      />
      <br />
      {data.file_path && (
        <img
          style={{ width: 50 }}
          src={`http://localhost:8000/${data.file_path}`}
          alt="File Preview"
        />
      )}
      <br />
      <button onClick={handleUpdate} className="btn btn-primary">
        Update
      </button>
    </div>
  );
}

export default UpdateRecord;



// import Header from "./Header";
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// function UpdateRecord() {
//   const [data, setData] = useState({});
//   const { id } = useParams(); // Use useParams to get route parameters
//   const navigate = useNavigate(); // Use useNavigate for navigation

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await fetch(`http://localhost:8000/api/list/${id}`);
//         const jsonData = await result.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData();
//   }, [id]);

//   const handleUpdate = async () => {
//     // Handle update logic (e.g., API call to update the record)
//     console.log("Update logic goes here");
//     navigate("/"); // Navigate to another page after updating
//   };

//   return (
//     <div>
//       <Header />
//       <h1>Update Record</h1>
//       <input
//         type="text"
//         defaultValue={data.name}
//         placeholder="name"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.author}
//         placeholder="author"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.category}
//         placeholder="category"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.description}
//         placeholder="description"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="text"
//         defaultValue={data.no_of_coppies}
//         placeholder="copies"
//         className="form-control"
//       />
//       <br />
//       <input
//         type="file"
//         placeholder="image"
//         className="form-control"
//       />
//       <br />
//       {data.file_path && (
//         <img
//           style={{ width: 50 }}
//           src={`http://localhost:8000/${data.file_path}`}
//           alt="Record"
//         />
//       )}
//       <br />
//       <button className="btn btn-primary" onClick={handleUpdate}>
//         Update
//       </button>
//     </div>
//   );
// }

// export default UpdateRecord;