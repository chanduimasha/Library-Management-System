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


import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Header from "./Header";
import './SearchRecord.css';  // Import the CSS file for styling

function SearchRecord() {
  const [data, setData] = useState([]);

  async function search(key) {
    let result = await fetch("http://localhost:8000/api/search/" + key);
    result = await result.json();
    setData(result);
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">Search Records</h1>
        <div className="col-md-12">
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Search..."
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
                <th>Coppies</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.no_of_coppies}</td>
                  <td>
                    <img
                      style={{ width: 50, borderRadius: "5px" }}
                      src={"http://localhost:8000/" + item.file_path}
                      alt={item.name}
                    />
                  </td>
                  <td>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
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