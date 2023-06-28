import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div>
        <Alert color="failure">
          This is not a valid email.
        </Alert>
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div>
        <Alert color="failure">
        The username must be between 3 and 20 characters.
        </Alert>
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div>
        <Alert color="failure">
        The password must be between 6 and 40 characters.
        </Alert>
      </div>
    );
  }
};

const RegistrationForm = ({ toggleForm }) => {
  const registerForm = useRef();
  const registerCheckBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    registerForm.current.validateAll();

    if (registerCheckBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <Form onSubmit={handleRegister} ref={registerForm}>
      {!successful && (
        <div>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeUsername}
            className="w-full px-3 py-2 mb-4 border rounded"
            validations={[required, vusername]}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            className="w-full px-3 py-2 mb-4 border rounded"
            validations={[required, validEmail]}
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border rounded"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required, vpassword]}
          />
          <button className='w-full'><Button className="w-full">Sign Up</Button></button>
        </div>
      )}
      {message && (
        <div>
          <Alert color={successful ? "success" : "failure"}>
            {message}
          </Alert>
        </div>
      )}
      <CheckButton style={{ display: "none" }} ref={registerCheckBtn} />
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="#" onClick={toggleForm} className="text-blue-500">
          Login
        </Link>
      </p>
    </Form>
  );
};

export default RegistrationForm;