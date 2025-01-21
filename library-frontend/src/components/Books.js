import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./Books.css";

function RecordList() {
  const [data, setData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch books data
  useEffect(() => {
    async function fetchData() {
      let result = await fetch("http://localhost:8000/api/listBooks");
      result = await result.json();
      setData(result);
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

  // Handle delete action
  function deleteAction(book_id) {
    setDeleteId(book_id);
    setShow(true);
  }

  function handleDelete() {
    if (deleteId !== null) {
      fetch("http://localhost:8000/api/delete/" + deleteId, {
        method: "DELETE",
      }).then((result) => {
        result = result.json();
        const newData = data.filter((item) => item.book_id !== deleteId);
        setData(newData);
        setShow(false); // Close the modal after deletion
      });
    }
  }

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
                <th>Stocks</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
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
                      onClick={() => deleteAction(item.book_id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Link to={"/update/" + item.book_id}>
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