import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-80 p-8 bg-white rounded shadow">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        {isLoginForm ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <RegistrationForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Login;