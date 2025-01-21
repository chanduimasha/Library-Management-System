import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function RecordList() {
  const [data, setData] = useState([]);

  //   useEffect(async () => {
  //     let result = await fetch("http://localhost:8000/api/list");
  //     result = await result.json();
  //     setData(result);
  //   }, []);

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/list");
      result = await result.json();
      setData(result);
    }
    fetchData();
  }, []);
  console.warn("result", data);
  return (
    <div>
      <Header />
      <h1>List</h1>
      <div className="col-sm-10 offset-sm-1">
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Description</th>
              <th>Coppies</th>
              <th>Image</th>
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

export default RecordList;
