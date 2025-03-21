'use client';

import { useState } from 'react';
import axios from "axios";

export default function CreateCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/categories', {
        name: categoryName,
      });
      
      setMessage('Category created successfully!');
      setCategoryName('');
    } catch (error) {
      console.error(error);
      if(error.response && error.response.data && error.response.data.error){
        setMessage(error.response.data.error);
      }else{
        setMessage('An unexpected error occurred');
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Blog Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
