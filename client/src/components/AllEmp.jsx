



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AllEmp() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [employeeId, setEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    national_identity: '',
    telephone: '',
    email: '',
    department_name: '',
    position: '',
    laptop_manufacturer: '',
    model: '',
    serial_number: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/emp/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error('Data fetched is not an array:', data);
        setEmployees([]); // Initialize employees as an empty array
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]); // Initialize employees as an empty array
    }
  };

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:4000/api/emp/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployeeId(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching employee data for editing:', error);
      alert('Failed to fetch employee data for editing');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:4000/api/emp/edit/${employeeId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert('Employee updated successfully');
      setFormData({
        firstname: '',
        lastname: '',
        national_identity: '',
        telephone: '',
        email: '',
        department_name: '',
        position: '',
        laptop_manufacturer: '',
        model: '',
        serial_number: '',
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:4000/api/emp/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert('Employee deleted successfully');
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-8">

      
      <h1 className="text-2xl font-bold mb-4">All Employees</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">National Identity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laptop Manufacturer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEmployees.map(employee => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.firstname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.lastname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.national_identity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.department_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.laptop_manufacturer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.serial_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={employeesPerPage}
        totalItems={employees.length}
        paginate={paginate}
      />
      {employeeId && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-2">Edit Employee</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="national_identity" className="block text-sm font-medium text-gray-700">National Identity:</label>
              <input
                type="text"
                id="national_identity"
                name="national_identity"
                value={formData.national_identity}
                onChange={(e) => setFormData({ ...formData, national_identity: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone:</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="department_name" className="block text-sm font-medium text-gray-700">Department Name:</label>
              <input
                type="text"
                id="department_name"
                name="department_name"
                value={formData.department_name}
                onChange={(e) => setFormData({ ...formData, department_name: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="laptop_manufacturer" className="block text-sm font-medium text-gray-700">Laptop Manufacturer:</label>
              <input
                type="text"
                id="laptop_manufacturer"
                name="laptop_manufacturer"
                value={formData.laptop_manufacturer}
                onChange={(e) => setFormData({ ...formData, laptop_manufacturer: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700">Serial Number:</label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                value={formData.serial_number}
                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4" aria-label="Pagination">
      <ul className="inline-flex">
        {pageNumbers.map(number => (
          <li key={number}>
            <Link
              to="#"
              onClick={() => paginate(number)}
              className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AllEmp;
