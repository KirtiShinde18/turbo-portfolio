"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

// image 
import kirti from "./../../../public/assets/images/kirti.jpeg"
import { Calendar, GraduationCap, LocationEdit, Mail, Phone } from 'lucide-react';
import { useGetProfileQuery } from '../../../redux/apis/admin.api';


const text = "About Me";
const tabs = ["Bio", "Education", "Personal"];

const About = () => {
  const [activeTab, setActiveTab] = useState("Education");

  const { data } = useGetProfileQuery()

  return <>
  <div className="min-h-screen md:mt-10  flex items-center justify-center px-4">
  <div className="max-w-7xl mx-auto z-10 text-center">

    {/* HEADING */}
    <motion.h1 className="sm:text-5xl mt-20 text-4xl md:text-7xl font-bold mb-4 leading-tight text-center">
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
    <p className="text-gray-400 text-xl md:text-2xl mt-2 mb-12">
      Get to know me better
    </p>

    {/* GRID SECTION */}
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start text-left mb-10">
    
      {/* LEFT - IMAGE */}
      {data?.result && (
        <div className="flex justify-center lg:justify-center">
          <div className="relative w-full max-w-[220px] h-[260px] sm:max-w-[260px] sm:h-[300px] md:max-w-[320px] md:h-[380px] lg:max-w-[380px] lg:h-[450px]">
    
            <img
              src={data.result.profileImage}
              alt="profile"
              className="w-full h-full object-cover object-center rounded-2xl shadow-xl"
            />
    
          </div>
        </div>
      )}
    
      {/* RIGHT - CONTENT */}
      <div className="flex flex-col justify-center lg:justify-start mt-0 lg:mt-10">
    
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Hello, I'm Kirti 👋🏻
        </h2>
    
        <p className="text-gray-500 text-lg mb-6">
          I'm a passionate developer who loves building modern web applications with clean UI and smooth animations.
        </p>
    
        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-6 relative">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 font-medium bg-white/10 rounded-lg"
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-200 to-indigo-200 px-4 py-2 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
    
              <span
                className={`relative z-10 ${
                  activeTab === tab ? "text-black" : "text-gray-400"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
    
        {/* CONTENT AREA */}
        {data?.result && (
          <div className="relative mt-6 min-h-[260px] sm:min-h-[300px] md:min-h-[320px] transition-all duration-300">
    
            <AnimatePresence mode="wait">
    
              {/* BIO */}
              {activeTab === "Bio" && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg leading-relaxed"
                >
                  <p>{data.result.bio}</p>
                  <p className="mt-4">{data.result.journey}</p>
                  <p className="mt-4">{data.result.work}</p>
                </motion.div>
              )}
    
              {/* EDUCATION */}
              {activeTab === "Education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg space-y-6"
                >
                  {[
                    {
                      title: "Bachelor of Computer Science (BCS)",
                      desc: "Aug 2022 - Mar 2025",
                      place:
                        "Shiv Chhatrapati College, Chhatrapati Sambhaji Nagar",
                    },
                    {
                      title: "Higher Secondary School",
                      desc: "July 2017 - Feb 2019",
                      place: "Shree Goraksha Junior College",
                    },
                  ].map((edu, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-5 hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="p-3 rounded-full bg-white/20">
                        <GraduationCap />
                      </div>
    
                      <div>
                        <h1 className="text-sm font-bold">{edu.title}</h1>
                        <p className="text-gray-500">
                          {edu.desc} <br /> {edu.place}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
    
              {/* PERSONAL */}
              {activeTab === "Personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    
                    {[
                      {
                        icon: <Calendar />,
                        title: "Date Of Birth",
                        value: "10 June",
                      },
                      {
                        icon: <LocationEdit />,
                        title: "Location",
                        value:
                          "Chhatrapati Sambhaji Nagar, Maharashtra",
                      },
                      {
                        icon: <Mail />,
                        title: "Email",
                        value: "kirtishinde3520@gmail.com",
                        link: "mailto:kirtishinde3520@gmail.com",
                      },
                      {
                        icon: <Phone />,
                        title: "Phone",
                        value: "+91-9209123023",
                        link: "tel:+919209123023",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
                      >
                        <div className="p-3 rounded-full bg-white/20">
                          {item.icon}
                        </div>
    
                        <div>
                          <h1 className="text-gray-500 text-sm">
                            {item.title}
                          </h1>
    
                          {item.link ? (
                            <a href={item.link}>
                              <p className="text-sm font-semibold hover:text-purple-400">
                                {item.value}
                              </p>
                            </a>
                          ) : (
                            <p className="text-sm font-semibold">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
    
                    {/* LANGUAGES */}
                    <div className="md:col-span-2 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
                      <h1 className="font-semibold text-gray-500 mb-3">
                        Languages
                      </h1>
    
                      <div className="flex flex-wrap gap-3">
                        {["English", "Hindi", "Marathi"].map((lang, i) => (
                          <span
                            key={i}
                            className="px-4 py-1 rounded-full text-sm bg-gray-100 dark:bg-white/20"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
    
                  </div>
                </motion.div>
              )}
    
            </AnimatePresence>
    
          </div>
        )}
    
      </div>
    </div>

  </div>
</div>
  </>
}

export default About