"use client"

import React from 'react'
import { motion } from "framer-motion";
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { useCreateContactMutation } from '../../../redux/apis/admin.api';
import { CREATE_CONTACT_REQUEST } from '@repo/types';
import FloatingInput from '../../../_components/FloatingInput';

const text = "Contact";

const Contact = () => {

  const [addContact, { isLoading }] = useCreateContactMutation()

  // zod schema
  const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    message: z.string().min(1),
    
  }) satisfies z.ZodType<CREATE_CONTACT_REQUEST>


  const { handleSubmit, reset, register, formState: {errors, touchedFields}} = useForm<CREATE_CONTACT_REQUEST>({
    defaultValues : {
      name: "",
      email: "",
      message: "",
    },
    resolver : zodResolver(contactSchema)
  })

  // handle contact 
  const handleContact = async (data: CREATE_CONTACT_REQUEST) => {
        try {
            await addContact(data).unwrap()
            toast.success("Message sent successfully 🎉")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("unable to fetch contact")
        }
    }

  // HANDLE CLASSES 
  const handleClasses = (key: keyof CREATE_CONTACT_REQUEST ) =>
  clsx(
    "peer w-full px-3 pt-5 pb-2 rounded-lg border outline-none transition-all duration-200",
    "border-gray-300 hover:border-gray-400",
    "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
    errors[key] && "border-red-500 focus:ring-red-200",
    touchedFields[key] && !errors[key] && "border-green-500 focus:ring-green-200"
  )

  return <>
  <div className="min-h-screen md:mt-5  flex items-center justify-center px-4">
    <div className="max-w-7xl mx-auto z-10 text-center mt-5">
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
      <p className="text-gray-400 text-xl md:text-2xl mt-2 mb-0 md:mb-12">
        Let's get in touch
      </p>

      <div className=' gap-10 grid grid-cols-1 lg:grid-cols-2 mb-10  p-3 items-center'>
        {/* left  */}

        <div className="lg:mr-10 xl:mr-20">
        <img 
            src="/contact.gif" 
            alt="contact animation" 
            className=""
         />
        </div>

        {/* right  */}
        <div className="
          w-full
          md:max-w-lg md:mx-auto
        bg-white/70 dark:bg-white/10 
          rounded-2xl md:rounded-2xl 
          shadow-none md:shadow-xl 
          p-2 sm:p-6 md:p-8  "
         >
  
          {/* Title */}
          <p className="text-center font-semibold text-xl md:text-3xl mb-5">
            Send Me a Message 💬
          </p>
      
          {/* Form */}
          <form onSubmit={handleSubmit(handleContact)}>
            <div className=" space-y-6 ">
            
          
            <FloatingInput label="Name" type="text" {...register("name")} />
            <FloatingInput label="Email" type="email" {...register("email")} />
        
            {/* Textarea */}
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Enter your message..."
              className="
              w-full px-4 py-3
        
              bg-white dark:bg-white/10
              text-black 
        
              border border-black/10 
              rounded-lg
        
              focus:outline-none
              focus:ring-2 focus:ring-purple-400
              dark:focus:ring-purple-300
        
              hover:border-black/20 dark:hover:border-white/30
        
              transition-all duration-300
              resize-none
              "
            />
        
            {/* Button */}
            <button
             type='submit'
             className="
              w-full py-4 
              text-lg text-black
              bg-gradient-to-r from-purple-300 to-indigo-300 
              rounded-xl font-semibold 
              hover:scale-105 hover:opacity-90 
              transition-all duration-300 cursor-pointer
            ">
              {
                isLoading ? "Sending..." : "Send Message 🚀"
              }
            </button>
        
          </div>

          </form>
        </div>
        

        

      </div>

    </div>
  </div>
  </>
}

export default Contact