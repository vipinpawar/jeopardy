'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from "axios";

const categories = ['SCIENCE', 'HISTORY', 'SPORTS'];
const points = [100, 200, 300, 400, 500, 600];

const GamePage = () => {
  const { data: session } = useSession();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  // Track correct/incorrect answers by question ID
  const [questionResults, setQuestionResults] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/api/questions');
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleTileClick = (category, points) => {
    const question = questions.find(
      (q) => q.category === category && q.points === points
    );

    if (!question || answeredQuestions.includes(question.id)) return;

    setSelectedQuestion(question);
    setSelectedOption('');
    setAnswerFeedback('');
  };

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
  
    const isCorrect = option === selectedQuestion.correctAnswer;
    let newTotalAmount = totalAmount;
  
    if (isCorrect) {
      setAnswerFeedback('Correct!');
      newTotalAmount = totalAmount + selectedQuestion.points;
      setTotalAmount(newTotalAmount);
  
      setQuestionResults((prev) => ({
        ...prev,
        [selectedQuestion.id]: 'correct',
      }));
    } else {
      setAnswerFeedback('Wrong!');
      setQuestionResults((prev) => ({
        ...prev,
        [selectedQuestion.id]: 'wrong',
      }));
    }
  
    try {
      // Call the API to update totalAmount in the database
      const res = await axios.post('/api/update-amount', {
        totalAmount: newTotalAmount,
      });

      console.log('Amount updated:', res.data);
    } catch (err) {
      console.error('Failed to update amount:', err.response?.data?.message || err.message);
    }
  };
  

  const handleCloseModal = () => {
    if (selectedQuestion) {
      setAnsweredQuestions([...answeredQuestions, selectedQuestion.id]);
      setSelectedQuestion(null);
      setSelectedOption('');
      setAnswerFeedback('');
    }
  };

  const handleResetGame = () => {
    setAnsweredQuestions([]);
    setQuestionResults({});
    setSelectedQuestion(null);
    setSelectedOption('');
    setAnswerFeedback('');
    setTotalAmount(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-300">
        <p className="text-xl font-bold">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-300">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-300 text-black flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl mb-8 text-center">Jeopardy Game</h1>

      <div className="mb-6 text-2xl font-semibold text-green-800">
        Amount Won: ${totalAmount}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={handleResetGame}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition"
        >
          Reset Game
        </button>
      </div>

      {/* === Game Grid Desktop === */}
      <div className="hidden md:grid grid-cols-3 gap-4 w-full max-w-4xl">
        {categories.map((category, index) => (
          <div
            key={index}
            className="text-center font-bold text-lg bg-yellow-500 p-4 rounded"
          >
            {category.charAt(0) + category.slice(1).toLowerCase()}
          </div>
        ))}

        {points.map((pointValue, rowIndex) =>
          categories.map((category, colIndex) => {
            const question = questions.find(
              (q) => q.category === category && q.points === pointValue
            );

            const isAnswered =
              question && answeredQuestions.includes(question.id);

            // Determine the color based on result
            const result = questionResults[question?.id];
            let bgColor = '';

            if (!question) {
              bgColor = 'bg-gray-300 cursor-not-allowed';
            } else if (result === 'correct') {
              bgColor = 'bg-green-500';
            } else if (result === 'wrong') {
              bgColor = 'bg-red-500';
            } else if (isAnswered) {
              bgColor = 'bg-gray-500';
            } else {
              bgColor = 'bg-blue-500 hover:bg-blue-700';
            }

            return (
              <button
                key={`${colIndex}-${rowIndex}`}
                onClick={() => handleTileClick(category, pointValue)}
                disabled={isAnswered || !question}
                className={`h-24 flex justify-center items-center text-2xl font-bold rounded transition ${bgColor}`}
              >
                {question ? (isAnswered ? '' : `$${pointValue}`) : ''}
              </button>
            );
          })
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-8 w-full">
        {categories.map((category, index) => (
          <div key={index} className="w-full">
            <h2 className="text-center font-bold text-lg bg-yellow-500 p-4 rounded mb-4">
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </h2>

            <div className="flex flex-wrap gap-4 justify-center">
              {points.map((pointValue, idx) => {
                const question = questions.find(
                  (q) => q.category === category && q.points === pointValue
                );

                const isAnswered =
                  question && answeredQuestions.includes(question.id);

                // Determine the color based on result
                const result = questionResults[question?.id];
                let bgColor = '';

                if (!question) {
                  bgColor = 'bg-gray-300 cursor-not-allowed';
                } else if (result === 'correct') {
                  bgColor = 'bg-green-500';
                } else if (result === 'wrong') {
                  bgColor = 'bg-red-500';
                } else if (isAnswered) {
                  bgColor = 'bg-gray-500';
                } else {
                  bgColor = 'bg-blue-500 hover:bg-blue-700';
                }

                return (
                  <button
                    key={`${index}-${idx}`}
                    onClick={() => handleTileClick(category, pointValue)}
                    disabled={isAnswered || !question}
                    className={`w-20 h-20 flex justify-center items-center text-xl font-bold rounded transition ${bgColor}`}
                  >
                    {question ? (isAnswered ? '' : `$${pointValue}`) : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* === Modal === */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white text-black p-8 rounded max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectedQuestion.category.charAt(0) +
                selectedQuestion.category.slice(1).toLowerCase()}
            </h2>
            <p className="mb-4 text-center">{selectedQuestion.question}</p>

            <div className="flex flex-col gap-2 mb-4">
              {selectedQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!selectedOption}
                  className={`border px-4 py-2 rounded hover:bg-gray-200 transition ${
                    selectedOption === option
                      ? option === selectedQuestion.correctAnswer
                        ? 'bg-green-400'
                        : 'bg-red-400'
                      : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {answerFeedback && (
              <p
                className={`font-semibold mb-4 text-center ${
                  answerFeedback === 'Correct!'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {answerFeedback}
              </p>
            )}

            <button
              onClick={handleCloseModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
