// import Header from "./Header";
// import { useState } from "react";
// import { Table } from "react-bootstrap";

// function SearchRecord() {
//   const [data, setData] = useState([]);
//   async function search(key) {
//     let result = await fetch("http://localhost:8000/api/search/" + key);
//     result = await result.json();
//     setData(result);
//   }
//   return (
//     <div>
//       <Header />
//       <div className="col-md-10 offset-md-1 mt-5">
//           <h1>Search Records</h1>
//         <br />
//         <input
//           type="text"
//           onChange={(e) => search(e.target.value)}
//           placeholder="Search..."
//           className="form-control"
//         />
//         <Table className="mt-5">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Coppies</th>
//               <th>Image</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.author}</td>
//                 <td>{item.category}</td>
//                 <td>{item.description}</td>
//                 <td>{item.no_of_coppies}</td>
//                 <td>
//                   <img
//                     style={{ width: 50 }}
//                     src={"http://localhost:8000/" + item.file_path}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default SearchRecord;

// import React, { useState } from "react";
// import { Table, Button } from "react-bootstrap";
// import Header from "./Header";
// import './SearchRecord.css';  // Import the CSS file for styling

// function SearchRecord() {
//   const [data, setData] = useState([]);

//   async function search(key) {
//     let result = await fetch("http://localhost:8000/api/search/" + key);
//     result = await result.json();
//     setData(result);
//   }

//   return (
//     <div>
//       <Header />
//       <div className="container mt-5">
//         <h1 className="text-center text-primary mb-4">Search Records</h1>
//         <div className="col-md-12">
//           <input
//             type="text"
//             onChange={(e) => search(e.target.value)}
//             placeholder="Search..."
//             className="form-control search-input"
//           />
//           <Table striped bordered hover responsive className="shadow-lg mt-4">
//             <thead className="thead-dark">
//               <tr>
//                 <th>Id</th>
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>Category</th>
//                 <th>Description</th>
//                 <th>Coppies</th>
//                 <th>Image</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>{item.author}</td>
//                   <td>{item.category}</td>
//                   <td>{item.description}</td>
//                   <td>{item.no_of_coppies}</td>
//                   <td>
//                     <img
//                       style={{ width: 50, borderRadius: "5px" }}
//                       src={"http://localhost:8000/" + item.file_path}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>
//                     <Button variant="danger" size="sm">
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchRecord;

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Header from "./Header";
import "./SearchRecord.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

function SearchRecord() {
  const [data, setData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listBooks");
      result = await result.json();
      setData(result.filter((item) => item.active === 1)); // Only display active books
    }
    fetchData();
  }, []);

  // Fetch authors data
  useEffect(() => {
    async function fetchAuthors() {
      let result = await fetch("http://localhost:8000/api/listAuthors");
      result = await result.json();
      setAuthors(result);
    }
    fetchAuthors();
  }, []);

  // Fetch categories data
  useEffect(() => {
    async function fetchCategories() {
      let result = await fetch("http://localhost:8000/api/listCategories");
      result = await result.json();
      setCategories(result);
    }
    fetchCategories();
  }, []);

  // Function to handle search
  function handleSearch(event) {
    setSearchKey(event.target.value);
  }

  // Filtered data based on search key
  const filteredData = data.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(searchKey.toLowerCase())) ||
      (item.author &&
        item.author.toLowerCase().includes(searchKey.toLowerCase())) ||
      (item.category &&
        item.category.toLowerCase().includes(searchKey.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchKey.toLowerCase()))
  );

  // Helper function to get author name by ID
  const getAuthorName = (authorId) => {
    const author = authors.find((a) => a.author_id === authorId);
    return author ? author.name : "Unknown Author";
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.category_id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center text-dark mb-4">Search Books</h1>
        <div className="col-md-12">
          <input
            type="text"
            value={searchKey}
            onChange={handleSearch}
            placeholder="Search by Title..."
            className="form-control search-input"
          />
          <Table striped bordered hover responsive className="shadow-lg mt-4">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Description</th>
                <th>Stocks</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.book_id}>
                  <td>{item.book_id}</td>
                  <td>{item.title}</td>
                  <td>{getAuthorName(item.author_id)}</td>
                  <td>{getCategoryName(item.category_id)}</td>
                  <td>{item.description}</td>
                  <td>{item.stock}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{
                        padding: "5px 10px",
                        fontSize: "15px",
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Link to={"/update/" + item.book_id}>
                      <Button
                        variant="warning"
                        size="sm"
                        style={{
                          padding: "5px 10px",
                          fontSize: "15px",
                          borderRadius: "5px",
                        }}
                      >
                        Update
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SearchRecord;
