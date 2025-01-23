import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./RecordList.css";

function RecordList() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/list");
      result = await result.json();
      setData(result);
    }
    fetchData();
  }, []);

  function deleteAction(id) {
    setDeleteId(id);
    setShow(true);
  }

  function handleDelete() {
    if (deleteId !== null) {
      fetch("http://localhost:8000/api/delete/" + deleteId, {
        method: "DELETE",
      }).then((result) => {
        result = result.json();
        const newData = data.filter((item) => item.id !== deleteId);
        setData(newData);
        setShow(false); // Close the modal after deletion
      });
    }
  }

  return (
    <div>
      <Header />
      <div className="container my-4">
        <h1 className="text-center text-primary mb-4">Records List</h1>
        <div className="col-sm-12">
          <Table striped bordered hover responsive className="shadow-lg">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Description</th>
                <th>Coppies</th>
                <th>Image</th>
                <th>Delete</th>
                <th>Update</th>
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
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteAction(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Link to={"/update/" + item.id}>
                      <Button variant="warning" size="sm">
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

      {/* Confirmation Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecordList;
