// AdminPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
     <Sidebar/>


      <div className="flex-1 p-8">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">
        <Link to="/all/employees" className="text-blue-500 hover:text-blue-700">See All Employees</Link>
      </h2>
    </div>
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">
        <Link to="/add/employee" className="text-blue-500 hover:text-blue-700">Add Employee</Link>
      </h2>
    </div>
  </div>
</div>



    </div>
  );
}

export default AdminPage;
