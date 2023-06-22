import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">OOPS...</h2>
        <p className="text-lg">Looks like the page doesn't exist</p>
        <p className="mt-4">
          <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
            Go to the home page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NoMatch;
