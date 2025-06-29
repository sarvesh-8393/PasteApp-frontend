import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;

const ViewPaste = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    const fetchPaste = async () => {
      const res = await fetch(`${BASE_URL}/api/paste/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      const data = await res.json();
      setPaste(data);

      // ✅ Auto-copy the paste content to clipboard
      if (data.content) {
        try {
          await navigator.clipboard.writeText(data.content);
          console.log("✅ Paste content copied to clipboard");
        } catch (err) {
          console.error("❌ Failed to copy paste content:", err);
        }
      }
    };

    fetchPaste();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/paste/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(`❌ ${data.error || "Something went wrong!"}`);
      }

      alert(`Deleted: ${data.title}`);
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Something went wrong while deleting.");
    }
  };

  if (!paste) return <p className="text-white">Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center overflow-hidden">
      <div className='w-[800px] mt-4 rounded-lg p-3 bg-white/10 flex flex-col'>
        <p className='text-white text-3xl font-semibold self-center'>
          {paste.title}
        </p>

        <div className="w-full h-px bg-gray-600 my-4" />

        <p className='text-gray-200 text-lg self-start whitespace-pre-line'>
          {paste.content}
        </p>

        <div className="w-full h-px bg-gray-600 my-4" />

        <p className="text-white text-lg font-light self-start">
          Created by: {paste.owner?.name || "Unknown"}
        </p>

        <p className="text-white text-lg font-light self-end">
          Date: {new Date(paste.createdAt).toLocaleString()}
        </p>
      </div>

      <ul className="flex flex-row justify-evenly bg-[#2f2f46] rounded-lg text-white shadow-md mt-4">
        <li
          className="px-4 py-2 hover:bg-blue-600 transition-colors rounded-l-md cursor-pointer font-medium"
          onClick={() => navigate(`/edit/${paste._id}`)}
        >
          ✏️ Edit
        </li>
        <li
          className="px-4 py-2 hover:bg-red-600 transition-colors cursor-pointer font-medium"
          onClick={handleDelete}
        >
          🗑️ Delete
        </li>
        <li
          className="px-4 py-2 hover:bg-green-600 transition-colors rounded-r-md cursor-pointer font-medium"
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url)
              .then(() => alert("✅ Link copied to clipboard!"))
              .catch((err) => {
                console.error("Copy failed:", err);
                alert("❌ Failed to copy link.");
              });
          }}
        >
          🔗 Share
        </li>
      </ul>
    </div>
  );
};

export default ViewPaste;
