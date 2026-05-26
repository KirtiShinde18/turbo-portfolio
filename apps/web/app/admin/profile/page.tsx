"use client"

import { Edit, FileText, Loader2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import clsx from "clsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { useCreateProfileMutation, useGetProfileQuery, useUpdateProfileMutation } from "../../../redux/apis/admin.api"

const optionalFileList = z.any().refine(
    (files) => !files || files.length === 0 || files[0] instanceof File,
    "Invalid file"
)

type ProfileFormValues = {
  name : string
  title : string
  bio : string
  journey : string
  work : string
  dob : string
  location : string
  email : string
  mobile : string
  language : string
  profilePic? : FileList
  cv?: FileList
  yearExp: string,
  projectsCompleted: string,
  technologies: string,
  happyClients: string,
  githubURL: string,
  linkedin: string,
}

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [updatePF, setUpdatePF] = useState(false)

  const [addProfile] = useCreateProfileMutation()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  
  const { data, isLoading: isFetching, isError } = useGetProfileQuery()
  const isProfileExist = !!data?.result
  
  const profile = data?.result || null
  const [preview, setPreview] = useState<string | null>(null)
  const [showEditImage, setShowEditImage] = useState(false)
  const [showEditCv, setShowEditCv] = useState(false)

  // ✅ schema
  const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    title: z.string().min(1, "Title is required"),
    bio: z.string().min(1, "Bio is required"),
    journey: z.string().min(1, "Journey is required"),
    work: z.string().min(1, "Work is required"),
    dob: z.string().min(1, "Date of Birth is required"),
    location: z.string().min(1, "Location is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(1, "Mobile is required"),
    language: z.string().min(1, "Language is required"),
  
    githubURL: z.string().url("Invalid GitHub URL"),
    linkedin: z.string().url("Invalid LinkedIn URL"),
  
    profilePic: optionalFileList.optional(),
    cv: optionalFileList.optional(),
  
    yearExp: z.string().min(1, "Years of Experience is required"),
    projectsCompleted: z.string().min(1, "Projects Completed is required"),
    technologies: z.string().min(1, "Technologies is required"),
    happyClients: z.string().min(1, "Happy Clients is required"),
  }) satisfies z.ZodType<ProfileFormValues>

 const { 
  handleSubmit,
  register,
  reset,
  setValue,
  formState: { errors, touchedFields }
} = useForm<ProfileFormValues>({
  resolver: zodResolver(profileSchema),

  defaultValues: {
    name: "",
    title: "",
    bio: "",
    journey: "",
    work: "",
    dob: "",
    location: "",
    email: "",
    mobile: "",
    language: "",

    githubURL: "",
    linkedin: "",

    yearExp: "",
    projectsCompleted: "",
    technologies: "",
    happyClients: "",
  }
})

  // ✅ input class
  const handleClasses = (key: keyof ProfileFormValues) =>
    clsx(
      "peer w-full px-3 py-3 rounded-lg border outline-none transition-all duration-200 text-sm",
      "border-gray-300 hover:border-gray-400",
      "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
      errors[key] && "border-red-500 focus:ring-red-200",
      touchedFields[key] && !errors[key] && "border-green-500 focus:ring-green-200"
    )

  // ✅ submit
 const onSubmit = async (formData: ProfileFormValues) => {
  try {
    const fd = new FormData()

    fd.append("name", formData.name)
    fd.append("title", formData.title)
    fd.append("bio", formData.bio)
    fd.append("journey", formData.journey)
    fd.append("work", formData.work)
    fd.append("dob", formData.dob)
    fd.append("location", formData.location)
    fd.append("email", formData.email)
    fd.append("mobile", formData.mobile)
    fd.append("language", formData.language)
    fd.append("yearExp", formData.yearExp)
    fd.append("projectsCompleted", formData.projectsCompleted)
    fd.append("technologies", formData.technologies)
    fd.append("happyClients", formData.happyClients)

    const file = formData.profilePic?.[0]
    if (file) fd.append("profilePic", file)
    
    const cvFile = formData.cv?.[0]
    if (cvFile) fd.append("cv", cvFile)

    // ✅ CREATE / UPDATE PROFILE CALL
    if (updatePF) {
      await updateProfile(fd).unwrap()
      toast.success("Profile Updated Successfully 🎉")
    } else {
      if (!file || !cvFile) {
         toast.error("Both Profile Image and CV are required to create a profile.")
         return
      }
      await addProfile(fd).unwrap()
      toast.success("Profile Created Successfully 🎉")
    }

    reset()
    setIsOpen(false)

  } catch (err: any) {
    console.log(err)
    toast.error(err?.data?.message || "Profile operation failed ❌")
  }
}

