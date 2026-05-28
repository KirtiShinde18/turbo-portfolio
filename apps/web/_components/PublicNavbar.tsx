"use client"

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

const PublicNavbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

  return <>
  {/* <nav className="fixed w-full top-0 z-50 backdrop-blur bg-black/60 border-b border-white/10"> */}
    <nav className="fixed w-full top-0 z-50 backdrop-blur ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* <img src="/logo.png" alt="Logo" className="w-12 h-12" /> */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent">
            Kirti
          </h1>
          
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

        {/* <ThemeToggle></ThemeToggle> */}

        {/* Desktop Button */}
        <div className="hidden md:flex gap-3">
          <Link href="/contact">
            <button className="bg-gradient-to-r from-purple-200 to-indigo-200 px-4 py-2 rounded-lg text-black hover:scale-105 hover:opacity-90 
              transition-all duration-300">
              Get Started
            </button>
          </Link>
          
        </div>

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

export default PublicNavbar