"use client"


import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { useCreateSkillsMutation, useDeleteSkillMutation, useGetSkillsQuery, useUpdateSkillMutation } from '../../../redux/apis/admin.api'
import { CREATE_SKILL_REQUEST, DELETE_SKILL_REQUEST } from '@repo/types'

const Skills = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [edit, setEdit] = useState<number | null>(null)

    const [ addSkill, {isLoading}] = useCreateSkillsMutation()
    const [updateSkill] = useUpdateSkillMutation()
    const [deleteSkill] = useDeleteSkillMutation()

    const { data } = useGetSkillsQuery()

console.log("SKILL DATA =>", data)

    // Zod schema for skill form validation
    const skillSchema = z.object({
        skill: z.string().min(1),
    })satisfies z.ZodType<CREATE_SKILL_REQUEST>


    // React Hook Form setup with Zod resolver
    const { handleSubmit, register, reset, formState: {errors, touchedFields}} = useForm<CREATE_SKILL_REQUEST>({
        defaultValues : {
            skill : ""
        },
        resolver : zodResolver(skillSchema)
    })

    // HANDLE SKILL FUNCTION 
    const handleSkill = async (data: CREATE_SKILL_REQUEST) => {
    try {
        if (edit) {
            await updateSkill({...data,id: Number(edit),}).unwrap()
            toast.success("Skill Updated Successfully 🎉")
        } else {
            await addSkill(data).unwrap()
            toast.success("Skill Created Successfully 🎉")
            reset()
        }

        reset({ skill: "" })
        setEdit(null)
        setIsOpen(false) // 👈 IMPORTANT
    } catch (error) {
        console.log(error)
        toast.error("Operation failed")
    }
}

    // ❌ DELETE FUNCTION
    const handleDelete = async (data: DELETE_SKILL_REQUEST) => {
        try {
            await deleteSkill(data).unwrap()
            toast.success("Skill Deleted SuccessFully")
        } catch (error) {
            console.log(error);
            toast.error("Unable to Delete")
        }
    }

    // ✏️ EDIT FUNCTION
    const handleEdit = (item: any) => {
    setEdit(item.id)
    reset({ skill: item.skill })
    setIsOpen(true) // 👈 IMPORTANT
}

    // HANDLE CLASSES 
    const handleClasses = (key: keyof CREATE_SKILL_REQUEST ) =>
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
                      <h2 className="text-2xl font-bold my-2">Skills ✅</h2>
                      <p className="text-gray-400 text-xl">Manage Your Skills</p>
                    </div>
        
                    <button
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center"
                    >
                      <Edit size={18} /> Create
                    </button>

                </div>


                {/* display  */}
                {
                    data && (
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 text-center p-6 md:p-10">
                        {data?.result?.map((item, index)=> (
                          <div
                            key={item.id}
                            className="group relative rounded-xl shadow-md p-4 md:p-6 bg-white/10 hover:bg-white/20 transition-all"
                          >
                            {/* Skill text */}
                            <p className="mt-2 text-sm md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis text-black">
                              {item.skill}
                            </p>
                
                            {/* Action buttons (hidden until hover) */}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={() => {
                                    handleEdit(item)
                                    // setEdit(item.id)
                                }} 
                                className="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                              >
                                Edit
                              </button>
                
                              <button
                              onClick={() => handleDelete({ id: Number(item.id )})}
                                className="text-xs px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                }
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
                Add New Skills
              </h2>

              <form onSubmit={handleSubmit(handleSkill)} className="space-y-4">

                {/* TITLE */}
                <input {...register("skill")} placeholder="Skill" className={handleClasses("skill")} />


                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-3">
                    <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false)
                          setEdit(null)
                          reset({ skill: "" })
                        }}
                        className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                    >
                        Cancel
                    </button>

                  {
                    edit 
                    ? <button
                        type="submit"
                        className="px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center cursor-pointer"
                    >
                        {isLoading ? "Updating...." : "Update"}
                    </button>

                    : <button
                        type="submit"
                        className="px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center cursor-pointer"
                    >
                        {isLoading ? "Saving..." : "Save Skills"}
                  </button>
                  }
                  
                </div>

              </form>
            </div>
          </div>
        )}

         </div>
    </div>
  </>
}

export default Skills