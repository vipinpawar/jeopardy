'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Loader2, Trash2, Edit } from 'lucide-react';
import CreateCategoryForm from '@/app/components/CreateCategoryForm';
import CreateBlogForm from '@/app/components/CreateBlogForm';
import axios from 'axios';

const categories = ['SCIENCE', 'HISTORY', 'SPORTS'];

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [formData, setFormData] = useState(initialFormData());
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('users');

  function initialFormData() {
    return {
      id: null,
      category: '',
      points: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    };
  }

  useEffect(() => {
    fetchUsers();
    fetchQuestions();
  }, []);

  // ===================== Users ========================
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await axios.get('/api/users');

      const sortedUsers = res.data.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
      setUsers(sortedUsers);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      setDeletingUserId(userId);
      await axios.delete(`/api/deleteuser/${userId}`);

      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error('Error deleting user');
    } finally {
      setDeletingUserId(null);
    }
  };

  // ===================== Questions ========================
  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const res = await axios.get('/api/questions');
      setQuestions(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching questions');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleEditQuestion = (question) => {
    setIsEditing(true);
    setFormData({
      id: question.id,
      category: question.category,
      points: question.points,
      question: question.question,
      options: question.options || ['', '', '', ''],
      correctAnswer: question.correctAnswer,
    });
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData((prev) => ({ ...prev, options: updatedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { category, points, question, options, correctAnswer } = formData;

    if (!category || !points || !question || !correctAnswer) {
      toast.error('Please fill all fields!');
      return false;
    }

    if (options.some((opt) => opt.trim() === '')) {
      toast.error('All options must be filled!');
      return false;
    }

    if (!options.includes(correctAnswer)) {
      toast.error('Correct answer must match one of the options!');
      return false;
    }

    return true;
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      await axios.put('/api/questions', formData);

      toast.success('Question updated successfully!');
      fetchQuestions();
      clearForm();
    } catch (error) {
      console.error(error);
      toast.error('Error updating question');
    } finally {
      setSaving(false);
    }
  };

  const clearForm = () => {
    setFormData(initialFormData());
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="text-center py-4 text-2xl font-bold border-b border-blue-700">
          Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <button
            onClick={() => setActiveSection('users')}
            className={`w-full text-left py-2 px-3 rounded hover:bg-blue-600 ${activeSection === 'users' ? 'bg-blue-700' : ''}`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveSection('questions')}
            className={`w-full text-left py-2 px-3 rounded hover:bg-blue-600 ${activeSection === 'questions' ? 'bg-blue-700' : ''}`}
          >
            Manage Questions
          </button>
          <button
            onClick={() => setActiveSection('create-category')}
            className={`w-full text-left py-2 px-3 rounded hover:bg-blue-600 ${activeSection === 'create-category' ? 'bg-blue-700' : ''}`}
          >
            Create Blog Category
          </button>
          <button
            onClick={() => setActiveSection('create-blog')}
            className={`w-full text-left py-2 px-3 rounded hover:bg-blue-600 ${activeSection === 'create-blog' ? 'bg-blue-700' : ''}`}
          >
            Create Blog Post
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {activeSection === 'users' && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Profiles</h2>
            {loadingUsers ? (
              <Loader2 className="animate-spin w-6 h-6 text-blue-500 mx-auto" />
            ) : users.length === 0 ? (
              <p className="text-center text-gray-500">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-200">
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Role</th>
                      <th className="px-4 py-2 border">Total Amount</th>
                      <th className="px-4 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-4 py-2 border">{user.username || 'N/A'}</td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border capitalize">{user.role}</td>
                        <td className="px-4 py-2 border">{user.totalAmount || 0}</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={deletingUserId === user.id}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2 disabled:opacity-50"
                          >
                            {deletingUserId === user.id ? (
                              <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeSection === 'questions' && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">MCQ Questions</h2>
            {loadingQuestions ? (
              <Loader2 className="animate-spin w-6 h-6 text-blue-500 mx-auto" />
            ) : questions.length === 0 ? (
              <p className="text-center text-gray-500">No questions found</p>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="bg-gray-100 p-4 rounded shadow mb-4">
                  <p className="font-bold">{q.category} - {q.points} pts</p>
                  <p className="mt-1">{q.question}</p>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-600">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                  <p className="text-green-600 mt-1">Correct Answer: {q.correctAnswer}</p>
                  <button
                    onClick={() => handleEditQuestion(q)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mt-3 flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'create-category' && (
          <CreateCategoryForm/>
        )}


        {activeSection === 'create-blog' && (
          <CreateBlogForm/>
        )}
      </main>

      {isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl relative">
      {/* Modal Heading */}
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Question</h2>

      {/* Close Button */}
      <button
        onClick={clearForm}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
        aria-label="Close"
      >
        &times;
      </button>

            {/* Edit Question Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Category */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
      
              {/* Points */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Points</label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  required
                />
              </div>
      
              {/* Question */}
              <div className="flex flex-col md:col-span-2">
                <label className="font-medium mb-1">Question</label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  rows="3"
                  required
                />
              </div>
      
              {/* Options */}
              {formData.options.map((option, index) => (
                <div className="flex flex-col" key={index}>
                  <label className="font-medium mb-1">Option {index + 1}</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleChange(e, index)}
                    className="border rounded px-3 py-2"
                    required
                  />
                </div>
              ))}
      
              {/* Correct Answer */}
              <div className="flex flex-col md:col-span-2">
                <label className="font-medium mb-1">Correct Answer</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  required
                />
              </div>
      
              {/* Action Buttons */}
              <div className="flex gap-4 md:col-span-2 justify-end mt-4">
                <button
                  type="button"
                  onClick={clearForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 ${
                    saving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {saving && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l5-5-5-5v4a12 12 0 00-12 12h4z"
                      ></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}     
    </div>
  );
};

export default AdminPage;
