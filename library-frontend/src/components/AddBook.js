// src/components/AddBook.js

import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author_id: authorId,
            category_id: categoryId,
            stock,
        };

        // POST request to create a new book
        axios.post('http://localhost:8000/api/addBook', newBook)
            .then(response => {
                alert('Book added successfully!');
            })
            .catch(error => {
                console.error('There was an error adding the book:', error);
            });
    };

    return (
        <div>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
                </div>
                <div>
                    <label>Stock</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
