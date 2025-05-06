import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:1000/api/v1/sign-in", formData);

            if (response.status === 200) {
                const { token, id, role } = response.data;

                dispatch(authActions.setUser({ id, role, token }));


                localStorage.setItem("token", token);
                localStorage.setItem("userId", id);
                localStorage.setItem("role", role);

                setSuccess("Login successful!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } else {
                setError(response.data.message || "Invalid credentials.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="grid md:grid-cols-2 items-center gap-12 max-w-6xl w-full rounded-lg overflow-hidden">
                
                {/* Left Section */}
                <div className="p-8">
                    <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                        Seamless Login for Exclusive Access
                    </h2>
                    <p className="text-sm mt-6 text-slate-600 leading-relaxed">
                        Immerse yourself in a hassle-free login journey with our intuitively designed form.
                    </p>
                    <p className="text-sm mt-8 text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 font-medium hover:underline">Register here</Link>
                    </p>
                </div>

                {/* Right Section */}
                <form onSubmit={handleSubmit} className="p-8 md:border-l border-gray-200 w-full">
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Sign in</h3>

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
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                                placeholder="Enter Email"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                                placeholder="Enter Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md shadow-lg transition duration-300"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
