'use client';

import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories', {
          method: 'GET',
        });
        if (!res.ok) throw new Error('Failed to fetch categories');

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
        setMessage('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !content || !categoryId) {
      setMessage('Please fill in all fields!');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image,
          content,
          categoryId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.error || 'Something went wrong!');
        return;
      }

      const result = await res.json();
      //setMessage('Blog post created successfully!');
      toast.success("Blog post created successfully!");

      // Clear form
      setTitle('');
      setImage('');
      setContent('');
      setCategoryId('');
    } catch (err) {
      console.error('Error creating blog post:', err);
      setMessage('Error creating blog post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Blog Title */}
        <div>
          <label className="block font-medium mb-1">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter blog title"
          />
        </div>

        {/* Blog Image */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter image URL"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            rows="5"
            placeholder="Write blog content here"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <PlusCircle className="inline mr-2" />
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>

      {/* Status Message */}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default CreateBlogForm;
