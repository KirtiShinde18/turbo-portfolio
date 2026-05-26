// "use client"

// import { useAddProjectMutation, useDeleteProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from '@/redux/apis/admin.api'
// import { CREATE_PROJECT_REQUEST, DELETE_PROJECT_REQUEST } from '@/types/Project'
// import { zodResolver } from '@hookform/resolvers/zod'
// import clsx from 'clsx'
// import { Edit, Edit2, Github, Trash } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
// import z from 'zod'


// const optionalFileList = z.any().refine(
//   (files) => !files || files.length === 0 || files[0] instanceof File,
//   "Invalid file"
// )

// const Project = () => {
//   const [isOpen, setIsOpen] = useState(false)

//   const [preview, setPreview] = useState<string | null>(null)
//   const [showEditImage, setShowEditImage] = useState(false)

//   const [edit, setEdit] = useState<string | null>(null)

//   // const [edit, setEdit] = useState<string | null>(null)
//   const [addProject, { isLoading }] = useAddProjectMutation()
//   const [updateProject] = useUpdateProjectMutation()
//   const [deleteProject] = useDeleteProjectMutation()

//   const { data } = useGetProjectQuery()

//   // ✅ schema
//   const projectSchema = z.object({
//     title: z.string().min(1),
//     desc: z.string().min(1),
//     category: z.string().min(1),
//     hero: optionalFileList.optional(),
//     tech: z.string().min(1),
//     liveURL: z.string().min(1),
//     githubURL: z.string().min(1),


//   }) satisfies z.ZodType<CREATE_PROJECT_REQUEST>

//   const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<CREATE_PROJECT_REQUEST>({
//     defaultValues: {
//       title: "",
//       desc: "",
//       category: "",
//       hero: "",
//       tech: "",
//       liveURL: "",
//       githubURL: "",
//     },
//     resolver: zodResolver(projectSchema)
//   })

//   const handleProject = async (data: CREATE_PROJECT_REQUEST) => {
//     try {
//       const fd = new FormData()

//       fd.append("title", data.title)
//       fd.append("desc", data.desc)
//       fd.append("category", data.category)
//       fd.append("tech", data.tech)
//       fd.append("liveURL", data.liveURL)
//       fd.append("githubURL", data.githubURL)


//       const file = data.hero?.[0]
//       if (file) {
//         fd.append("hero", file)
//       }

//       if (edit) {

//         await updateProject({
//           ...data,
//           _id: edit,
//           body: fd,   // 🔥 USE FormData
//         }).unwrap()

//         reset({
//           title: "",
//           desc: "",
//           category: "",
//           hero: "",
//           tech: "",
//           liveURL: "",
//           githubURL: ""
//         })

//         setIsOpen(false)
//         setEdit(null)

//         toast.success("Project updated successfully 🎉")

//       } else {
//         await addProject(fd).unwrap()
//         toast.success("Project created successfully 🎉")
//         reset()
//       }

//       setIsOpen(false)


//     } catch (error) {
//       console.log(error)
//       toast.error("Unable to process request")
//     }
//   }


//   const handleEditClick = (data: any) => {
//     setEdit(data._id)
//     setIsOpen(true)

//     setPreview(data.hero)        // ✅ show existing image
//     setShowEditImage(false)

//     reset({
//       title: data.title,
//       desc: data.desc,
//       category: data.category,
//       hero: "",
//       tech: data.tech,
//       liveURL: data.liveURL,
//       githubURL: data.githubURL,
//     })
//   }

//   const handleDelete = async (data: DELETE_PROJECT_REQUEST) => {
//     try {
//       await deleteProject(data).unwrap()
//       toast.success("project delete success")
//     } catch (error) {
//       console.log(error)
//       toast.error("unable to delete ")
//     }
//   }

//   const handleClasses = (key: keyof CREATE_PROJECT_REQUEST) =>
//     clsx(
//       "peer w-full px-3 pt-5 pb-2 rounded-lg border outline-none transition-all duration-200",
//       "border-gray-300 hover:border-gray-400",
//       "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
//       errors[key] && "border-red-500 focus:ring-red-200",
//       touchedFields[key] && !errors[key] && "border-green-500 focus:ring-green-200"
//     )

//   useEffect(() => {
//     if (isOpen) {
//       setPreview(null)
//       setShowEditImage(false)
//     }
//   }, [isOpen])

//   return <>
//     <div className="min-h-screen md:mt-10 px-4 ">
//       <div className="mt-20 max-w-7xl mx-auto z-10 text-center ">

//         {/* Header  */}
//         <div className=" bg-gray-50 rounded-xl shadow text-start p-6 text-black">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold my-2">Project 🚀</h2>
//               <p className="text-gray-400 text-xl">Manage Your Project Information</p>
//             </div>

//             <button
//               onClick={() => setIsOpen(true)}
//               className="px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center"
//             >
//               <Edit size={18} /> Create
//             </button>

//           </div>

//           {/* display  */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
//             {data?.result?.map((item: any) => (
//               <div
//                 key={item._id}
//                 className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
//               >
//                 {/* IMAGE */}
//                 <div className="relative h-56 w-full overflow-hidden">
//                   <img
//                     src={item.hero}
//                     alt={item.title}
//                     className="h-full w-full object-cover group-hover:scale-110 transition"
//                   />

//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold">
//                     {item.title}
//                   </h3>

//                   <p className="mt-2 text-gray-400">
//                     {item.desc}
//                   </p>

//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {Array.isArray(item.tech)
//                       ? item.tech.map((t: string, i: number) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400"
//                         >
//                           {t}
//                         </span>
//                       ))
//                       : item.tech?.split(",").map((t: string, i: number) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400"
//                         >
//                           {t.trim()}
//                         </span>
//                       ))}
//                   </div>

//                   <div className="mt-6 flex gap-4">

//                     <a
//                       href={item.liveURL}
//                       target="_blank"
//                       className="px-4 py-2 text-black bg-gradient-to-r from-purple-300 to-indigo-300 hover:scale-105 transition-transform duration-300 shadow-lg rounded-md text-sm"
//                     >
//                       Live Demo
//                     </a>


//                     <a
//                       href={item.githubURL}
//                       target="_blank"
//                       className="px-4 py-2 border border-white/20 rounded-md flex items-center gap-2"
//                     >
//                       <Github size={16} /> GitHub
//                     </a>
//                   </div>

//                   {/* update delete  */}
//                   <div className="my-3 flex gap-4 justify-end items-center">

//                     {/* EDIT */}
//                     <button
//                       type="button"
//                       className="p-2 rounded-md hover:bg-blue-500/10 transition"
//                       onClick={() => {
//                         handleEditClick(item)
//                         // setEdit(item._id)
//                       }}
//                     >
//                       <Edit2 className="w-5 h-5 text-blue-500 hover:scale-110 transition" />
//                     </button>

//                     {/* DELETE */}
//                     <button
//                       type="button"
//                       className="p-2 rounded-md hover:bg-red-500/10 transition"
//                       onClick={() => handleDelete({ _id: item._id })}
//                     >
//                       <Trash className="w-5 h-5 text-red-500 hover:scale-110 transition" />
//                     </button>

//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>


//         {/* MODAL */}
//         {isOpen && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//             onClick={() => setIsOpen(false)}
//           >
//             <div
//               className="bg-white text-black p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* <h2 className="text-xl font-semibold mb-4">Create Project</h2> */}
//               <h2 className="text-xl font-semibold mb-4">
//                 {edit ? "Update Project" : "Create Project"}
//               </h2>

//               <form onSubmit={handleSubmit(handleProject)} className="space-y-4">

//                 {/* TITLE */}
//                 <input {...register("title")} placeholder="Title" className={handleClasses("title")} />

//                 {/* DESC */}
//                 <input {...register("desc")} placeholder="desc" className={handleClasses("desc")} />

//                 {/* CATEGORY */}
//                 <select
//                   {...register("category")}
//                   className={handleClasses("category")}
//                   defaultValue=""
//                 >
//                   <option value="" disabled> Select Category</option>
//                   <option value="Web App">Website</option>
//                   <option value="Mobile App">Mobile App</option>

//                 </select>

//                 {/* HERO */}
//                 {/* <input
//                   type="file"
//                   {...register("hero")}
//                   className={handleClasses("hero")}
//                 /> */}
//                 <div className="space-y-2">

//                   {(edit && preview && !showEditImage) ? (
//                     <>
//                       <div className="flex items-center gap-4">

//                         {/* SHOW IMAGE */}
//                         <img
//                           src={preview}
//                           alt="project"
//                           className="w-32 h-20 object-cover rounded-lg border"
//                         />

//                         {/* CHANGE BUTTON */}
//                         <button
//                           type="button"
//                           onClick={() => setShowEditImage(true)}
//                           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                         >
//                           Change Image
//                         </button>

//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {/* FILE INPUT */}
//                       <input
//                         type="file"
//                         {...register("hero")}
//                         onChange={(e) => {
//                           const file = e.target.files?.[0]
//                           if (file) {
//                             setPreview(URL.createObjectURL(file))
//                           }
//                         }}
//                         className={handleClasses("hero")}
//                       />

//                       {/* PREVIEW + CANCEL */}
//                       <div className="flex items-center gap-4 mt-2">

//                         {/* PREVIEW */}
//                         {preview && (
//                           <img
//                             src={preview}
//                             alt="preview"
//                             className="w-32 h-20 object-cover rounded-lg border"
//                           />
//                         )}

//                         {/* CANCEL BUTTON */}
//                         {edit && (preview || showEditImage) && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setShowEditImage(false)
//                               setPreview(null)
//                             }}
//                             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                           >
//                             Cancel
//                           </button>
//                         )}

//                       </div>
//                     </>
//                   )}

//                 </div>


//                 {/* TECH */}
//                 <input {...register("tech")} placeholder="tech" className={handleClasses("tech")} />

//                 {/* LIVEURL */}
//                 <input {...register("liveURL")} placeholder="liveURL" className={handleClasses("liveURL")} />

//                 {/* GITHUBURL */}
//                 <input {...register("githubURL")} placeholder="githubURL" className={handleClasses("githubURL")} />

//                 {/* BUTTONS */}
//                 <div className="flex justify-end gap-3 pt-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsOpen(false)
//                       setPreview(null)
//                       setEdit(null)
//                       reset()
//                     }}
//                     className="px-4 py-2 bg-gray-300 rounded-lg"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center"
//                   >
//                     {/* Create */}
//                     {edit ? "Update" : "Create"}
//                   </button>

//                 </div>

//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   </>
// }

// export default Project