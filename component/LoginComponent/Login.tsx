"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginComp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json(); 
        localStorage.setItem('token', result.userData);
        alert(result.message);
        console.log(result.userType); 
        if(result.userType === "admin"){
            router.push('/adminDashboard');
        }
        else{
            router.push('/dashboard');
        }
        
      } else {
        const error = await response.json(); 
        alert(`Failed to Login: ${error.message}`);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-black text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="border-b-2 border-indigo-300 border-spacing-3 p-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className='p-2'>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
              })}
              className="w-full p-2 mt-1 border text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Create an Account{" "}
          <Link href="/" className="underline bg-blue-800 rounded-md px-4 py-2 text-white">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
