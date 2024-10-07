import React, { useEffect } from 'react';
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"

/* ============= COMPONENT ============= */
import WallatNav from '../../components/WallatNav';

/* ============== REDUX =============== */
import { clearError, clearSuccessW, userWithdraw } from '../../redux/actions/userAction';

const FundWithdraw = () => {
    const dispatch = useDispatch()
    const {register, formState:{errors}, handleSubmit} = useForm()
    const {wloading, wsuccess, error} = useSelector(state=>state.transection)

    const handleWithdraw = (data)=>{
        const userData = {
            amount: parseFloat(data.amount),
            address : data.address,
            password : data.pass

        }
        dispatch(userWithdraw(userData))
    }

    useEffect(()=>{
        if(wsuccess){
            toast(wsuccess)
        }
        dispatch(clearSuccessW())
        if(error){
            toast(error)
        }
        dispatch(clearError())
    },[wsuccess, error])

    return (
        <div className='container pt-28 mx-auto px-4'>
            <WallatNav />
            <form onSubmit={handleSubmit(handleWithdraw)} className='m-4 sm:m-8 md:m-12 lg:m-20'>
                <div className=' w-full'>
                    <h1 className='font-semibold text-xl sm:text-xl mb-5'>Withdraw</h1>
                    <input {...register("amount", {required:"This field is required"})}  className="appearance-none border rounded py-2 px-3 focus:shadow-outline mr-3 sm:w-5/12" id="amount" type="text" placeholder="Enter Amount" />
                    <p className='text-red-500 text-xs'>{errors.amount?.message}</p>
                    <input {...register("address", {required:"This field is required"})} className="appearance-none border rounded py-2 px-3 mt-4 focus:shadow-outline mr-3 sm:w-5/12" id="address" type="text" placeholder="TRC20 Address" />
                    <p className='text-red-500 text-xs'>{errors.address?.message}</p>
                    {/* <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline mr-3" id="otp" type="text" placeholder="OTP code" /> */}
                </div>
                <div className='w-full  mx-auto mt-5'>
                    <h1 className='font-semibold text-lg sm:text-xl md:text-xl mb-5'>Withdraw Password</h1>
                    <div className=''>
                        <input {...register("pass", {required:"This field is required"})} type="password"  className="w-full sm:w-6/12 appearance-none border rounded py-2 px-3 focus:shadow-outline" id="withdraw-password" placeholder="Withdraw password" />
                        <p className='text-red-500 text-xs'>{errors.pass?.message}</p>
                        <div>
                            <button className="px-6 py-2 bg-[#CB0881] rounded-full text-white font-medium mt-10 text-sm sm:text-base">
                                {wloading? "Loading...": "Withdraw"}
                            </button>
                        </div>
                    </div>
                </div>
                <p className='text-sm sm:text-base md:text-lg text-primary mt-4'>
                    <li className='py-2'>To initiate a withdrawal, you need to have a minimum of 10.00 USDT in your account</li>
                </p>
            </form>
        </div>
    );
};

export default FundWithdraw;