// useeffect 
useEffect(() => {
  if (updatePF && profile) {
    setValue("name", profile.name)
    setValue("title", profile.title)
    setValue("bio", profile.bio)
    setValue("journey", profile.journey)
    setValue("work", profile.work)
    setValue("dob", profile.dob?.split("T")[0] || "") // 👈 date fix
    setValue("location", profile.location)
    setValue("email", profile.email)
    setValue("mobile", profile.mobile)
    setValue("language", profile.language)
    setValue("yearExp", profile.yearExp?.toString() || "")
    setValue("projectsCompleted", profile.projectsCompleted?.toString() || "")
    setValue("technologies", profile.technologies?.toString() || "")
    setValue("happyClients", profile.happyClients?.toString() || "")
  }
}, [updatePF, profile, setValue])

useEffect(() => {
  if (isOpen) {
    setPreview(null)
    setShowEditImage(false)
    setShowEditCv(false)
  }
}, [isOpen])

  return (
    <div className="min-h-screen md:mt-10 px-4">
      <div className="mt-20 max-w-7xl mx-auto text-center text-black">

        <div className=" bg-gray-50 rounded-xl shadow text-start p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold my-2 ">Profile 👱🏻‍♀️</h2>
              <p className="text-gray-400 text-xl">Edit About Information</p>
            </div>

            {/* Edit btn  */}
            <button
              onClick={() => {
                setIsOpen(true)
            
                if (isProfileExist) {
                  setUpdatePF(true)   // edit mode
                  setShowEditImage(false)
                  setShowEditCv(false)
                } else {
                  setUpdatePF(false)  // create mode
                  reset()             // 🧹 clear form
                }
              }}
                className="px-3 py-2 bg-black text-white rounded-lg flex gap-2 items-center cursor-pointer"
            >
              <Edit size={18} />
              {isProfileExist ? "Edit" : "Create"}
            </button>

          </div>

          {/* display  */}
          {isFetching ? (
             <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
             </div>
          ) : isError ? (
             <div className="py-10 text-center text-red-500">Failed to load profile.</div>
          ) : profile ? (
            <div className="flex flex-col md:flex-row gap-10 my-8 items-start">
            
              {/* IMAGE SECTION */}
              <div className="flex flex-col gap-5 items-center md:items-center shrink-0 w-full md:w-auto ">
            
                <img
                  src={profile.profileImage}
                  alt="profile"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-lg "
                />
            
                {profile.cv && (
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto"
                  >
                    <button className="w-full cursor-pointer md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-200 to-indigo-200 px-5 py-2.5 rounded-lg text-black text-sm font-medium hover:scale-105 hover:opacity-90 transition">
                      <FileText size={16} />
                      View CV
                    </button>
                  </a>
                )}
            
              </div>
            
              {/* DETAILS */}
              <div className="w-full">
            
                {/* NAME + TITLE */}
                <h2 className="text-3xl font-bold">{profile.name}</h2>
                <p className="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent mb-6 text-xl font-semibold">
                  {profile.title}
                </p>
            
                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm md:text-base">
            
                  {/* BASIC INFO */}
                  <p><b>Mobile:</b> {profile.mobile}</p>
                  <p><b>Email:</b> {profile.email}</p>
                  <p><b>DOB:</b> {profile.dob}</p>
                  <p><b>Location:</b> {profile.location}</p>
                  <p><b>Language:</b> {profile.language}</p>
            
                  {/* STATS */}
                  <div className="sm:col-span-2">
                    <p className="font-bold mb-2">Stats</p>
                    <ul className="grid grid-cols-2 gap-2 text-gray-700">
                      <li>Experience: {profile.yearExp}+</li>
                      <li>Projects: {profile.projectsCompleted}+</li>
                      <li>Technologies: {profile.technologies}+</li>
                      <li>Clients: {profile.happyClients}+</li>
                    </ul>
                  </div>
            
                  {/* FULL WIDTH */}
                  <p className="sm:col-span-2">
                    <b className="block mb-1">Work:</b> {profile.work}
                  </p>
            
                  <p className="sm:col-span-2">
                    <b className="block mb-1">Journey:</b> {profile.journey}
                  </p>
            
                  <p className="sm:col-span-2">
                    <b className="block mb-1">Bio:</b> {profile.bio}
                  </p>
            
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center text-center text-gray-500">
              <p>❌ No profile found. Create ✏️ one to get started...!</p>

              <img
                src="/aww.png"
                alt="No profile"
                width={300}
                className="mt-5"
              />
            </div>
          )}
        </div>

        {/* MODAL */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-6 text-start">
                {updatePF ? "Update Profile" : "Create Profile"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {/* NAME */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Name</label>
                        <input {...register("name")} placeholder="Full Name" className={handleClasses("name")} />
                        {errors.name && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.name.message}</span>}
                    </div>

                    {/* TITLE */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Title</label>
                        <input {...register("title")} placeholder="Professional Title" className={handleClasses("title")} />
                        {errors.title && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.title.message}</span>}
                    </div>

                    {/* DOB */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Date of Birth</label>
                        <input type="date" {...register("dob")} className={handleClasses("dob")} />
                        {errors.dob && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.dob.message}</span>}
                    </div>

                    {/* LOCATION */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Location</label>
                        <input {...register("location")} placeholder="City, Country" className={handleClasses("location")} />
                        {errors.location && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.location.message}</span>}
                    </div>

                    {/* EMAIL */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Email</label>
                        <input {...register("email")} placeholder="Email Address" className={handleClasses("email")} />
                        {errors.email && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.email.message}</span>}
                    </div>

                    {/* MOBILE */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Mobile</label>
                        <input {...register("mobile")} placeholder="Mobile Number" className={handleClasses("mobile")} />
                        {errors.mobile && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.mobile.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-6">
                    {/* LANGUAGE */}
                    <div className="relative md:col-span-1">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Language</label>
                        <input {...register("language")} placeholder="Languages spoken" className={handleClasses("language")} />
                        {errors.language && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.language.message}</span>}
                    </div>

                    {/* yearExp */}
                    <div className="relative md:col-span-1">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Years Exp</label>
                        <input type="number" {...register("yearExp")} placeholder="Years of Experience" className={handleClasses("yearExp")} />
                        {errors.yearExp && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.yearExp.message}</span>}
                    </div>

                    {/* projectsCompleted */}
                    <div className="relative md:col-span-1">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Projects</label>
                        <input type="number" {...register("projectsCompleted")} placeholder="Completed" className={handleClasses("projectsCompleted")} />
                        {errors.projectsCompleted && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.projectsCompleted.message}</span>}
                    </div>

                    {/* happyClients */}
                    <div className="relative md:col-span-1">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Clients</label>
                        <input type="number" {...register("happyClients")} placeholder="Happy Clients" className={handleClasses("happyClients")} />
                        {errors.happyClients && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.happyClients.message}</span>}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-y-6">
                    {/* technologies */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Technologies</label>
                        <input {...register("technologies")} placeholder="Number of technologies or list" className={handleClasses("technologies")} />
                        {errors.technologies && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.technologies.message}</span>}
                    </div>

                    {/* BIO */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Bio</label>
                        <textarea {...register("bio")} placeholder="Short bio..." className={clsx(handleClasses("bio"), "min-h-[80px] resize-y")} />
                        {errors.bio && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.bio.message}</span>}
                    </div>

                    {/* JOURNEY */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Journey</label>
                        <textarea {...register("journey")} placeholder="Your journey..." className={clsx(handleClasses("journey"), "min-h-[80px] resize-y")} />
                        {errors.journey && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.journey.message}</span>}
                    </div>

                    {/* WORK */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">Work Experience</label>
                        <textarea {...register("work")} placeholder="Work experience..." className={clsx(handleClasses("work"), "min-h-[80px] resize-y")} />
                        {errors.work && <span className="text-xs text-red-500 absolute -bottom-4 left-1">{errors.work.message}</span>}
                    </div>
                </div>

                {/* GITHUB URL */}
                <div className="relative">
                  <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">
                    GitHub URL
                  </label>
                
                  <input
                    {...register("githubURL")}
                    placeholder="https://github.com/username"
                    className={handleClasses("githubURL")}
                  />
                
                  {errors.githubURL && (
                    <span className="text-xs text-red-500 absolute -bottom-4 left-1">
                      {errors.githubURL.message}
                    </span>
                  )}
                </div>
                
                {/* LINKEDIN URL */}
                <div className="relative">
                  <label className="text-xs font-semibold text-gray-600 ml-1 mb-1 block text-start">
                    LinkedIn URL
                  </label>
                
                  <input
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/username"
                    className={handleClasses("linkedin")}
                  />
                
                  {errors.linkedin && (
                    <span className="text-xs text-red-500 absolute -bottom-4 left-1">
                      {errors.linkedin.message}
                    </span>
                  )}
                </div>

                {/* FILE FIELDS CONTAINER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-5 border border-gray-200 rounded-xl bg-gray-50/50">
                    
                    {/* IMAGE FIELD */}
                    <div className="space-y-3 text-start">
                        <label className="text-sm font-semibold text-gray-700 block">Profile Image {!updatePF && <span className="text-red-500">*</span>}</label>
                        {(updatePF && profile?.profileImage && !showEditImage) ? (
                            <div className="flex items-center gap-4">
                            <img
                                src={preview || profile.profileImage}
                                alt="profile"
                                className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowEditImage(true)}
                                className="px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                            >
                                Change Image
                            </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                            <input
                                type="file"
                                accept="image/*"
                                {...register("profilePic")}
                                onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setPreview(URL.createObjectURL(file))
                                }
                                }}
                                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />
                            {preview && (
                                <div className="flex items-center gap-4">
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                                />
                                {updatePF && (
                                    <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditImage(false)
                                        setPreview(null)
                                        reset({ ...register, profilePic: undefined } as any)
                                    }}
                                    className="px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                                    >
                                    Cancel
                                    </button>
                                )}
                                </div>
                            )}
                            </div>
                        )}
                    </div>

                    {/* CV FIELD */}
                    <div className="space-y-3 text-start">
                        <label className="text-sm font-semibold text-gray-700 block">CV Document {!updatePF && <span className="text-red-500">*</span>}</label>
                        {(updatePF && profile?.cv && !showEditCv) ? (
                            <div className="flex items-center gap-4">
                                <a 
                                    href={profile.cv} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
                                >
                                    <FileText size={16} /> Current CV
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setShowEditCv(true)}
                                    className="px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                                >
                                    Change CV
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    {...register("cv")}
                                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                                {updatePF && showEditCv && (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowEditCv(false)
                                                reset({ ...register, cv: undefined } as any)
                                            }}
                                            className="px-3 py-1.5 bg-white border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-black cursor-pointer hover:bg-gray-800 text-white font-medium rounded-lg flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading && <Loader2 size={18} className="animate-spin" />}
                    {isLoading ? (updatePF ? "Updating..." : "Saving...") : (updatePF ? "Update Profile" : "Save Profile")}
                  </button>
                  
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile