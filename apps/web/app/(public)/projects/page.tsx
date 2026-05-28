"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGetProjectQuery } from "../../../redux/apis/admin.api";
import { FaGithub } from "react-icons/fa";

const text = "Projects";

const Projects = () => {
  const {data} = useGetProjectQuery()
    const [activeTab, setActiveTab] = useState("All")

  return (
    <>
      <div className="min-h-screen md:mt-30 mt-20 flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto z-10 text-center ">
          
          {/* HEADING */}
                <motion.h1 className="sm:text-5xl text-4xl md:text-7xl font-bold mb-4 leading-tight text-center">
                  {text.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block bg-gradient-to-t from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
          
                {/* SUBTEXT */}
                <p className="text-gray-400 text-xl md:text-2xl mt-2 mb-0 md:mb-12">
                  Some Of my Recent Work
                </p>

          {/* display  */}

          <div className="flex gap-3 mt-6">

            <button
              onClick={() => setActiveTab("All")}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === "All"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              All
            </button>
        
            <button
              onClick={() => setActiveTab("Web App")}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === "Web App"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              🌐 Website
            </button>
        
            <button
              onClick={() => setActiveTab("Mobile App")}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === "Mobile App"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              📱 App
            </button> 

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">

            {data?.result
              ?.filter((item: any) => {
        
                // ✅ ALL
                if (activeTab === "All") {
                  return true
                }
        
                // ✅ FILTER CATEGORY
                return item.category === activeTab
              })
        
              .map((item: any) => (
        
                <div
                  key={item.id}
                  className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
        
                  {/* IMAGE */}
                  <div className="relative h-56 w-full overflow-hidden">
        
                    <img
                      src={`${item.hero}?t=${Date.now()}`}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition"
                    />
        
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
        
                  </div>
        
                  {/* CONTENT */}
                  <div className="p-6">
        
                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>
        
                    <p className="mt-2 text-gray-400">
                      {item.desc}
                    </p>
        
                    {/* TECH STACK */}
                    <div className="mt-4 flex flex-wrap gap-2">
        
                      {Array.isArray(item.tech)
                        ? item.tech.map((t: string, i: number) => (
        
                          <span
                            key={i}
                            className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400"
                          >
                            {t}
                          </span>
        
                        ))
        
                        : item.tech?.split(",").map((t: string, i: number) => (
        
                          <span
                            key={i}
                            className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400"
                          >
                            {t.trim()}
                          </span>
        
                        ))}
                    </div>
        
                    {/* BUTTONS */}
                    <div className="mt-6 flex gap-4">
        
                      <a
                        href={item.liveURL}
                        target="_blank"
                        className="px-4 py-2 text-black bg-gradient-to-r from-purple-300 to-indigo-300 hover:scale-105 transition-transform duration-300 shadow-lg rounded-md text-sm cursor-pointer"
                      >
                        Live Demo
                      </a>
        
                      <a
                        href={item.githubURL}
                        target="_blank"
                        className="px-4 py-2 border border-white/20 rounded-md flex items-center gap-2 cursor-pointer"
                      >
                        <FaGithub size={16} /> GitHub
                      </a>
        
                    </div>
        
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Projects;