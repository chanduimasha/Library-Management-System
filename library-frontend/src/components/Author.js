import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Author.css";

function Author() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function addAuthor() {
    const formData = new FormData();
    formData.append("name", name);

    let response = await fetch("http://localhost:8000/api/addAuthor", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setName("");
      alert("Data has been saved successfully");
      // Fetch updated list of authors
      const updatedList = await fetch(
        "http://localhost:8000/api/listAuthors"
      ).then((res) => res.json());
      setData(updatedList);
    } else {
      alert("Failed to add author");
    }
  }

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listAuthors");
      result = await result.json();
      setData(result);
    }
    fetchData();
  }, []);

  function handleDelete() {
    if (deleteId !== null) {
      fetch("http://localhost:8000/api/deleteAuthor/" + deleteId, {
        method: "DELETE",
      }).then((result) => {
        result = result.json();
        const newData = data.filter((item) => item.author_id !== deleteId);
        setData(newData);
        setShow(false); // Close the modal after deletion
      });
    }
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Add New Author</h2>
          <div className="form-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="form-control form-control-lg"
            />
          </div>
          <button
            onClick={addAuthor}
            className="btn btn-dark btn-lg btn-block mt-4"
            style={{
              padding: "10px 10px",
              fontSize: "18px",
              borderRadius: "5px",
            }}
          >
            Add Author
          </button>
        </div>

        <h1 className="text-center text-dark mb-5 mt-5">Author List</h1>
        <div className="col-sm-12">
          <Table striped bordered hover responsive className="shadow-lg">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.author_id}>
                  <td>{item.author_id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Link to={"/updateAuthor/" + item.author_id}>
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

export default Author;
