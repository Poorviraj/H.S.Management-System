import React, { useState } from 'react';
import axios from 'axios'
import { endPoints } from '../utils/endpoints';
import { Link, useNavigate } from 'react-router-dom';

const { SIGNUP_API } = endPoints;

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {

            const res = await axios.post(SIGNUP_API, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (!res.data.success) {
                alert(res.data.message);
            }
            console.log(res.data);
            const { token,role } = res.data;
            const name = formData.name.split(" ")[0];
            localStorage.setItem("name",name);
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if(role === "Hospital_Admin"){
                navigate('/myHospitals')
            } else{
                navigate('/')
            }

        } catch (error) {
            alert(error);
        }

        setFormData({
            name: '',
            email: '',
            password: '',
            role: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">
                    Hospital Management System
                </h2>
                <h3 className="text-xl text-gray-800 text-center mb-6">
                    Create Account
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="role" className="block text-gray-700 mb-2">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a role</option>
                            <option value="User">User</option>
                            <option value="Hospital_Admin">Hospital Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to='/login' className=' text-blue-600 hover:underline  ' >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;