import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NavBar from './Component/Common/NavBar';
import AddUser from './Component/User/AddUser';
import EditUser from './Component/User/EditUser';
import ViewUser from './Component/User/ViewUser';
import { UserProvider } from './Context/UserContext';

export default function MyRoutes() {
  return (
      <Routes>
          <Route
              index
              path="/"
              element={
                  <>
                      <NavBar />
                      <UserProvider>
                          <ViewUser />
                      </UserProvider>
                  </>
              }
          />
          <Route
              path="/user"
              element={
                  <>
                      <NavBar />
                      <UserProvider>
                          <ViewUser />
                      </UserProvider>
                  </>
              }
          />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="*" element={<div>404</div>} />
          {/* <Route path="user/add" element={} */}
      </Routes>
  );
}
