import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 pt-[80px] min-h-screen">
      <div className="container mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Latest Posts</h2>
            <ul>
              <li className="text-blue-500">Post 1</li>
              <li className="text-blue-500">Post 2</li>
              <li className="text-blue-500">Post 3</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Categories</h2>
            <ul>
              <li className="text-blue-500">Category 1</li>
              <li className="text-blue-500">Category 2</li>
              <li className="text-blue-500">Category 3</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Tags</h2>
            <ul>
              <li className="text-blue-500">Tag 1</li>
              <li className="text-blue-500">Tag 2</li>
              <li className="text-blue-500">Tag 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
