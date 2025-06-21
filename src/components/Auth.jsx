import {set} from "mongoose";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;


const Auth = () => {
      const navigate = useNavigate(); 
      const[name,setName]=useState('')
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
const [isLoading, setIsLoading] = useState(false);
const [newUser,setNewUser]=useState(false);

   const handleSignInClick = async () => {
  setIsLoading(true);

  if (!username.trim() || !password.trim()) {
    alert("Username and Password cannot be empty!");
    setIsLoading(false);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed!');
    } else {
      console.log('Logged in:', data);
      localStorage.setItem('token', data.token);
navigate('/');
     
     
    }

  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong!');
  } finally {
    setIsLoading(false);
  }
};

const handleSignUpClick = async () => {
  setIsLoading(true);

  
  if (!username.trim() || !password.trim() || !name.trim()) {
    alert("Fields cannot be empty!");
    setIsLoading(false);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password }),
    });
    console.log("i am res",res)

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      alert(data.message || 'Signup failed!');
    } else {
      console.log('Signed up:', data);
      localStorage.setItem('token', data.token); 
      navigate('/');
    }

  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong!');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-[400px] p-8 rounded-xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 text-white space-y-4">
        <h2 className={`text-2xl font-bold text-center ${newUser ? 'hidden' : 'block'}`}>Login</h2>
            <h2 className={`text-2xl font-bold text-center ${newUser ? 'block' : 'hidden'}`}>Sign up</h2>
         <div className="space-y-2">
          <label className={`text-lg font-medium ${newUser ? 'block' : 'hidden'}`}>name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className={`w-full p-2 rounded bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 ${newUser ? 'block' : 'hidden'}`}

            onChange={(e)=>{setName(e.target.value)}}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full p-2 rounded bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{setUsername(e.target.value)}}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 rounded bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>

        <button className={`w-full mt-4 py-2 bg-blue-400 hover:bg-blue-500 rounded font-bold transition ${isLoading?'opacity-50 cursor-not-allowed' : ''} ${newUser ? 'hidden' : 'block'}`}
        onClick={handleSignInClick}>
          Sign in
        </button>
        <button className={`w-full mt-4 py-2 bg-blue-400 hover:bg-blue-500 rounded font-bold transition ${isLoading?'opacity-50 cursor-not-allowed' : ''}${newUser ? 'block' : 'hidden'}`}
        onClick={handleSignUpClick}>
          Sign up
        </button>
        
        <p className={`text-white underline text-lg cursor-pointer ${newUser ? 'hidden' : 'block'}`}  onClick={()=>{setNewUser(true)}}>sign up here</p>
      </div>
    </div>
  );
};

export default Auth;
