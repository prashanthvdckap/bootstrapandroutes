import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyTable from "../Common/MyTable";
import NavBar from "../Common/NavBar";

export default function ViewUser(props) {
 
    const [user, setUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const removeUser = (id) => {
        axios.delete(`https://crudcrud.com/api/48e1532f68914e6c91e2395c6aedc828/user/${id}`).then((res) => {
            setUser((prevData) => {
                return prevData.filter((item) => item._id.value !== id);
            });
        });
    };
    

    useEffect(() => {
        axios.get("https://crudcrud.com/api/48e1532f68914e6c91e2395c6aedc828/user").then((res) => {
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
                                <Link to={`/user/edit/${item._id}`}>
                                    <i
                                        className="fa fa-edit"
                                        
                                    ></i> </Link>
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
    }, []);

    return (
        <>
        <NavBar />
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
        </>
    );
}

