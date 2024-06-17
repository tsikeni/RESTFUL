import React from 'react';
import './App.css';
import Signup from './components/Signup';
import EmpForm from './components/EmpForm';
import Login from './components/Login';



import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom";
import AdminPage from './components/AdminPage';
import AllEmp from './components/AllEmp';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<AdminPage />} />
          <Route path="/add/employee" element={<EmpForm/>} />
          <Route path="/all/employees" element={<AllEmp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
