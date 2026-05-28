"use client";

import React from "react";

import { UserLock } from "lucide-react";
import { useRouter } from "next/navigation";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSigninMutation } from "../../../redux/apis/auth.api";
import { LOGIN_REQUEST } from "@repo/types";
import FloatingInput from "../../../_components/FloatingInput";




// ✅ Type from Zod
// type LoginFormData = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const router = useRouter();

  // ✅ Zod Schema
  const loginSchema = z.object({
    email: z.string().min(1, "Email required").email("Invalid email"),
    password: z.string().min(1, "Password required")
  }) satisfies z.ZodType<LOGIN_REQUEST>

  const {handleSubmit, register, reset, formState: { errors, touchedFields }} = useForm<LOGIN_REQUEST>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  });


  const handleLogin = async (data: LOGIN_REQUEST) => {
  // console.log("form data:", data)
  try {
    const res = await signin(data).unwrap()
    toast.success("Login Success")
    console.log(res)
    router.push("/admin")
    router.refresh()
    reset();
  } catch (err) {
    console.log(err)
    toast.error("Unable to Login")
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200  dark:bg-white/10">
            <UserLock size={35} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#d382c8] bg-clip-text text-transparent">
           Login
        </h1>

        <p className="text-gray-400 text-center mt-2 text-xl">
          Sign in to dashboard
        </p>

        <div className="mt-6 space-y-4">
          
          {/* Email */}
          <div>
            <FloatingInput
              label="Email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <FloatingInput
              label="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-gradient-to-r from-purple-300 to-indigo-300 px-4 py-2 rounded-lg text-xl text-black"
          >
            {isLoading ? "Logging..." : "Login"}
          </button>

          <p className="text-center text-lg ">
            🔐 Queen Access Only
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;