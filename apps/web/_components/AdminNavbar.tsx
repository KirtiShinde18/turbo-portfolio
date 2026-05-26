"use client"

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';

const text = "Admin Dashboard";

const links = [
  { name: "Overview", href: "/admin" },
  { name: "Profile", href: "/admin/profile" },
  { name: "Projects", href: "/admin/projects" },
//   { name: "Skills", href: "/admin/skills" },
//   { name: "Experience", href: "/admin/experience" },
];

const AdminNavbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

  return <>
  {/* <nav className="fixed w-full top-0 z-50 backdrop-blur bg-black/60 border-b border-white/10"> */}
    <nav className="fixed w-full top-0 z-50 backdrop-blur ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* <img src="/logo.png" alt="Logo" className="w-12 h-12" /> */}
          {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent">
            Admin Dashboard
          </h1> */}

          {/* LOGO */}
          <motion.h1 className="sm:text-2xl text-xl md:text-4xl font-bold leading-tight text-start">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

        </div>

        {/* Desktop Menu */}
        {/* <div className="hidden md:flex gap-8 text-lg text-gray-300"> */}
        <div className="hidden md:flex gap-8 text-lg">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-1 group cursor-pointer ${
                //   isActive ? "text-white" : ""
                  isActive ? "bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>


            );
          })}

  
        </div>

        {/* Logout button */}
          <button 
            // onClick={handleLogout}
            className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        {/* Desktop Button */}
        {/* <div className="hidden md:flex gap-3">
          <Link href="/contact">
            <button className="bg-gradient-to-r from-purple-300 to-indigo-300 px-4 py-2 rounded-lg text-black hover:scale-105 hover:opacity-90 
              transition-all duration-300">
              Get Started
            </button>
          </Link>


          
        </div> */}

        {/* Mobile Button */}
        <button
        //   className="md:hidden text-white"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>


      </div>

      {/* Mobile Menu */}
      {open && (
        // <div className="md:hidden bg-black/90 backdrop-blur border-t border-white/10 px-6 pb-6 flex flex-col gap-4 text-gray-300">
        <div className="md:hidden  backdrop-blur border-y border-white/10 px-6 pb-6 flex flex-col gap-4 ">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`relative inline-block w-fit mt-3 ${
                //   isActive ? "text-white" : ""
                  isActive ? "bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300
                  ${isActive ? "w-full" : "w-0"}`}
                ></span>
              </Link>
            );
          })}

          
        </div>
      )}
      
    </nav>
  </>
}

export default AdminNavbar