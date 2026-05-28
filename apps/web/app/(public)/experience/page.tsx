"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGetExperienceQuery } from "../../../redux/apis/admin.api";

const text = "Experience";

const timelineData = [
  {
    year: "2026 - Present",
    title: "Full Stack Developer",
    company: "Tech Solutions ",
    desc: "Building modern web applications using React, Next.js, Node.js and MongoDB.",
  },
  {
    year: "2024 - 2025",
    title: "Frontend Developer Intern",
    company: "Websoft Pvt.LTD.",
    desc: "Developed responsive UI, animations, and portfolio projects.",
  },
  {
    year: "2023 - 2024",
    title: "Web Development Freelancer",
    company: "Self employed",
    desc: "Learned HTML, CSS, JavaScript, React and backend basics.",
  },
];

const Experience = () => {

  const {data} = useGetExperienceQuery()

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* HEADING */}
        <motion.h1 className="sm:text-5xl md:mt-10 text-4xl md:text-7xl font-bold mb-4 leading-tight text-center">
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
      My professional journey
    </p>

        {/* TIMELINE */}
        <div ref={ref} className="relative max-w-4xl mx-auto mt-20">
          
          {/* Background Line */}
          <div className="absolute left-6 top-0 w-[2px] h-full bg-white/10" />

          {/* Animated Glow Line */}
          <motion.div
            style={{ height }}
            className="absolute left-6 top-0 w-[1px] bg-gradient-to-b 
            from-[#4158D0] via-[#C850C0] to-[#d382c8]
            shadow-[0_0_25px_rgba(168,85,247,0.8)] origin-top"
          />

          {/* ITEMS */}
          {data && data.result.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-16 pl-12 md:pl-16 relative"
            >
              
              {/* Glow Dot */}
              <div className="absolute left-[18px] top-2 w-3 h-3 rounded-full 
              bg-gradient-to-t from-[#4158D0] via-[#C850C0] to-[#d382c8]
              shadow-[0_0_10px_rgba(168,85,247,0.9)]" />

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 
                p-6 rounded-2xl shadow-lg hover:shadow-gray-500/30 transition-all duration-300"
              >
                <p className="text-purple-400 text-sm sm:text-base md:text-lg font-medium">
                  {item.workingDate}
                </p>

                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-1">
                  {item.role}
                </h3>
                
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                  {item.companyName}
                </p>
                
                <p className="text-gray-400 mt-2 text-sm sm:text-base md:text-lg leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Experience;