'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";

const BlogPage = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]); // New state to hold all blogs
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories and blogs from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        const data = res.data;
        setCategories(data);
        console.log("Categories:",data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogpost');
        const blogs = res.data;
        setBlogs(blogs); // Store blogs in state if needed
        console.log("Blogs:",blogs); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchCategories();
    fetchBlogs(); // Call fetchBlogs on mount too!
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-indigo-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-10 px-4 md:px-20">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-indigo-800">Our Blogs</h1>

      {/* Categories List */}
      {!selectedCategory && !selectedBlog && (
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white shadow-md rounded-lg w-64 cursor-pointer transform transition duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="p-8 text-center">
                <h2 className="text-xl font-semibold text-indigo-700">{category.name}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Blogs of selected category */}
      <AnimatePresence>
  {selectedCategory && !selectedBlog && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={handleBackToCategories}
        className="mb-8 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition duration-300"
      >
        ← Back to Categories
      </button>

      <h2 className="text-3xl font-bold mb-8 text-indigo-700 text-center">
        {selectedCategory.name} Blogs
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs
          .filter((blog) => blog.categoryId === selectedCategory.id)
          .map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => handleBlogClick(blog)}
            >
              {/* Blog Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.content}
                </p>
              </div>
            </motion.div>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Expanded Blog View */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-4xl mx-auto p-8">
              <button
                onClick={handleBackToBlogs}
                className="mb-8 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition duration-300"
              >
                ← Back to Blogs
              </button>

              <h2 className="text-4xl font-bold text-indigo-800 mb-6 text-center">{selectedBlog.title}</h2>

              <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <motion.div
                className="text-lg text-gray-700 leading-relaxed space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedBlog.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
