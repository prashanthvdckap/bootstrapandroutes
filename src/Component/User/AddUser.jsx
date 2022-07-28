import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Common/NavBar';

function AddUser() {
          const [form, setForm] = useState({
              email: "",
              password: "",
              firstName: "",
              lastName: "",
          });
          const navigate = useNavigate();
          const [message, setMessage] = useState("");
          const handleSubmit = (e) => {
              e.preventDefault();
              if (form.email === "" || form.password === "" || form.firstName === "" || form.lastName === "") {
                  setMessage("Please fill all the fields");
                  return false;
              } else {
                  setMessage("");
                  axios.post("https://crudcrud.com/api/48e1532f68914e6c91e2395c6aedc828/user", form).then((res) => {
                        navigate("/user");
                  });
              }
          };

          const handleChange = (e) => {
              e.preventDefault();
              setForm((prevData) => {
                  return {
                      ...prevData,
                      [e.target.name]: e.target.value,
                  };
              });
          };
  return (
      <>
          <NavBar />
          {message !== "" && (
              <Alert key={"danger"} variant={"danger"}>
                  {message}
              </Alert>
          )}
          <div className="container">
              <Form onSubmit={handleSubmit}>
                  <h2>Add Users</h2>
                  <br />
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter First Name" />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter Last Name" />
                  </Form.Group>
                  <br />
                  <Button type="submit">Submit</Button>
              </Form>
          </div>
      </>
  );
}

export default AddUser