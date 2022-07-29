import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Common/NavBar";

function EditUser() {
    const url = process.env.REACT_APP_BACKEND_URL;

    const params = useParams();
    const id = params.id;
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });


    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    useEffect(()=> {
        axios.get(url+"user/" + id).then((res) => {
            setForm(() => {
                return {
                    email: res.data.email,
                    password: res.data.password,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                };
            })
    });
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email === "" || form.password === "" || form.firstName === "" || form.lastName === "") {
            setMessage("Please fill all the fields");
            return false;
        } else {
            setMessage("");
            axios.put(url+"user/" + id, form).then((res) => {
                navigate("/user");
            }).catch((err) => {
                console.log(err)
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
                    <h2>Edit Users</h2>
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

export default EditUser;
