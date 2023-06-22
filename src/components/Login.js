import React, { useState } from 'react';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className={`max-w-md w-full p-8 bg-white rounded-lg ${isRegistering ? 'rotate-y-180' : ''}`}>
        <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <form>
          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
          )}
          {!isRegistering && (
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input type="password" id="password" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <input type="password" id="confirmPassword" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
          )}
          <div className="flex justify-between">
            {isRegistering && (
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                Register
              </button>
            )}
            {!isRegistering && (
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                Login
              </button>
            )}
            <button type="button" className="text-blue-500 hover:text-blue-600 text-sm" onClick={handleRegisterClick}>
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
