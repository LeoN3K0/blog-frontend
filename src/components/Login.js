import React from 'react';

const Login = () => {
  return (
    <div className="w-full  h-screen">
      <div className="max-w-[1000px] px-8 flex flex-col justify-center h-72">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;