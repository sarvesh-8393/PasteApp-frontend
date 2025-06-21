// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/secure-note.svg'; // Use any illustration or blob
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-10 flex flex-col items-center justify-center">
      
      <motion.div
        className="max-w-6xl w-full glass p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
          
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Secure Paste"
              className="w-[350px] md:w-[450px] rounded-xl shadow-xl"
            />
          </div>

          {/* Right: Text Content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About PasteHub</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <span className="text-cyan-400 font-semibold">PasteHub</span> is your go-to solution for securely sharing and managing text-based content.
              Whether it’s code snippets, notes, or ideas — share it with ease, access it from anywhere, and stay organized with full privacy controls.
            </p>
            <p className="text-gray-400 mb-4 italic">
              Built with 💖 using React, Node.js, MongoDB, and TailwindCSS. Deployed with modern DevOps pipelines.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com/your-profile"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Sarvesh Pattanshetti. Crafted with passion 🚀
      </p>
    </div>
  );
};

export default About;
