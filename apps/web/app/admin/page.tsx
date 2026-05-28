"use client"


import { GitBranch} from "lucide-react";
import React from 'react'
import { useGetExperienceQuery, useGetProfileQuery, useGetProjectQuery, useGetSkillsQuery } from '../../redux/apis/admin.api'

const dashboard = () => {

    const {data} = useGetProfileQuery()
    const {data: projectData} = useGetProjectQuery()
    const {data: skillData } = useGetSkillsQuery()
    const {data: expData} = useGetExperienceQuery()
  return <>
  <div className="min-h-screen md:mt-10 px-4 ">
    <div className="mt-20 max-w-7xl mx-auto z-10 text-center ">

        {/* =========================================== Profile ===========================================  */}
        <div className=" bg-gray-50 rounded-xl shadow text-start p-6 text-black ">
            {/* Header  */}
            <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold my-2">Profile View</h2>
                </div>
            </div>

            {/* display  */}
{
  data?.result && (
    <div key={data.result.id} className="p-4">

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">

        {/* LEFT */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">

          <img
            src={data.result.profileImage}
            alt={data.result.name}
            className="w-[150px] h-[150px] rounded-full object-cover mb-4 border-4 border-gray-100"
          />

          <h2 className="text-xl font-bold text-gray-800">
            {data.result.name}
          </h2>

          <p className="text-lg font-semibold mt-1">
            {data.result.title}
          </p>

          <ul className="text-start mt-5">
            <li><b>Email:</b> {data.result.email}</li>
            <li><b>Mobile:</b> {data.result.mobile}</li>
            <li><b>DOB:</b> {data.result.dob}</li>
            <li><b>Address:</b> {data.result.location}</li>
            <li><b>Language:</b> {data.result.language}</li>
          </ul>

          <div  className="flex gap-5 justify-start md:justify-start mt-5 ">
                  <a
                      href="https://github.com/KirtiShinde18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border border-purple-300 hover:bg-gradient-to-r from-purple-300 to-indigo-300   transition-all duration-300 hover:scale-110"
                  >
                      <GitBranch size={20} />
                  </a>
                  {/* <a
                      href="https://www.linkedin.com/in/kirtishinde18/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border border-purple-300 hover:bg-gradient-to-r from-purple-300 to-indigo-300   transition-all duration-300 hover:scale-110"
                  >
                      <LinkedinIcon size={20} />
                  </a> */}
          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-lg font-bold mb-3">
            💼 Professional Overview
          </h3>

          <p className="text-gray-600 whitespace-pre-line">
            {data.result.bio}
          </p>

          <h3 className="text-lg font-bold my-3">⭐ Journey</h3>
          <p className="text-gray-600">{data.result.journey}</p>

          <h3 className="text-lg font-bold my-3">🌱 Work</h3>
          <p className="text-gray-600">{data.result.work}</p>

                                  <h3 className="text-lg font-bold my-3"> 📈 Stats</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

                          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl  shadow-xl p-8 min-w-[100px]">
                            <p className='text-4xl font-bold text-purple-400'>{data.result.yearExp} +</p>
                            <p className="mt-2 text-lg">Year Of Experience</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl  shadow-xl p-8 min-w-[100px]">
                            <p className='text-4xl font-bold text-purple-400'>{data.result.projectsCompleted} +</p>
                            <p className="mt-2 text-lg">Project Completed</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl  shadow-xl p-8 min-w-[100px]">
                            <p className='text-4xl font-bold text-purple-400'>{data.result.technologies} +</p>
                            <p className="mt-2 text-lg">Technologies</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl  shadow-xl p-8 min-w-[100px]">
                            <p className='text-4xl font-bold text-purple-400'>{data.result.happyClients} +</p>
                            <p className="mt-2 text-lg">Happy Clients</p>
                          </div>

                   
                        </div>

        </div>

      </div>

    </div>
  )
}
    
        </div>


        {/* =========================================== Project ===========================================  */}
        <div className=" bg-gray-50 rounded-xl shadow text-start p-6 text-black my-10">
            {/* Header  */}
            <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold my-2">Project View</h2>
                </div>
            </div>

            {/* display  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
                {
                projectData && projectData.result.map(item =>  (
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
                            <h3 className="text-xl font-semibold">
                              {item.title}
                            </h3>
        
                            <p className="mt-2 text-gray-400">
                              {item.desc}
                            </p>
    
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
    
                            <div className="mt-6 flex gap-4">
                      
                                <a
                                  href={item.liveURL}
                                  target="_blank"
                                  className="px-4 py-2 text-black bg-gradient-to-r from-purple-300 to-indigo-300 hover:scale-105 transition-transform duration-300 shadow-lg rounded-md text-sm"
                                >
                                  Live Demo
                                </a>
                
    
                                <a
                                  href={item.githubURL}
                                  target="_blank"
                                  className="px-4 py-2 border border-white/20 rounded-md flex items-center gap-2"
                                >
                                  <GitBranch size={16} /> GitHub
                                </a>
                            </div>
    
                        </div>
                    </div>
                ))
            }
            </div>
            
        </div>

        {/* =========================================== Skills ===========================================  */}
        <div className=" bg-gray-50 rounded-xl shadow text-start p-6 text-black my-10">
            {/* Header  */}
            <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold my-2">Skills View</h2>
                </div>
            </div>

            {/* display  */}

                {
        
                    skillData && (
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 text-center p-6 md:p-10">
                        {skillData?.result?.map((item, index)=> (
                          <div
                            key={index}
                            className="group relative rounded-xl shadow-md p-4 md:p-6 bg-white/10 hover:bg-white/20 transition-all"
                          >
                            {/* Skill text */}
                            <p className="mt-2 text-sm md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis text-black">
                              {item.skill}
                            </p>
                
                          </div>
                        ))}
                      </div>
                    )
                }
            
        </div>

        {/* =========================================== Exp ===========================================  */}
        <div className=" bg-gray-50 rounded-xl shadow text-start p-6 text-black my-10">
            {/* Header  */}
            <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold my-2">Experience View</h2>
                </div>
            </div>

            {/* display  */}
            <div className="relative border-l border-gray-200 ml-4 mt-10">
              {expData?.result?.map((item, index) => (
                <div key={item.id} className="mb-10 ml-6">
                  
                  {/* DOT */}
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-purple-300 rounded-full ring-8 ring-white">
                    <span className="text-black text-lg ">{index + 1}</span>
                  </span>
            
                  {/* CARD */}
                  <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    
                    {/* Company + Role */}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.role}
                    </h3>
                    <p className="text-sm text-gray-500">{item.companyName}</p>
            
                    {/* Date */}
                    <time className="block mb-2 text-xs font-normal text-gray-400">
                      {item.workingDate}
                    </time>
            
                    {/* Description */}
                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  </div>
  </>
}

export default dashboard