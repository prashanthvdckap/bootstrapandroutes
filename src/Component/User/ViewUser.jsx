import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyTable from "../Common/MyTable";
import { UserContext } from "../../Context/UserContext";
export default function ViewUser(props) {
    const url = process.env.REACT_APP_BACKEND_URL;
    const { user, setUser } = useContext(UserContext);
    console.log(user)
    const [showModal, setShowModal] = useState(false);
    const removeUser = (id) => {
        axios.delete(`${url}user/${id}`).then((res) => {
            setUser((prevData) => {
                return prevData.filter((item) => item._id.value !== id);
            });
        });
    };

    const [message, setMessage] = useState("");

    const [editForm, setEditForm] = useState({
        _id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });



    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editForm.email === "" || editForm.password === "" || editForm.firstName === "" || editForm.lastName === "") {
            setMessage("Please fill all the fields");
            return false;
        } else {
            setMessage("");
            let payload = {
                email: editForm.email,
                password: editForm.password,
                firstName: editForm.firstName,
                lastName: editForm.lastName,
            }
            axios
                .put(url + "user/" + editForm._id, payload)
                .then((res) => {
                    fetchUser()
                    console.log(res);
                    setShowModal(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleEditChange = (e) => {
        e.preventDefault();
        setEditForm((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const fetchUser = () => {
           axios.get(url + "user").then((res) => {
            console.log(res.data)
               setUser((prevData) => {
                   let result = res.data.map((item, index) => {
                       return {
                           _id: { ishow: false, value: item._id },
                           email: { ishow: true, value: item.email },
                           password: { ishow: false, value: item.password },
                           firstName: { ishow: true, value: item.firstName },
                           lastName: { ishow: true, value: item.lastName },
                           action: {
                               ishow: true,
                               value: (
                                   <>
                                       <i
                                           className="fa fa-edit"
                                           onClick={(e) => {
                                               setEditForm(item);
                                                setShowModal(true);
                                           }}
                                       ></i>
                                       &nbsp;
                                       <i onClick={(e) => removeUser(item._id)} className="fa fa-trash"></i>{" "}
                                   </>
                               ),
                           },
                       };
                   });
                   return result;
               });
           });
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <>
          
                <br />

                <div className="row">
                    <div className="col-md-10 text-center">
                        <h1>Users</h1>
                    </div>
                    <div className="col-md-2">
                        <Link to="/user/add">
                            <Button>Add User</Button>
                        </Link>
                    </div>
                </div>

                <MyTable user={user} />
                <MyModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    editForm={editForm}
                    handleEditChange={handleEditChange}
                    handleEditSubmit={handleEditSubmit}
                />
        </>
    );
}

function MyModal({ showModal, setShowModal, editForm, handleEditSubmit, handleEditChange }) {
    return (
        <Modal
            show={showModal}
            onHide={() => {
                setShowModal(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
   
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={editForm.email} onChange={handleEditChange} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={editForm.password} onChange={handleEditChange} placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={editForm.firstName}
                            onChange={handleEditChange}
                            placeholder="Enter First Name"
                        />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={editForm.lastName} onChange={handleEditChange} placeholder="Enter Last Name" />
                    </Form.Group>
                    <br />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        handleEditSubmit(e);
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
