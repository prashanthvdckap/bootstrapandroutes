import axios from "axios";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Tbody from "./Tbody";

export default function MyTable({ user }) {
    let heading = [];
    if (user.length > 0) {
        let keys = Object.keys(user[0]);
        let result = keys.map((k) => {
            if (user[0][k]["ishow"] === false) {
                return null;
            } else {
                return k;
            }
        });
        result = result.filter((r) => r !== null);
        heading = result;
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {heading.map((h, index) => {
                        return <th key={index}>{h}</th>;
                    })}
                </tr>
            </thead>
            <Tbody  />
        </Table>
    );
}
