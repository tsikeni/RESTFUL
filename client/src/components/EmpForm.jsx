import React,{useState} from 'react'
import Sidebar from './Sidebar';
import axios from 'axios';


function EmpForm() {
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/api/emp/register', formData);
          console.log(response.data);
          alert('Employee registered successfully');
        } catch (error) {
          console.error('Error registering employee:', error);
          alert('Failed to register employee');
        }
      };
  return (
    <div className=''>
<form onSubmit={handleSubmit}>

<div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
        <div className="md:flex w-full">


            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">Register Employee</h1>
                    <p>Enter Information to register employee</p>
                </div>

                <div>
                    <div className="flex -mx-3">

                        <div className="w-1/2 px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="First Name"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                />
                            </div>   
                        </div>


                        <div className="w-1/2 px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="Last Name"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                    </div>
               

                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="number" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="Phone Number"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}/>
                            </div>
                        </div>
                    </div>



                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="email" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="johnsmith@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>



                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="department"
                                name="department_name"
                                value={formData.department_name}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>




                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>



                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="laptop manufacturer"
                                name="laptop_manufacturer"
                                value={formData.laptop_manufacturer}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="text" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                 placeholder="Model"
                                 name="model"
                                value={formData.model}
                                onChange={handleChange}
                                 />
                            </div>
                        </div>
                    </div>


                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                type="number" 
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                placeholder="Serial Number"
                                name="serial_number"
                                value={formData.serial_number}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-3">
                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</form>

    </div>
  )
}

export default EmpForm;

