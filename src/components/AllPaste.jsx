import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

const AllPaste = () => {
  const navigate = useNavigate();
  const [paste, setPaste] = useState([]);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/paste/getall`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          alert("try after some time");
        } else {
          setPaste(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wrong!");
      }
    };

    fetchPaste();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#011627] to-[#01283c] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl text-white font-semibold text-center mb-10">
          🧾 All Pastes
        </h2>

        <ul className="flex flex-col gap-6">
          {paste.map((item, index) => (
            <li
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white shadow-lg hover:bg-white/20 transition border border-white/20 cursor-pointer"
              onClick={() => navigate(`/view/${item._id}`)}
            >
              <h3 className="text-2xl font-semibold underline underline-offset-4 decoration-cyan-400 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-200 mb-4">
                {item.content.split(" ").slice(0, 20).join(" ")}...
              </p>

              <div className="flex justify-between items-center text-xs text-gray-300">
                <p>
                  Created by:{" "}
                 {item.owner?.name || "Unknown"}
                </p>
                <p>
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPaste;
