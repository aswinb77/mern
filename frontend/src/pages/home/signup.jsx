import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        mobile: "",
        role: "buyer"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setSuccess("");  // Clear success message
            return;
        }

        try {
            const response = await axios.post("http://localhost:1000/api/v1/sign-up", formData);

            if (response.status === 201 || response.status === 200) {
                setSuccess("Registration successful!");
                setError("");
                setTimeout(() => {
                    navigate("/LogIn");
                }, 2000);  // Redirect after 2 seconds
            } else {
                setError(response.data.message || "Registration failed.");
                setSuccess("");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
            setSuccess("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="grid md:grid-cols-2 items-center gap-12 max-w-6xl w-full rounded-lg overflow-hidden">

                {/* Left Section */}
                <div className="p-8">
                    <h2 className="text-4xl font-bold text-slate-900 leading-tight">Join Us Today!</h2>
                    <p className="text-sm mt-6 text-slate-600 leading-relaxed">
                        Create your account to access exclusive features and start exploring our platform.
                    </p>
                    <p className="text-sm mt-8 text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">Login here</Link>
                    </p>
                </div>

                {/* Right Section */}
                <form onSubmit={handleSubmit} className="p-8 md:border-l border-gray-200 w-full">
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Sign up</h3>

                    {/* Alerts */}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4" role="alert">
                            <strong className="font-bold">Success: </strong>
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">

                        {/* Username */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength="3"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                placeholder="Create password"
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm password"
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="Enter your address"
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                pattern="\d{10}"
                                placeholder="Enter your mobile number"
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Select Role</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="buyer"
                                        checked={formData.role === "buyer"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Buyer
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="merchant"
                                        checked={formData.role === "merchant"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Merchant
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md shadow-lg transition duration-300">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
