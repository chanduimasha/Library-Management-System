// src/components/EditBook.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
    const { id } = useParams();  // Get the book id from URL params
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: '',
        author_id: '',
        category_id: '',
        stock: '',
    });

    useEffect(() => {
        // Fetch the book data to edit
        axios.get(`http://localhost:8000/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the book data:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a PUT request to update the book data
        axios.put(`http://localhost:8000/api/books/${id}`, book)
            .then(response => {
                alert('Book updated successfully!');
                navigate('/books');  // Redirect to the books list page
            })
            .catch(error => {
                console.error('There was an error updating the book:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    return (
        <div>
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={book.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" name="author_id" value={book.author_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category_id" value={book.category_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>Stock</label>
                    <input type="number" name="stock" value={book.stock} onChange={handleChange} required />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBook;
