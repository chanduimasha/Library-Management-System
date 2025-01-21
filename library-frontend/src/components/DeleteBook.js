// src/components/DeleteBook.js

import React from 'react';
import axios from 'axios';

const DeleteBook = ({ bookId, onDelete }) => {
    const handleDelete = () => {
        // Send a DELETE request to remove the book
        axios.delete(`http://localhost:8000/api/books/${bookId}`)
            .then(response => {
                onDelete(bookId);
                alert('Book deleted successfully!');
            })
            .catch(error => {
                console.error('There was an error deleting the book:', error);
            });
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteBook;
