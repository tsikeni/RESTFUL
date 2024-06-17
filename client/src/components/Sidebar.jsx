import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
   <div>
   
    <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/all/employee" className="text-blue-500 hover:text-blue-700"> All Employees</Link>
            </li>
            <li>
              <Link to="/admin/products" className="text-blue-500 hover:text-blue-700">Products</Link>
            </li>
            <li>
              <Link to="/admin/orders" className="text-blue-500 hover:text-blue-700">Orders</Link>
            </li>
          </ul>
        </div>
      </div>
   
   </div>
  )
}

export default Sidebar