"use client"

import React from 'react'
import { motion } from "framer-motion";
// import { Github, Linkedin, LocationEdit, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaLocationArrow, FaMailBulk, FaPhone } from 'react-icons/fa';

import Link from 'next/link';
import { useGetProfileQuery } from '../redux/apis/admin.api';

const Footer = () => {

  const { data } = useGetProfileQuery()

  const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Features", href: "/#features" },
  { name: "Contact", href: "/#contact" },
];
const profile = data?.result

const text = "Kirti";

  return <>
      <footer className="p-10 text-center border-t border-white/10 py-12  bg-gradient-to-br from-gray-100 via-white to-gray-200
           text-lg">

        {data?.result && (
          <div className="my-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-start gap-10 md:text-left">
        
            {/* Brand */}
            <div className="flex flex-col md:w-1/3 items-start">
              <motion.h1
                className="sm:text-5xl text-3xl md:text-4xl font-bold mb-4 leading-tight font-display flex gap-1 flex-wrap"
              >
                {text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="bg-gradient-to-t from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
        
              <p className="text-gray-500 text-lg max-w-sm">
                Fullstack Developer with a passion for creating beautiful, responsive web applications.
              </p>
            </div>
        
            {/* Contact */}
            <div className="flex flex-col md:w-1/3 items-start">
              <h3 className="text-xl font-semibold font-display mb-4">
                Contact Us
              </h3>
        
              <a
                href={`tel:${data.result.mobile}`}
                className="flex items-center gap-3 mb-3 hover:text-purple-400 transition"
              >
                <FaPhone size={20} />
                <span>{data.result.mobile}</span>
              </a>
        
              <a
                href={`mailto:${data.result.email}`}
                className="flex items-center gap-3 mb-3 hover:text-purple-400 transition"
              >
                <FaMailBulk size={20} />
                <span>{data.result.email}</span>
              </a>
        
              <a
                href="https://maps.app.goo.gl/Y5BfSbUaJRTjwnPK7"
                className="flex items-center gap-3 mb-3 hover:text-purple-400 transition"
              >
                <FaLocationArrow size={20} />
                <span>{data.result.location}</span>
              </a>
            </div>
        
            {/* Social */}
            <div className="flex flex-col md:w-1/3 items-start">
              <h3 className="text-xl font-semibold font-display mb-4">
                Follow Me
              </h3>
        
              <div className="flex gap-5">
                <a
                  href={data.result.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-purple-300 hover:bg-gradient-to-r from-purple-300 to-indigo-300 transition-all duration-300 hover:scale-110"
                >
                  <FaGithub size={20} />
                </a>
        
                <a
                  href={data.result.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-purple-300 hover:bg-gradient-to-r from-purple-300 to-indigo-300 transition-all duration-300 hover:scale-110"
                >
                  <FaLinkedin size={20} />
                </a>
        
                <a
                  href="mailto:kirtishinde3520@gmail.com"
                  className="p-3 rounded-full border border-purple-300 hover:bg-gradient-to-r from-purple-300 to-indigo-300 transition-all duration-300 hover:scale-110"
                >
                  <FaMailBulk size={20} />
                </a>
              </div>
            </div>
        
          </div>
        )}

        <hr className="border border-white/10  text-center text-gray-500 mb-10 "/>
        {/* © {new Date().getFullYear()}  All rights Reserved. Design by <p className=" bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent"><b>Kirti Shinde</b></p> */}

                {/* Bottom */}
        <div className="
          border-t border-black/10 dark:border-white/10
          mt-12 pt-6
          text-center
          text-sm
          text-gray-600
        ">

          © {new Date().getFullYear()}  ☁️ Designed with 💖 Love by

          <Link 
          href="https://kirti-portfolio-client.vercel.app/"
          className="
            ml-2
            font-semibold
            bg-gradient-to-r
            from-purple-500
            to-indigo-500
            bg-clip-text
            text-transparent
            cursor-pointer 
          ">
            <b>Kirti Shinde</b>
          </Link>

        </div>

      </footer>
  </>
}

export default Footer