"use client"

import { ArrowRight, ChevronDown, DownloadIcon, GitBranch, MailIcon } from 'lucide-react'
import { motion } from "framer-motion";
import React from 'react'
import BunnyLoader from '../../_components/CatAnime';
import { useGetProfileQuery, useGetProjectQuery, useGetSkillsQuery } from '../../redux/apis/admin.api';
import { FaGithub } from 'react-icons/fa';



const Home = () => {

const { data, isLoading,} = useGetProfileQuery()
const { data: skillData, isLoading: skillLoading } = useGetSkillsQuery()
const { data: projectData, isLoading: projectLoading } = useGetProjectQuery()

if (isLoading ) {

return <>
<BunnyLoader/>
</>
}

  return <>

{/*  =========================================================== HOME =========================================================== */ }
    <div className=" min-h-screen flex items-center justify-center px-4">

      {/* Top-left floating circle */}
      <div className="absolute w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-500/30 rounded-full blur-3xl animate-float top-10 sm:top-16 md:top-20 left-10 sm:left-16 md:left-20 will-change-transform"></div>

      {/* Bottom-right floating circle */}
      <div className="absolute w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-500/30 rounded-full blur-3xl animate-float bottom-10 sm:bottom-16 md:bottom-20 right-10 sm:right-16 md:right-20 will-change-transform"></div>

      <div className="max-w-7xl mx-auto text-center z-10 ">

        {data?.result && (
          <div
            key={data.result.id}
            className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* LEFT SIDE */}
            <div className="w-full mt-25 md:mt-10 p-10 text-center lg:text-left ">
              
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold leading-tight">
                I'm {data.result.name}
              </h1>
        
              <p className="sm:text-4xl text-xl md:text-4xl font-bold mb-4 leading-tight font-display">
                {data.result.title.split("").map((char, index) => (
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
              </p>
        
              <p className="text-gray-400 mt-6 text-lg sm:text-xl md:text-2xl">
                Full Stack Developer Building Scalable and modern web Applications
              </p>
        
              {/* buttons */}
            </div>
        
            {/* RIGHT SIDE */}
            <div className="mb-10 mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 relative rounded-full overflow-hidden border-4 border-gray-300">
              <img src={data.result.profileImage} alt="" />
            </div>
          </div>
        )}
      </div>

      {/* Scroll Down */}
      <div className="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="animate-bounce text-3xl">
            <ChevronDown />
          </span>
        </div>
      </div>

      

    </div>

{/* =========================================================== ABOUT =========================================================== */}
    <div className=" min-h-screen flex items-center justify-center px-4
          bg-gradient-to-br from-gray-100 via-white to-gray-200">

      <div className="max-w-7xl mx-auto z-10">

        {/* 🔥 TOP SECTION (NO animation, NO shift) */}

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <h1 className="mt-10 md:mt-5 sm:text-5xl text-4xl md:text-7xl font-bold leading-tight font-display">
            <span className="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent">
              About 
            </span>
          </h1>
      
          <p className='text-gray-400 text-2xl mt-2'>
            Get to know me better
          </p>

        </motion.div>

      
        {/* 🔥 BOTTOM SECTION (animation only here) */}
        <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      
          {/* Left */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -80 }}   // 👈 left → right
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >

            {/* <p className='text-gray-300 text-xl mb-10'> */}
            <p className='mb-10 text-lg sm:text-xl md:text-2xl'>
              Full-Stack Developer with a passion for building scalable, user-centric web applications. Expert in bridging the gap between robust backend architecture and intuitive frontend experiences. Proven track record of delivering clean, maintainable code and optimizing performance across the entire stack.
            </p>
      
            <a href="/about">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-400  font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
              More About Me <ArrowRight/>
            </button>
            </a>

          </motion.div>
      
          {/* Right (Animated) */}
          <div className="w-full overflow-hidden">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >

            {data?.result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center p-10">
            
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
                  <p className="text-4xl font-bold text-purple-400">
                    {data.result.yearExp}+
                  </p>
                  <p className="mt-2 text-lg">Year Of Experience</p>
                </div>
            
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
                  <p className="text-4xl font-bold text-purple-400">
                    {data.result.projectsCompleted}+
                  </p>
                  <p className="mt-2 text-lg">Project Completed</p>
                </div>
            
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
                  <p className="text-4xl font-bold text-purple-400">
                    {data.result.technologies}+
                  </p>
                  <p className="mt-2 text-lg">Technologies</p>
                </div>
            
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
                  <p className="text-4xl font-bold text-purple-400">
                    {data.result.happyClients}+
                  </p>
                  <p className="mt-2 text-lg">Happy Clients</p>
                </div>
            
              </div>
            )}

            </motion.div>
          </div>
      
        </div>
      
      </div>

    </div>

{/* ===========================================================  Skills ===========================================================  */}
      <div className=" min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto z-10">
  
          {/* 🔥 TOP SECTION (NO animation, NO shift) */}
  
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
  
            <h1 className="mt-10 md:mt-5 sm:text-5xl text-4xl md:text-7xl font-bold leading-tight font-display">
              <span className="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent">
                Skills
              </span>
            </h1>
  
            <p className='text-gray-400 text-2xl mt-2'>
              Technologies I work with
            </p>
            
  
          </motion.div>
  
          {/* Bottom  */}
          <div className="w-full overflow-hidden rounded-2xl">
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols- lg:grid-cols-6 gap-4 md:gap-6 text-center p-6 md:p-10">
          
              {
                skillData && skillData.result.map((item, index) => (
                  <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl shadow-md p-3 md:p-5 bg-white/10"
                >
                  <p className="mt-2 text-sm md:text-base lg:text-lg break-words">
                    {item.skill}
                  </p>
                </motion.div>
                ))
              }
          
          
            </div>
          </div>
  
        </div>
  
        
      </div>

{/* ===========================================================  Featured Projects ===========================================================  */}
      <div className=" min-h-screen flex items-center justify-center px-4
            bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <div className="max-w-7xl mx-auto z-10">
  
          {/* 🔥 TOP SECTION (NO animation, NO shift) */}
  
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
  
            <h1 className="mt-10 md:mt-10 sm:text-5xl text-4xl md:text-7xl font-bold leading-tight font-display">
              <span className="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
  
            <p className='text-gray-400 text-2xl mt-2'>
              Some of my recent work
            </p>
  
          </motion.div>
  
          {/* Bottom  projects card  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
            {projectData?.result?.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={item.hero}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
                </div>
          
                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-gray-400">{item.desc}</p>
          
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(Array.isArray(item.tech)
                      ? item.tech
                      : item.tech?.split(",") || []
                    ).map((t: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
          
                  <div className="mt-6 flex gap-4">
                    {item.liveURL && (
                      <a
                        href={item.liveURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-black bg-gradient-to-r from-purple-200 to-indigo-200 hover:scale-105 transition-transform duration-300 shadow-lg rounded-md text-sm"
                      >
                        Live Demo
                      </a>
                    )}
          
                    {item.githubURL && (
                      <a
                        href={item.githubURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-white/20 rounded-md flex items-center gap-2"
                      >
                        <FaGithub size={16} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
            
          {/* button  */}
          <div className="flex justify-center">
            <a href="/projects">
              <button className="my-10 flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-400 font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
                View All Projects <ArrowRight/>
              </button>
            </a>
          </div>
          
  
        </div>
      </div>

{/* ===========================================================  Get in Touch ===========================================================  */}
    <div className="min-h-96 flex items-center justify-center px-4 ">

      <div className="w-full flex justify-center text-black">
        <div className="w-full max-w-6xl bg-gradient-to-r from-purple-200 to-indigo-200 text-center p-10 rounded-2xl">
          
          <h1 className="mt-10 md:mt-5 text-2xl md:text-5xl font-bold leading-tight font-display">
            Ready to Work Together?
          </h1>
      
          <p className="mt-6 text-lg sm:text-xl md:text-2xl">
            Your ideas deserve to shine—let’s bring them to life together.
          </p>
      
          <div className="flex justify-center">
            <a href="/contact">
              <button className="mt-10 flex items-center gap-2 px-6 py-3 rounded-xl border border-black font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
                Get In Touch <MailIcon />
              </button>
            </a>
          </div>
      
        </div>
      </div>
    </div>

  </>
}

export default React.memo(Home)
