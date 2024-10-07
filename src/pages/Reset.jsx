import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import {useForm} from "react-hook-form"


/* ============= Images ============== */
import forgot from "../assets/forgot.png"
import signinlogo from "../assets/logo.png"

/* ============ Redux ================ */
import { clearError, clearSuccess, resetPassword } from '../redux/actions/userAction'


const Reset = () => {
  const dispatch = useDispatch()
  const {token} = useParams()
  const history = useNavigate()
  
  const {loading, error, success, isAuthenticated} = useSelector(state=>state.forgotPassword)
  const {register, formState:{errors}, handleSubmit} = useForm()



  const [passError, setPassError] = useState()
  
  const handleReset = (data)=>{
    if(data.pass !== data.cpass){
        setPassError(true)
    }else{
        setPassError(false)
        const userData = {
            password:data.pass,
        }
        dispatch(resetPassword(userData, token))
        // console.log(token)
    }
   
  }
  
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(()=>{
    if(isAuthenticated){
        return history(redirect)
    }
    if(error){
        toast(error)
    }
    dispatch(clearError())
    if(success){
        toast(success)
    }
    dispatch(clearSuccess())
  },[error, success])

  return (
    <div className='container mx-auto'>
        <div className='w-full'>
            <div className='flex justify-between  items-center py-5 px-5'>
                <div className='w-6/12 flex flex-col justify-center items-center'>
                    <p className='font-semibold text-[#CB0881] text-center text-2xl'>Reset Password</p>
                    <p className='text-center mt-3'>Reset Your Orion Trading System Password  <br/>Secure Account Recovery</p>
                    <form onSubmit={handleSubmit(handleReset)} className='bg-[#FCEEF8] rounded-xl px-8 py-5 w-10/12 mt-5'>
                        <div className='border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Password</label>
                            <input  {...register("pass", {required:"This field is required"})} type='password' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter password'/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.pass?.message}</p>
                        
                        <div className='mt-4 border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Confirm Password</label>
                            <input {...register("cpass", {required:"This field is required"})}  type='password' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Repeat password'/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.cpass?.message}</p>
                        {passError && <p className='text-xs text-red-500'>Password Not Matched!</p>}
                        <div className='text-center mt-8'>
                            <button className='bg-[#CB0881] px-6 py-1  text-white rounded-full text-sm'>{loading? "Loading...." : "Submit"}</button>
                        </div>

                    </form>
                </div>
                <div className='flex flex-col items-center justify-center w-6/12'>
                    <img src={signinlogo} className=' h-20'/>
                    <img src={forgot}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reset