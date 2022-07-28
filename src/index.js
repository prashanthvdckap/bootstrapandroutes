import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './Component/User/AddUser';
import ViewUser from './Component/User/ViewUser';
import 'font-awesome/css/font-awesome.min.css';
import EditUser from './Component/User/EditUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<ViewUser />} />
                <Route path="/user" element={<ViewUser />} />
                <Route path="/user/add" element={<AddUser />} />
                <Route path="user/edit/:id" element={<EditUser />} />
                <Route path="*" element={<div>404</div>} />
                {/* <Route path="user/add" element={} */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
