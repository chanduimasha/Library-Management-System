import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Reader.css";

function Reader() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function addReader() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("age", age);
    formData.append("active", 1); // Default to active

    let response = await fetch("http://localhost:8000/api/addReader", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setName("");
      setAddress("");
      setContact("");
      setAge("");
      alert("Reader has been added successfully");

      // Fetch and update the list of readers
      const updatedList = await fetch(
        "http://localhost:8000/api/listReaders"
      ).then((res) => res.json());
      setData(updatedList.filter((item) => item.active === 1)); // Only include active readers
    } else {
      alert("Failed to add reader");
    }
  }

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listReaders");
      result = await result.json();
      setData(result.filter((item) => item.active === 1)); // Only display active books
    }
    fetchData();
  }, []);

  // Function triggered when the delete button is clicked
  function deleteAction(reader_id) {
    setDeleteId(reader_id); // Store the ID of the reader to be "deleted"
    setShow(true); // Show the confirmation modal
  }

  // Function to handle the deletion logic
  function handleDelete() {
    if (deleteId !== null) {
      fetch(`http://localhost:8000/api/updateReaderStatus/${deleteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: 0 }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update reader status");
          }
          return response.json();
        })
        .then((response) => {
          if (response.success) {
            // Filter out the deleted reader from the state
            setData((prevData) =>
              prevData.filter((item) => item.reader_id !== deleteId)
            );
            alert("Reader has been marked as inactive.");
          } else {
            alert(response.message || "Error updating reader status.");
          }
          setShow(false); // Close the modal
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while updating reader status.");
          setShow(false);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">Add New Reader</h2>
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
          <br />
          <div className="form-group">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              className="form-control form-control-lg"
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter Contact"
              className="form-control form-control-lg"
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Age"
              className="form-control form-control-lg"
            />
          </div>
          <br />
          <button
            onClick={addReader}
            className="btn btn-dark btn-lg btn-block mt-4"
            style={{
              padding: "10px 10px",
              fontSize: "18px",
              borderRadius: "5px",
            }}
          >
            Add Reader
          </button>
        </div>

        <h1 className="text-center text-dark mb-5 mt-5">Reader List</h1>
        <div className="col-sm-12">
          <Table striped bordered hover responsive className="shadow-lg">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.reader_id}>
                  <td>{item.reader_id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.contact}</td>
                  <td>{item.age}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteAction(item.reader_id)}
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
                    <Link to={"/updateReader/" + item.reader_id}>
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
        <Modal.Body>Are you sure you want to delete this reader?</Modal.Body>
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

export default Reader;
