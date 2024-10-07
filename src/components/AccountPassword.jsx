import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {useForm} from "react-hook-form"

/* ============= Image ================ */
import close from "../assets/icon/close.png"
import password from "../assets/icon/password.png"

/* ========= Redux =========== */
import { clearError, clearSuccess, sentPasswordToken, updatePassword } from "../redux/actions/userAction"

const AccountPassword = ({setPasswordModel}) => {
    const dispatch = useDispatch()
    const {loading, success, error, uloading} = useSelector(state=>state.update)
    const {register, formState:{errors}, handleSubmit} = useForm()

    const [passError, setPassError] = useState(false)

    const handlePasswordChange =(data)=>{
       if(data.pass !== data.cPass){
        setPassError(true)
       }else{
        setPassError(false)
         const userData = {
            oldPassword:data.oldPass,
            newPassword:data.pass,
            token:data.token
        }
        // const tokens = getToken()
        // console.log(userData)
        dispatch(updatePassword(userData))
       }
    }
    const handleSentToken = ()=>{
        dispatch(sentPasswordToken(tokens))
    }
    useEffect(()=>{
        if(success){
            toast(success)
        }
        dispatch(clearSuccess())
        if(error){
            toast(error)
        }
      
        dispatch(clearError())
    },[success, error,])
  return (
    <div className="fixed top-0 left-0 z-50 h-[100%] w-[100%] bg-background-opacity flex justify-center items-center">
        <div className="bg-white w-11/12 lg:w-5/12 px-10 py-10">
            <div className="flex justify-between">
                <div className="flex items-center bg-[#CB084B] px-5 py-2 rounded-md">
                    <p className="text-white text-sm  font-medium">Account Password </p>
                    <img src={password} className="ml-5"/>
                </div>
                <button onClick={()=>setPasswordModel(false)}><img src={close}/></button>
            </div>
            <form onSubmit={handleSubmit(handlePasswordChange)} className="w-[95%] mt-10">
                <div> 
                    <label className="font-semibold text-sm">Old Password</label>
                    <input {...register("oldPass", {required:"This field is required"})} type="password" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <p className="text-red-500 text-xs">{errors.oldPass?.message}</p>
                <div className="mt-2">
                    <label className="font-semibold text-sm">New Password</label>
                    <input {...register("pass", {required:"This field is required"})} type="password" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <p className="text-red-500 text-xs">{errors.pass?.message}</p>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Confirm New Password</label>
                    <input {...register("cPass", {required:"This field is required"})} type="password" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <p className="text-red-500 text-xs">{errors.cPass?.message}</p>
                {passError && <p className="text-red-500 text-xs">Password Does not Matched</p>}
                <div className="mt-2">
                    <label className="font-semibold text-sm">OTP Code</label>
                    <input {...register("token", {required:"This field is required"})} type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <p className="text-red-500 text-xs">{errors.token?.message}</p>
                <div>
                    <p onClick={handleSentToken} className="text-xs text-right mt-2 font-medium cursor-pointer">{loading?"Loading....":"Sent OTP Code to Email"}</p>
                </div>
                <div className="w-full">
                    <button  className="bg-[#CB084B] mx-auto block px-8 py-2 rounded-full text-white text-xs mt-4">{uloading?"Loading...":"Change"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AccountPassword