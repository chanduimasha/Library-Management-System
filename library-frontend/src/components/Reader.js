import React, { useState, useEffect, act } from "react";
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
  const [selectedBook, setSelectedBook] = useState("");
  const [booksList, setBooksList] = useState([]);

  async function addReader() {
    const formData = {
      name: name,
      book_id: selectedBook,
      address: address,
      contact: contact,
      age: age,
      active: 1,
    };

    try {
      await fetch("http://localhost:8000/api/addReader", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        const data = await response.json();
        console.log("response", data);
        console.log("reader_id", data?.reader_id);

        // Call the addBookAuthor function with necessary data
        const response2 = await addBookReader(data?.reader_id, selectedBook);

        if (response2.ok) {
          alert("Data has been saved successfully");
          setName("");
          setAddress("");
          setContact("");
          setAge("");
          setSelectedBook("");
          fetchData();
        } else {
          alert("Failed to add author");
        }
      });
    } catch (error) {
      console.error("Error while adding reader:", error);
    }
  }

  async function addBookReader(readerId, bookId) {
    const formData2 = {
      book_id: parseInt(bookId),
      reader_id: parseInt(readerId),
    };
    console.log("formData2", formData2);
    try {
      const result2 = await fetch("http://localhost:8000/api/addBookReader", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      });

      return result2;
    } catch (error) {
      console.error("Error while adding book reader:", error);
    }
  }

  async function fetchData() {
    let result = await fetch("http://localhost:8000/api/listReaders");
    result = await result.json();

    const modifiedData = result.flatMap((reader) =>
      reader.books.map((book) => ({
        reader_id: reader.reader_id,
        readerName: reader.name,
        title: book.title,
        readerAge: reader.age,
        readerContact: reader.contact,
        readerAddress: reader.address,
        readerActive: reader.active,
        bookActive: book.active,
      }))
    );

    console.log("modifiedData", modifiedData);

    setData(
      modifiedData.filter(
        (item) => item.readerActive === 1 && item.bookActive === 1
      )
    ); // Only display active books
    console.log("result", result);
  }

  useEffect(() => {
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

  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listBooks");
      result = await result.json();
      setBooksList(result);
    }
    fetchData();
  }, []);

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
            <select
              id="book"
              onChange={(e) => setSelectedBook(e.target.value)}
              className="form-control form-control-lg"
            >
              <option value="">Select Book</option>
              {booksList.map((book) => (
                <option key={book.book_id} value={book.book_id}>
                  {book.title}
                </option>
              ))}
            </select>
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
              onChange={(e) => {
                const input = e.target.value;
                // Allow only numbers and limit to 10 characters
                if (/^\d*$/.test(input) && input.length <= 10) {
                  setContact(input);
                }
              }}
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
                <th>Name</th>
                <th>Book</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.readerName}</td>
                  <td>{item.title}</td>
                  <td>{item.readerAge}</td>
                  <td>{item.readerContact}</td>
                  <td>{item.readerAddress}</td>
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
