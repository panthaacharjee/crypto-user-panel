import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


/* ============= Images ============== */
import forgot from "../assets/forgot.png"
import signinlogo from "../assets/logo.png"

/* ============ Redux ================ */
import { clearError, clearSuccess, forgotPassword } from '../redux/actions/userAction'


const Forgot = () => {
  const dispatch = useDispatch()
  const {loading, error, success} = useSelector(state=>state.forgotPassword)

  const [email, setEmail] = useState()
  const [userName, setUserName] = useState()
  
  const handleSubmit = ()=>{
    const userData = {
        email:email,
        userName: userName
    }
    dispatch(forgotPassword(userData))
  }

  useEffect(()=>{
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
    <div className='container mx-auto px-10'>
        <div className='w-full'>
            <div className='flex justify-between  items-center py-10'>
                <div className='w-6/12 flex flex-col justify-center items-center'>
                    <p className='font-semibold text-[#CB0881] text-center text-2xl'>Forgot Password</p>
                    <p className='text-center mt-3'>Reset Your Orion Trading System Password  <br/>Secure Account Recovery</p>
                    <div  className='bg-[#FCEEF8] rounded-xl px-8 py-5 w-10/12 mt-5'>
                        <div className='border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>Email</label>
                            <input  onChange={(e)=>setEmail(e.target.value)} type='email' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter your email'/>
                        </div>
                        
                        <div className='mt-4 border-b border-[#CB084B]'>
                            <label className='font-semibold text-md'>User Name</label>
                            <input onChange={(e)=>setUserName(e.target.value)}  type='text' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mt-1' placeholder='Enter your username'/>
                        </div>
                        <div className='text-center mt-8'>
                            <button onClick={handleSubmit}  className='bg-[#CB0881] px-6 py-1  text-white rounded-full text-sm'>{loading? "Loading...." : "Submit"}</button>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col items-center w-6/12'>
                    <img src={signinlogo} className=' h-20'/>
                    <img src={forgot}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forgot