import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Mail, Eye, EyeOff, Lock } from "lucide-react"
import { Input } from "../../components/ui/input"
import { useNavigate } from "react-router-dom"
import { FieldValues, useForm } from "react-hook-form"
import { useAppDispatch } from "../../redux/hook"
import { useLogingMutation } from "../../redux/features/auth/authApi"
import { setUser, TUser } from "../../redux/features/auth/authSlice"
import { verifyToken } from "../../function/validateToken"
import { useState } from "react"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const {
 register,
 handleSubmit,
 formState: { errors }
} = useForm()
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [login] = useLogingMutation(); 

   const onSubmit =async (data:FieldValues) =>{
       try{
           const userInfo = {
             email: data.email,
             password: data.password,
           };
           const res = await login(userInfo).unwrap();
           console.log(await res)
           const user = verifyToken(res.data.token) as TUser;
           dispatch(setUser({ user, token: res.data.token }));
           navigate(`/dashboard/admin/user-management`);
       }
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
       catch(error){
        console.log(error)
          //  toast.error("Something want wrong",{id:toastId,duration:2000})
       }
    }

  return (
     <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-black flex items-center justify-center px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-zinc-900 p-6 rounded-xl shadow-lg space-y-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-yellow-400">Sign in to continue to your account</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
            <Input
              type="email"
              placeholder="Email address"
              className="pl-10 bg-black border-yellow-400 text-white focus:ring-yellow-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 bg-black border-yellow-400 text-white focus:ring-yellow-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            <div
              className="absolute right-3 top-3 text-yellow-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>
            )}
          </div>

          <div className="flex justify-end text-xs text-yellow-400 cursor-pointer">
            Forgot Password?
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
          >
            Sign In
          </Button>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <div className="h-px flex-1 bg-zinc-700" />
            <span>Or</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-white text-white hover:bg-white hover:text-black"
            // you can trigger Google OAuth here
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.5 20H24V28H35.6C34.1 32.7 29.8 36 24 36C17.4 36 12 30.6 12 24C12 17.4 17.4 12 24 12C27.1 12 30 13.2 32.1 15.3L38.1 9.3C34.5 5.9 29.6 4 24 4C12.9 4 4 12.9 4 24C4 35.1 12.9 44 24 44C35.1 44 44 35.1 44 24C44 22.7 44.3 21.3 44.5 20Z"
                fill="#FFC107"
              />
            </svg>
            Sign In With Google
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
