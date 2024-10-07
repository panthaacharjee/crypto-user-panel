import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { directRefferal, teamMember, turnOver } from '../../redux/actions/userAction'
import profile3 from "../../assets/pro.jpg"

const Affiliate = () => {
    const dispatch  = useDispatch()
    const {turnover, totalTeam, dirrectturnover, refferal, loading} = useSelector(state=>state.affilate)
    const {user} = useSelector(state=>state.user)

    useEffect(()=>{
        dispatch(turnOver())
        dispatch(teamMember())
        dispatch(directRefferal())
    }, [turnover, refferal, totalTeam, dirrectturnover])
  return (
    <div className='container mx-auto pt-32 pb-10'>
        <div className='px-10 w-full flex justify-between items-start'>
            <div className='w-6/12'>
                <div className="min-h-36 bg-[#f1f1f1] mb-5 rounded-md px-8 py-4 flex flex-col  justify-center">
                    <p className='text-xl text-[#CB087D] mb-5 font-bold'>Direct Referrals</p>
                    {loading ? <div class="animate-pulse flex space-x-4">
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-10 bg-slate-200 rounded"></div>
                                    </div>
                                </div>:<p className='text-3xl font-bold'>{refferal}</p>}
                </div>
                <div className="min-h-36 bg-[#f1f1f1] mb-5 rounded-md px-8 py-4 flex flex-col  justify-center">
                    <p className='text-xl text-[#CB087D] mb-5 font-bold'>Direct Turnover</p>
                    {loading ? <div class="animate-pulse flex space-x-4">
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-10 bg-slate-200 rounded"></div>
                                    </div>
                                </div>:<p className='text-3xl font-bold'>{dirrectturnover} USDT</p>}
                </div>
                <div className="min-h-36 bg-[#f1f1f1] mb-5 rounded-md px-8 py-4 flex flex-col  justify-center">
                    <p className='text-xl text-[#CB087D] mb-5 font-bold'>Team Member</p>
                    {loading ? <div class="animate-pulse flex space-x-4">
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-10 bg-slate-200 rounded"></div>
                                    </div>
                                </div>:<p className='text-3xl font-bold'>{totalTeam}</p>}
                </div>
                <div className="min-h-36 bg-[#f1f1f1] rounded-md px-8 py-4 flex flex-col  justify-center">
                    <p className='text-xl text-[#CB087D] mb-5 font-bold'>Team Turnover</p>
                    {loading ? <div class="animate-pulse flex space-x-4">
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-10 bg-slate-200 rounded"></div>
                                    </div>
                                </div>:<p className='text-3xl font-bold'>{turnover} USDT</p>}
                </div>
            </div>
            <div className='w-5/12 flex items-center justify-end'>
                <div className=' rounded-full overflow-hidden border-2 border-[#CB087D]' style={{width:"80px", height:"80px"}}>
                {user?.avatar ? <img src={user.avatar.url} alt="Profile Image"/>: <img src={profile3} alt="Profile Image"/>}
                </div>
                <div className='ml-5'>
                    <p className='font-bold text-medium'>{user?.name}</p>
                    <p>Begginer</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Affiliate