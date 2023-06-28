import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Alert, Button } from 'flowbite-react';

const required = (value) => {
  if (!value) {
    return (
      <div>
        <Alert color="failure">
          This field is required!
        </Alert>
      </div>
    );
  }
};

const LoginForm = ({ toggleForm }) => {
  let navigate = useNavigate();
  const loginForm = useRef();
  const loginCheckBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    loginForm.current.validateAll();

    if (loginCheckBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin} ref={loginForm}>
      <Input
        type="text"
        placeholder="Username"
        className="w-full px-3 py-2 mb-4 border rounded"
        name="username"
        value={username}
        onChange={onChangeUsername}
        validations={[required]}
      />
      <Input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 mb-4 border rounded"
        name="password"
        value={password}
        onChange={onChangePassword}
        validations={[required]}
      />
      {!loading ? (
        <button className='w-full'><Button className="w-full">Login</Button></button>
      ) : (
        <button className='w-full'>
          <Button disabled isProcessing className="w-full">
            Login
          </Button>
        </button>
      )}
      {message && (
        <div>
          <Alert color="failure">
            {message}
          </Alert>
        </div>
      )}
      <CheckButton style={{ display: "none" }} ref={loginCheckBtn} />
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="#" onClick={toggleForm} className="text-blue-500">
          Register
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
