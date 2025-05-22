// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Eye, EyeOff } from 'lucide-react';
// import { server } from '../server';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e:any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     try {
//       const response = await axios.post(`${server}/api/auth/register`, formData);
//       setMessage('Signup successful. You can now log in!');
//       setFormData({ name: '', email: '', password: '' });
//     } catch (err:any) {
//       setMessage(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

//         {message && (
//           <p className="mt-4 text-sm text-center text-red-600">{message}</p>
//         )}

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={togglePassword}
//               className="absolute right-3 top-9 text-gray-500"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-300"
//           >
//             {loading ? 'Signing up...' : 'Sign Up'}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4">
//           Already have an account? <a href="/login" className="text-blue-600">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { server } from "../server";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const testimonials = [
  {
    quote:
      "AskYourPDF is like having a knowledgeable expert on standby, ready to provide instant answers from our vast document library 24/7.",
    name: "Tom Jackson",
    title: "Innovation Project Manager, SGN",
    image: "/user1.jpg",
  },
  {
    quote:
      "This AI system is revolutionizing how we interact with documents – fast, smart, and super easy to use.",
    name: "Emily Carter",
    title: "Tech Lead, Cognizant",
    image: "/user2.jpg",
  },
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${server}/api/auth/register`, formData);
      toast.success("Signup successful. You can now log in!");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Carousel */}
      <div className="md:w-1/2 bg-gradient-to-tr from-indigo-500 to-blue-600 text-white flex flex-col justify-center items-center px-8 py-12 shadow-lg">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl text-center"
        >
          <p className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
            “{testimonials[activeIndex].quote}”
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Image
              src={testimonials[activeIndex].image}
              alt="user"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-lg">{testimonials[activeIndex].name}</p>
              <p className="text-sm text-blue-100">{testimonials[activeIndex].title}</p>
            </div>
          </div>
        </motion.div>
        <div className="flex mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition duration-300 ${
                activeIndex === i ? "bg-white" : "bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Signup Form */}
      <div className="md:w-1/2 flex flex-col justify-center items-center px-8 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Your Account
          </h2>
          <p className="text-center text-sm text-gray-500">
            Get started with AskYourPDF in seconds.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

