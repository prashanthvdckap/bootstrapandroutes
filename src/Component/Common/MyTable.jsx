import axios from 'axios';
import React, { useState } from 'react'
import { Table } from 'react-bootstrap';

export default function MyTable({user}) {
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
                 {
                        heading.map((h,index) => {
                            return <th key={index}>{h}</th>
                        })
                 }
              </tr>
          </thead>
          <tbody>
              {user.map((item, index) => {
                  return (
                      <tr key={index}>
                          {Object.keys(item).map((key, index) => {
                            let value = item[key];
                              return value.ishow ? <td key={index}>{value.value}</td> : null ;
                          })}
                      </tr>
                  );
              })}
          </tbody>
      </Table>
  );
}
