"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Edit } from 'lucide-react'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useCreateExperienceMutation, useDeleteExperienceMutation, useGetExperienceQuery, useUpdateExperienceMutation } from '../../../redux/apis/admin.api'
import { CREATE_EXPERIENCE_REQUEST, DELETE_EXPERIENCE_REQUEST } from '@repo/types'

const Experience = () => {
  const [edit, setEdit] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const [addExpeience, {isLoading}] = useCreateExperienceMutation()
  const [updateExperience] = useUpdateExperienceMutation()
  const [deleteExperience] = useDeleteExperienceMutation()

  const { data } = useGetExperienceQuery()

  // ZOD Schema
  const experienceSchema = z.object({
    companyName: z.string().min(1),
    role: z.string().min(1),
    desc: z.string().min(1),
    workingDate: z.string().min(1),
  }) satisfies z.ZodType<CREATE_EXPERIENCE_REQUEST>

  const { handleSubmit, reset, register, formState : {errors, touchedFields}} = useForm<CREATE_EXPERIENCE_REQUEST>({
    defaultValues : {
      companyName: "",
      role: "",
      desc: "",
      workingDate: "",
    }, 
    resolver: zodResolver(experienceSchema)

  })

  // HANDLE EXP 
 const handleExperience = async (data: CREATE_EXPERIENCE_REQUEST) => {
  try {
    if (edit) {
      await updateExperience({ ...data, id: edit }).unwrap()
      toast.success("Experience Updated Successfully 🎉")
    } else {
      await addExpeience(data).unwrap()
      toast.success("Experience Created Successfully 🎉")
    }

    // ✅ common cleanup
    reset({
      companyName: "",
      role: "",
      desc: "",
      workingDate: "",
    })
    setEdit(null)
    setIsOpen(false)

  } catch (error) {
    console.log(error)
    toast.error("Unable to process experience")
  }
}

  // ❌ delete 
  const handleDelete = async (data: DELETE_EXPERIENCE_REQUEST) => {
        try {
            await deleteExperience(data).unwrap()
            toast.success("exprience deleted success")
        } catch (error) {
            console.log(error)
            toast.error("unable to deleted exprience ")
        }
    }

    // ✏️ edit 
   const handleEdit = (data: any) => {
    setEdit(data.id)     
    reset({
        companyName: data.companyName,
        role: data.role,
        desc: data.desc,
        workingDate: data.workingDate
    })
    setIsOpen(true)       
}

    // HANDLE CLASSES 
    const handleClasses = (key: keyof CREATE_EXPERIENCE_REQUEST ) =>
        clsx(
          "peer w-full px-3 pt-5 pb-2 rounded-lg border outline-none transition-all duration-200",
          "border-gray-300 hover:border-gray-400",
          "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
          errors[key] && "border-red-500 focus:ring-red-200",
          touchedFields[key] && !errors[key] && "border-green-500 focus:ring-green-200"
        )

  return <>
  <div className="min-h-screen md:mt-10 px-4 ">
    <div className="mt-20 max-w-7xl mx-auto z-10 text-center ">
        {/* Header  */}
            <div className=" bg-gray-50 rounded-xl shadow text-start p-6 text-black">
                <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold my-2">Experience 💼</h2>
                      <p className="text-gray-400 text-xl">Manage Your Experience </p>
                    </div>
        
                    <button
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center"
                    >
                      <Edit size={18} /> Create
                    </button>

                </div>


                {/* display  */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full my-5 border-collapse bg-white shadow-md rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3">Company</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Working</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.result?.map((item) => (
                      <tr key={item.id} className=" hover:bg-gray-50 transition">
                        
                        {/* Company */}
                        <td className="p-3 font-medium">{item.companyName}</td>
                
                        {/* Role */}
                        <td className="p-3">{item.role}</td>
                
                        {/* Description */}
                        <td className="p-3 max-w-xs truncate">{item.desc}</td>
                
                        {/* Working */}
                        <td className="p-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            {item.workingDate}
                          </span>
                        </td>
                
                        {/* Actions */}
                        <td className="p-3">
                          <div className="flex justify-center gap-2">
                            
                            <button
                              onClick={() => handleEdit(item)}
                              className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                            >
                              Edit
                            </button>
                
                            <button
                              onClick={() => handleDelete({ id: Number(item.id) })}
                              className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                            >
                              Delete
                            </button>
                
                          </div>
                        </td>
                
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                

            </div>

            {/* MODAL */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white text-black p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* <h2 className="text-xl font-semibold mb-4">Create Project</h2> */}
              <h2 className="text-xl font-semibold mb-4">
                {edit ? "Update Project" : "Create Project"}
              </h2>

              <form onSubmit={handleSubmit(handleExperience)} className="space-y-4">

                {/* NAME */}
                <input {...register("companyName")} placeholder="companyName" className={handleClasses("companyName")} />

                {/* ROLE */}
                <input {...register("role")} placeholder="role" className={handleClasses("role")} />

                {/* DESC */}
                <textarea
                  {...register("desc")}
                  placeholder="Desc"
                  className={handleClasses("desc")}
                  rows={4}
                />

                {/* DATE  */}
                <input  {...register("workingDate")} placeholder="workingDate" className={handleClasses("workingDate")} />

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      setEdit(null)
                      reset()
                    }}
                    className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center cursor-pointer"
                  >
                    {/* Create */}
                    {edit ? "Update" : "Create"}
                  </button>
                  
                </div>

              </form>
            </div>
          </div>
        )}
    </div>
  </div>
  </>
}

export default Experience