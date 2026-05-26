"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FloatingInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, type = "text", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          ref={ref} // ✅ important for react-hook-form
          placeholder=" "
          {...props}
          className="
            peer w-full px-4 pt-5 pb-2
            bg-white text-black 
            dark:bg-white/10 
            border border-gray-300 
            dark:border-gray-300
            rounded-lg 
            placeholder-transparent 
            focus:outline-none focus:ring-2 focus:ring-purple-400
            dark:focus:ring-purple-300
            transition-all duration-300 
          "
        />

        <label
          className="
            absolute left-4 top-2 text-gray-300 text-sm transition-all 
            peer-placeholder-shown:top-3.5 
            peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-400
            peer-focus:top-2 
            peer-focus:text-sm 
            peer-focus:text-purple-400
          "
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;