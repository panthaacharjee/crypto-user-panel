import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

/* ============= IMAGE ============== */
import signin from "../assets/signin-img.jpg"
import signinlogo from "../assets/logo.png"

/* =========== React Icons ================== */
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from 'react-toastify'

/* =========== Redux Action ============= */
import { clearError, loginUser } from '../redux/actions/userAction'


const Login = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const {loading, error, isAuthenticated} = useSelector(state=>state.user)

    const [eye, setEye]  = useState(true)

    const [email, setEmail] = useState()
    const [pass, setPass] = useState()

    const handleLogin = () =>{
        const data = {
            email:email,
            password:pass,
            role:"USER"
        }
        dispatch(loginUser(data))
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
                    <img src={signin} style={{height:"400px"}}/>
                </div>
                <div className='w-6/12 flex flex-col justify-center items-center'>
                    <p className='font-semibold text-[#CB0881] text-center text-2xl'>Sign In</p>
                    <p>Welcome back to Orion Trading System</p>
                    <div  className='bg-[#FCEEF8] rounded-xl px-8 py-5 w-10/12 mt-5'>
                        <div className='border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Email</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type='text' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter your email'/>
                        </div>
                        <div className='mt-4 border-b border-[#CB084B] relative'>
                            <label className='font-semibold text-md'>Password</label>
                            <input onChange={(e)=>setPass(e.target.value)} type={eye ? "password":"text"} className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder="Enter your password"/>
                            <div className='absolute right-3 top-11 cursor-pointer'>
                                {eye ? <FaEye onClick={()=>setEye(false)}/>: <IoEyeOff onClick={()=>setEye(true)}/>}
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                            <div className='flex items-center'>
                                <input type='checkbox'/>
                                <p className='ml-2 text-sm'>Remember Password</p>
                            </div>
                            <div>
                                <Link to="/forgot/password">Reset password?</Link>
                            </div>
                        </div>
                        <div className='text-center mt-8'>
                            <button onClick={handleLogin} className='bg-[#CB0881] px-6 py-1  text-white rounded-full text-sm'>{loading?"Loading...." : "Sign In"}</button>
                            <p className='text-sm mt-2'>Don’t have an account? <Link to="/register" className='text-[#CB0881]'>Join Us</Link></p>
                        </div>

                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Login

