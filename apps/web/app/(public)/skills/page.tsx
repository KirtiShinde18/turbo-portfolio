
"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useGetSkillsQuery } from '../../../redux/apis/admin.api';

const text = "Skills";
const skills = () => {

  const {data} = useGetSkillsQuery()

  return <>
   <div className="min-h-screen md:mt-10  flex items-center justify-center px-4">
    <div className="max-w-7xl mx-auto z-10 text-center">
      {/* HEADING */}
    <motion.h1 className="sm:text-5xl mt-20 md:mt-5 text-4xl md:text-7xl font-bold mb-4 leading-tight text-center">
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
      Technologies I work with
    </p>

    {/* Bottom  */}
    <div className="w-full overflow-hidden rounded-2xl">
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 text-center p-6 md:p-10 ">

      {
        data && data.result.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="rounded-xl shadow-md p-4 md:p-6 bg-white/10"
        >
          <p className="mt-2 text-sm md:text-base lg:text-lg 
            whitespace-nowrap overflow-hidden text-ellipsis">
           {item.skill}
          </p>
        </motion.div>
        ))
      }
  


  </div>
</div>
    </div>
   </div>
  </>
}

export default skills