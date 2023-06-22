import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="w-full  h-screen">
      <div className="max-w-[1000px] px-8 flex flex-col justify-center h-60">
      <h2>Page Does Not Exist!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
      </div>
    </div>
  );
};

export default NoMatch;