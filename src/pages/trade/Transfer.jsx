import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import {toast} from "react-toastify"


/* ======== Image ========== */
import stack from "../../assets/icon/stacks.png"
import robot from "../../assets/robot.png"

/* =========== REDUX =========== */
import { aiToSpot, clearError, clearSuccessATS } from "../../redux/actions/userAction"




const Transfer = () => {
    const dispatch = useDispatch()
    const {register, formState:{errors}, handleSubmit} = useForm()
    const {user} = useSelector(state=>state.user)
    const {atsloading, atssuccess, error} = useSelector(state=>state.transection)

    const transfer = (data)=>{
        const userData = {
            amount : parseFloat(data.amount)
        }
        dispatch(aiToSpot(userData))
    }

    useEffect(()=>{
        if(atssuccess){
            toast(atssuccess)
        }
        dispatch(clearSuccessATS())
        if(error){
            toast(error)
        }
        dispatch(clearError())
    },[atssuccess, error])
  return (
    <div>
        <div className="container mx-auto pt-28 pb-12">
            <div className="flex justify-between items-center">
                <div className="flex ml-8">
                    {/* <img src={back} className="mr-4 h-5 w-5 cursor-pointer" onClick={()=>navigate(-1)}/> */}
                    <p className="text-xl text-[#CB087D] font-semibold">Transfer from AI</p>
                </div>
                <div className="flex items-center">
                    <img src={stack}/>
                    <p className="text-[#CB087D] font-semibold ml-3">Level : <span>0</span></p>
                </div>
            </div>
            <div className="mt-8 ml-9">
                <p className="font-medium text-md">AI Balance: <span>{user?.aiBalance.toFixed(2)}</span> USDT</p>
            </div>
            <div className="flex items-center justify-between ml-8">
                <div className="w-7/12">
                    <form onSubmit={handleSubmit(transfer)}>
                        <div>
                            <label className="font-semibold text-md">From Wallet</label>
                            <p className="border-[1px] border-[#CB0881] py-[7px] px-5 rounded-md mt-2">AI</p>
                        </div>
                        <div className="mt-5">
                            <label className="font-semibold text-md">To Wallet</label>
                            <p className="border-[1px] border-[#CB0881] py-[7px] px-5 rounded-md mt-2">Spot</p>

                        </div>
                        <div className="mt-5">
                            <label className="font-semibold text-md">Amount</label>
                            <input {...register("amount", {required:"This field is required"})} type="text" placeholder="Enter Amount" className="border-[1px] border-[#CB0881] py-2 px-5 rounded-md w-full mt-2"/>
                            <p className="text-red-500 text-xs">{errors.amount?.message}</p>
                        </div>
                        <div className="mt-5">
                            <button className="px-10 py-2 bg-[#CB0881] rounded-full text-white font-medium">{atsloading?"Loading...":"Transfer"}</button>
                        </div>
                    </form>
                </div>
                <div className="w-5/12 flex justify-center">
                    <img  src={robot}/>
                </div>
            </div>
        </div>
        <div className="border-t-2 border-[#CB0881] py-20 w-[100%] ">
            <div className="container mx-auto  ">
               <div className="w-8/12 flex justify-between ml-8">
                    <button className="py-2 w-4/12 bg-[#CB0881] rounded-lg text-white font-medium">Profit Ratio</button>
                    <button className="py-2 w-5/12 ml-4 bg-[#CB0881] rounded-lg text-white font-medium">Proposed Information</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Transfer