"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

interface FormData {
  secretKey: string;  
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterComp: React.FC = async () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm<FormData>();

  const role = watch("role"); // Watch the role selection
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const sendData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    console.log(`${process.env.ADMIN_SECRET_KEY}`);
    if (data.role === "admin" && data.secretKey !== "Rishijain") {
      setErrorMessage("Invalid secret key for admin registration.");
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      
      if (res.ok) {
        const message = await res.json(); 
        alert(message.message); 
        reset();
      } else {
        const error = await res.json(); 
        alert(error.message || 'An unknown error occurred');
      }
    } catch (error) {
      alert("An error occurred during registration.");
    }
  };

  const t = await useTranslations("RegisterPage");

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-500 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white text-center">{t('title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              {t('name')}
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 mt-1 border text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
             {t('email')}
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 mt-1 border text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 mt-1 border text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mt-3">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (value: string) =>
                  value === getValues("password") ||
                  "The passwords do not match",
                required: "Please confirm your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 mt-1 text-black border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white">
              {t('role')}
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="w-full p-2 mt-1 border text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>
          {role === "admin" && (
            <div>
              <label htmlFor="secretKey" className="block text-sm font-medium text-white">
                {t('secretKey')}
              </label>
              <input
                type="password"
                id="secretKey"
                {...register("secretKey", {
                  required: role === "admin" && "Secret Key is required for admin registration",
                })}
                className="w-full p-2 mt-1 text-black border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.secretKey && (
                <p className="text-red-500 text-sm">{errors.secretKey.message}</p>
              )}
            </div>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('registerbtn')}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          {t('alreadyAccount')}
          <Link href={"/login"} className="underline bg-blue-800 rounded-md px-4 py-2 text-white" >
            {t('signInBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterComp;
