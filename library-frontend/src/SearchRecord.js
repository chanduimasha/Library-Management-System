import Header from "./Header";
import { useState } from "react";
import { Table } from "react-bootstrap";

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
      <div className="col-md-10 offset-md-1 mt-5">
          <h1>Search Records</h1>
        <br />
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          placeholder="Search..."
          className="form-control"
        />
        <Table className="mt-5">
          <thead>
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
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.no_of_coppies}</td>
                <td>
                  <img
                    style={{ width: 50 }}
                    src={"http://localhost:8000/" + item.file_path}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SearchRecord;
