import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

const EditPaste = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/paste/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const data = await res.json();
        setPaste(data);
      } catch (err) {
        console.error("Error fetching paste:", err);
      }
    };

    fetchPaste();
  }, [id]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/paste/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(paste),
      });
      const data = await res.json();
      if (!res.ok) {
        // Handle different error statuses
        if (res.status === 403) {
          alert("⛔ You are not allowed to edit this paste.");
        } else {
          alert("❌ Update failed: " + (data.error || "Unknown error"));
        }
        return;
      }
      navigate("/YourPaste"); // change to your actual route
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!paste) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0c29] text-white">
        <p className="text-lg font-medium animate-pulse">Loading paste...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex justify-center items-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          📝 Edit Your Paste
        </h2>

        <input
          type="text"
          placeholder="Edit title..."
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={paste.title}
          onChange={(e) => setPaste({ ...paste, title: e.target.value })}
        />

        <textarea
          placeholder="Edit your content..."
          className="w-full h-[300px] mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={paste.content}
          onChange={(e) => setPaste({ ...paste, content: e.target.value })}
        />

        <div className="flex justify-end">
          <button
            className={`bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "✅ Update Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPaste;
