import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;
const Home = () => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [permission, setPermission] = useState("Public");
  const [isLoading, setIsLoading] = useState(false);
  const [popular,setPopular]=useState([]);
    const [recent,setRecent]=useState([]);


  const handleClick = async () => {

    setIsLoading(true);
    if (!title.trim() || !content.trim()) {
      alert("Title and Content cannot be empty!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/paste/new`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, Permissions: permission }),
      });
      const data = await res.json();
      console.log('Saved:', data);
      alert("Paste Saved");
      setTitle('');
    setContent('');
    } catch (error) {
      console.log(error);
    } finally {
       
      setIsLoading(false);
    }
  };
 useEffect(() => {
  const fetchPopular = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/paste/popular`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      if (!res.ok) {
        alert("Something went wrong");
        return;
      }

      const data = await res.json();
      setPopular(data);

    } catch (error) {
      alert("Got some error");
      console.error(error);
    }
  };
  const fetchRecent=async()=>{
 try {
      const res = await fetch(`${BASE_URL}/api/paste/recent`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      if (!res.ok) {
        alert("Something went wrong");
        return;
      }

      const data = await res.json();
      setRecent(data);

    } catch (error) {
      alert("Got some error");
      console.error(error);
    }
  };
fetchRecent();
  fetchPopular(); // ✅ Call the function inside useEffect
}, []); 


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 flex flex-col md:flex-row items-start gap-6 justify-center">
      {/* Left Side */}
      <div className="w-full md:w-[60%] glass p-6 rounded-2xl shadow-lg backdrop-blur-xl border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">📝 Create Paste</h2>

        <input
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter title..."
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full h-[300px] px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Start typing content..."
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="mt-4 mb-6 bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
        >
          <option className="text-black">Public</option>
          <option className="text-black">Private</option>
        </select>

        <button
          className={`w-full py-3 text-lg font-semibold rounded-lg transition-all bg-cyan-400 hover:bg-cyan-500 text-white ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : '💾 Save Paste'}
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-[30%] flex flex-col gap-6 ">
        {/* Popular */}
        <div className="glass bg-black/10 border border-white/10 rounded-2xl p-4 backdrop-blur-lg shadow-md">
          <h2 className="text-2xl font-semibold text-white mb-3">🔥 Popular Pastes</h2>
          <ul className="flex flex-col gap-3">
            {popular.slice(0, 5).map((items,id)=>(
              <li
  key={id}
  className="text-white bg-white/10 p-3 rounded-lg cursor-pointer hover:underline transition-all duration-300"
  onClick={()=>navigate(`/view/${items._id}`)}
>
                <p>{items.title}</p>
              </li>
            ))}
           
           
          </ul>
          <p className="text-md font-light underline text-gray-200 mt-2 self-end cursor-pointer"
          onClick={()=>{navigate(`/AllPaste`)}}>Show all</p>
        </div>

        {/* Recent */}
        <div className="glass border bg-black/10 border-white/10 rounded-2xl p-4 backdrop-blur-lg shadow-md">
          <h2 className="text-2xl font-semibold text-white mb-3">🕓 Recent Pastes</h2>
          <ul className="flex flex-col gap-3">
            {recent.slice(0, 5).map((items,id)=>(
              <li
  key={id}
  className="text-white bg-white/10 p-3 rounded-lg cursor-pointer hover:underline transition-all duration-300"
  onClick={()=>navigate(`/view/${items._id}`)}
>
                <p>{items.title}</p>
              </li>
            ))}
          </ul>
            <p className="text-md font-light underline text-gray-200 mt-2 self-end cursor-pointer"
          onClick={()=>{navigate(`/yourPaste`)}}>Show all</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
