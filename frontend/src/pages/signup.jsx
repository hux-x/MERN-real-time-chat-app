import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    password: '',
    gender: '',
    confirmPassword: '',
    username: ''
  });
  const { signup, loading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#eeeeee] via-[#acc6aa] to-[#71a0a5]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-[#77628c]">Create Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="name"
              required
              className="w-full px-3 py-2 mt-1 text-[#acc6aa] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#71a0a5] focus:border-[#71a0a5]"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3 py-2 mt-1 text-[#acc6aa] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#71a0a5] focus:border-[#71a0a5]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 mt-1 text-[#acc6aa] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#71a0a5] focus:border-[#71a0a5]"
            />
          </div>
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 mt-1 text-[#acc6aa] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#71a0a5] focus:border-[#71a0a5]"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
              id="gender"
              name="gender"
              autoComplete="gender"
              required
              className="w-full px-3 py-2 mt-1 text-[#acc6aa] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#71a0a5] focus:border-[#71a0a5]"
            >
              <option value="" disabled hidden>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#71a0a5] to-[#77628c] rounded-lg shadow hover:from-[#77628c] hover:to-[#71a0a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71a0a5] transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="font-medium text-[#71a0a5] hover:text-[#77628c]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
