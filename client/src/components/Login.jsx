import React, { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:3001/api/users/login";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); //Toggle btwn login & signup
  const [name, setName] = useState(''); //Only used for signup)
  const [message, setMessage] = useState(''); //Store messages

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(API_URL, { email, password });
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("userId", response.data.userId);
  //     onLogin(response.data.userId);
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     alert("Invalid credentials");
  //   }
  // };

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');
  
    try {
      if (isSignup) {
        const response = await axios.post("http://localhost:3001/api/users/signup", { name, email, password });
        setMessage(response.data.message);
      } else {
        const response = await axios.post(API_URL, { email, password });
  
        console.log("Login Response:", response.data); // Debugging
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
  
        if (onLogin) {
          onLogin(response.data.userId);
        } else {
          console.warn("onLogin function is missing!");
        }
      }
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error);
      setMessage(error.response?.data?.message || 'Authentication failed');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/5 max-w-2xl p-8 rounded-lg">
        <h1 className="mt-5 font-bold text-3xl ">Your Fitness Tracker</h1>

        <h2 className="text-gray-600  mb-10">
          {isSignup ? "Create an Account" : "Please Login with your details"}
        </h2>

        {message && <p className="text-red-500">{message}</p>}

        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          {isSignup && (
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
         {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 hover:underline">
            {isSignup ? "Login here" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
