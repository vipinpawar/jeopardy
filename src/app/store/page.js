'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const StorePage = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const userRole = session?.user?.membership || 'free'; // assuming you store it like this

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get('/api/store/items');
      setItems(res.data);
    };

    if (status === 'authenticated') {
      fetchItems();
    }
  }, [status]);

  const getDiscountPercentage = (role) => {
    switch (role) {
      case 'monthly':
        return 10;
      case 'yearly':
        return 20;
      case 'lifetime':
        return 30;
      default:
        return 0;
    }
  };

  const calculateDiscountedPrice = (price) => {
    const discount = getDiscountPercentage(userRole);
    return price - (price * (discount / 100));
  };

  if (status !== 'authenticated') {
    return <p className="text-center text-red-500 mt-20">Please log in to access the store.</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Store</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold text-indigo-600">
              ${calculateDiscountedPrice(item.basePrice).toFixed(2)}
            </p>
            <button
              onClick={() => handlePurchase(item.id)}
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 transition rounded py-2 font-medium"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
