import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
<div className="w-full p-4 sticky top-0 z-50 bg-[#5A189A] text-white shadow-md">
  <div className="flex justify-center items-center max-w-7xl mx-auto">
    
    {/* Centered Menu */}
    <ul className="flex gap-7 justify-center items-center mx-auto">
      <li>
        <Link
          to="/"
          className="font-semibold text-lg px-3 py-2 rounded hover:text-[#202021] transition-colors"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/AllPaste"
          className="font-semibold text-lg px-3 py-2 rounded hover:text-[#202021] transition-colors"
        >
          All Paste
        </Link>
      </li>
      <li>
        <Link
          to="/NewPaste"
          className="font-semibold text-lg px-3 py-2 rounded hover:text-[#202021] transition-colors"
        >
          New Paste
        </Link>
      </li>
      <li>
        <Link
          to="/yourPaste"
          className="font-semibold text-lg px-3 py-2 rounded hover:text-[#202021] transition-colors"
        >
          Your Paste
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="font-semibold text-lg px-3 py-2 rounded hover:text-[#202021] transition-colors"
        >
          About
        </Link>
      </li>
    </ul>

 
   <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }}
    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2 rounded hover:bg-white/20 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
    Sign Out
  </button>
  </div>
</div>

  );
};

export default NavBar;
