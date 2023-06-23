import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../helpers/axios_helper';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make API call to login endpoint
      const response = await request('post', '/api/login', loginData);
      
      // Handle successful login
      // Set authentication token in local storage if applicable
      // You can update this logic based on your backend response
      // Example: setAuthHeader(response.data.token);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Make API call to register endpoint
      const response = await request('post', '/api/register', registerData);
      
      // Handle successful registration
      // Set authentication token in local storage if applicable
      // You can update this logic based on your backend response
      // Example: setAuthHeader(response.data.token);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 p-8 bg-white rounded shadow">
        {isLoginForm ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded"
              required
            />
            <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
              Login
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <Link to="#" onClick={toggleForm} className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 mb-4 border rounded"
              required
            />
            <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
              Register
            </button>
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <Link to="#" onClick={toggleForm} className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
