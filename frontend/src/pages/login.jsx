import useLogin from '../hooks/useLogin';
import './styles/login.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const LoginPage = () => {
  const [inputs, setInputs] = useState({
    password: '',
    username: ''
  });
  const { login, loading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#eeeeee] via-[#acc6aa] to-[#71a0a5]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-[#77628c]">Login to Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              value={inputs.username}
              onChange={(e)=>{setInputs({...inputs,username:e.target.value})}}
              id="email"
              name="email"
              type="text"
              autoComplete="email"
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
              onChange={(e)=>{setInputs({...inputs,password:e.target.value})}}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 text-[#acc6aa] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#71a0a5] focus:border-[#71a0a5]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 text-[#71a0a5] border-gray-300 rounded focus:ring-[#71a0a5]"
              />
              <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#71a0a5] hover:text-[#77628c]">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#71a0a5] to-[#77628c] rounded-lg shadow hover:from-[#77628c] hover:to-[#71a0a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#71a0a5] transition-all duration-300 ease-in-out"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to={'/signup'} className="font-medium text-[#71a0a5] hover:text-[#77628c]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
