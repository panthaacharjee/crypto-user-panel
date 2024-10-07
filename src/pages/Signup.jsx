import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'


/* =============== Images ================= */
import registerImg from "../assets/register.jpg"
import signinlogo from "../assets/logo.png"

/* =============== Redux ================= */
import { clearError, registerUser } from '../redux/actions/userAction'


const Signup = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const {loading, error, isAuthenticated} = useSelector(state=>state.user)

    const {register, formState:{errors}, handleSubmit} = useForm()
    const [cerror, setCerror] = useState(false)
    const [terms, setTerms] = useState()
    const [termsError, setTermsError] =useState(false)
    
    const handleRegister = (data)=>{
        if(data.password !== data.cpassword){
            setCerror(true)
        }else{
            setCerror(false)
            if(terms===false || terms===undefined){
                setTermsError(true)
            }else{
                setTermsError(false)
                const userData = {
                    name: data.fullname,
                    email:data.email,
                    password:data.password,
                    refferId:data.reffer,
                    userName:data.username
                }
                dispatch(registerUser(userData))
            }
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {
        if (isAuthenticated) {
          return history(redirect);
        }
        if(error){
            toast(error)
        }
        dispatch(clearError())
        
    }, [isAuthenticated, error]);

  return (
    <div className='container mx-auto px-10'>
        <div className='w-full '>
            <div className='flex justify-between items-center py-12'>
                <div className='flex flex-col items-center w-6/12'>
                    <img src={signinlogo} className=' h-20'/>
                    <img src={registerImg} className='w-[500px]'/>
                </div>
                <div className='w-6/12 flex flex-col justify-center items-center'>
                    <p className='font-semibold text-[#CB0881] text-center text-2xl'>Sign Up</p>
                    <p>Create Your Account Start Investing Today! </p>
                    <form  onSubmit={handleSubmit(handleRegister)} className='bg-[#FCEEF8] rounded-xl px-8 py-5 w-10/12 mt-5'>
                        <div className='mt-4 border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>User Name</label>
                            <input type='text' {...register("username", {required:"This field is required", minLength:{value:6, message:"Minimum Length Is 6 Characters"},})} className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter username'/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.username?.message}</p>
                        <div className='mt-4 border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Full Name</label>
                            <input type='text' {...register("fullname", {required:"This field is required", minLength:{value:6, message:"Minimum Length Is 6 Characters"},})}  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter your name'/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.fullname?.message}</p>
                        <div className='mt-4 border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Email</label>
                            <input type='text' {...register("email", {required:"This field is required", pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message:"Enter a valid Email"}})}  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter your email'/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.email?.message}</p>
                        <div className='mt-4 border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Refferal ID</label>
                            <input type='text' {...register("reffer")} className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter refferal id'/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.reffer?.message}</p>
                        <div className='mt-4 border-b border-[#CB084B] relative'>
                            <label className='font-semibold text-md'>Password</label>
                            <input type='password' {...register("password", {required:"This field is required"})}  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder="Enter password"/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.password?.message}</p>
                        <div className='mt-4 border-b border-[#CB084B] relative'>
                            <label className='font-semibold text-md'>Confirm Password</label>
                            <input type='password' {...register("cpassword", {required:"This field is required"})}   className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder="Repeat password"/>
                        </div>
                        <p className='text-red-500 text-xs'>{errors.cpassword?.message}</p>
                        {cerror && <p className='text-red-500 text-xs'>Password Not Matched</p>}
                        <div className='mt-4 flex items-center'>
                                <input type='checkbox' onChange={(e)=>setTerms(e.target.checked)}/>
                                <p className='ml-2 text-sm' style={termsError ? {color:"red"}:{color:"black"}}>I agree term and condition</p>
                        </div>
                        <div className='text-center mt-8'>
                            <button  className='bg-[#CB0881] px-6 py-1  text-white rounded-full text-sm'>{loading?"Loading....":"Sign Up"}</button>
                            <p className='text-sm mt-2'>Already have an account?<Link to="/login" className='text-[#CB0881]'> Log In</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup