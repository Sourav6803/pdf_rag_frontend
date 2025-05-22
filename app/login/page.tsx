
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../server';

const testimonials = [
  {
    quote:
      'AskYourPDF is like having a knowledgeable expert on standby, ready to provide instant answers from our vast document library 24/7.',
    name: 'Tom Jackson',
    title: 'Innovation Project Manager, SGN',
    image: '/user1.jpg',
  },
  {
    quote:
      'This AI system is revolutionizing how we interact with documents – fast, smart, and super easy to use.',
    name: 'Emily Carter',
    title: 'Tech Lead, Cognizant',
    image: '/user2.jpg',
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${server}/api/auth/login`,{ email, password },{ withCredentials: true } );

      toast.success('Login successful!');
      

      router.push('/');
      router.refresh(); // Refresh to reload any server-side rendered data
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Carousel */}
      <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center px-10 py-16">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg text-center"
        >
          <p className="text-2xl font-semibold mb-6">
            {testimonials[activeIndex].quote}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Image
              src={testimonials[activeIndex].image}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-bold">{testimonials[activeIndex].name}</p>
              <p className="text-sm text-gray-500">
                {testimonials[activeIndex].title}
              </p>
            </div>
          </div>
        </motion.div>
        <div className="flex mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                activeIndex === i ? 'bg-black' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="md:w-1/2 flex flex-col justify-center px-10 py-16">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please enter your details to continue
          </p>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border px-4 py-2 rounded shadow-sm hover:bg-gray-50 mb-4"
          >
            <FaGoogle />
            Sign in with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#5b3b2f] text-white hover:bg-[#4a2e24]'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
