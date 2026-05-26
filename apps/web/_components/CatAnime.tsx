"use client"

import React from "react"

const BunnyLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100">

      {/* Bunny */}
      <div className="relative flex flex-col items-center">

        {/* Ears */}
        <div className="flex gap-3 mb-2">
          <div className="w-4 h-14 bg-pink-300 rounded-full rotate-12 animate-bounce"></div>
          <div className="w-4 h-14 bg-pink-300 rounded-full -rotate-12 animate-bounce"></div>
        </div>

        {/* Head */}
        <div className="w-24 h-24 bg-pink-200 rounded-full relative animate-bounce">

          {/* Eyes */}
          <div className="absolute top-7 left-6 w-2 h-2 bg-gray-800 rounded-full"></div>
          <div className="absolute top-7 right-6 w-2 h-2 bg-gray-800 rounded-full"></div>

          {/* Nose */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>

          {/* Mouth */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-pink-500 text-xs">
            w
          </div>

        </div>

        {/* Body */}
        <div className="w-28 h-20 bg-pink-300 rounded-full -mt-4 animate-pulse"></div>

      </div>

      {/* Loading Text */}
      <div className="mt-6 text-gray-700 text-lg font-medium flex gap-1">
        Bunny is loading
        <span className="animate-bounce">.</span>
        <span className="animate-bounce [animation-delay:0.2s]">.</span>
        <span className="animate-bounce [animation-delay:0.4s]">.</span>
      </div>

    </div>
  )
}

export default BunnyLoader