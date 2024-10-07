import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {toast} from "react-toastify"

/* ========== IMAGE ========= */
import robot from "../../assets/robot.png"
import stack from "../../assets/icon/stacks.png"
import mode from "../../assets/icon/mode_off_on.png"

/* ============ COMPONENT ============= */
import { clearError, clearSuccess, tradeStatus } from "../../redux/actions/userAction"

const Trade = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state=>state.user)
    const {loading, success, error} = useSelector(state=>state.trade)

    const handleTrade =()=>{
        dispatch(tradeStatus())
    }

    const date = new Date(Date.now())
    const dateNow  = date.getDay()

    useEffect(()=>{
        if(success){
            toast(success)
        }
        dispatch(clearSuccess())
        if(error){
            toast(error)
        }
        dispatch(clearError())
    },[success, error])
  return (
    <div>
        <div className="container mx-auto pt-28 pb-12">
            <div className="flex justify-between items-center">
                <p className="text-xl text-[#CB087D] font-semibold">AI Smart Trade</p>
                <div className="flex items-center">
                    <img src={stack}/>
                    <p className="text-[#CB087D] font-semibold ml-3">Level : <span>0</span></p>
                </div>
            </div>
            <div className="mt-8">
                <p className="font-medium text-md">AI Balance: <span>{user?.aiBalance.toFixed(2)}</span> USDT</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-7/12">
                    <div className="w-full">
                        <button onClick={()=>navigate("/trade/transfer")} className="py-2 w-5/12 bg-[#CB0881] rounded-lg text-white font-medium">Transfer</button>
                        <button onClick={()=>navigate("/trade/history")} className="py-2 w-5/12 ml-8 bg-[#CB0881] rounded-lg text-white font-medium">History</button>
                    </div>
                    <div className="bg-[#FCEEF8] min-h-44 flex justify-center items-center rounded-lg mt-20">
                        <div>
                            <div className="flex">
                                <p className="text-2xl font-bold text-[#CB0881]">Current Status</p>
                                <img src={mode} className="h-8 w-8 ml-4"/>
                            </div>
                            
                            {dateNow === 0 || dateNow ===7 && <div>
                                {(user?.tradeStatus === false) ? <button onClick={handleTrade} className="mx-auto bg-[#f1f1f1] px-4 py-1 rounded-md block mt-4 font-medium text-[#CB0881]">{loading ?"Loading....": "Click to turn on"}</button>: <p className="mx-auto bg-[#f1f1f1] px-4 py-1 text-center rounded-md block mt-4 font-medium text-[#CB0881]">BOT RUNNING.........</p>}
                            </div> }
                        </div>
                    </div>
                </div>
                <div className="w-5/12 flex justify-center">
                    <img  src={robot}/>
                </div>
            </div>
        </div>
        <div className="flex ml-8">
            <div>
                <p className="mr-5 text-2xl mt-2">⚙️</p>
            </div>
            <div>
                <p className=" text-lg">SUNDAY IS OFF DAY</p>
                <p className="text-xs mb-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. amet consectetur adipisicing elit.</p>
            </div>
        </div>
        <div className="border-t-2 border-[#CB0881] py-20 w-[100%] ">
            <div className="container mx-auto ">
               <div className="w-8/12 flex justify-between">
                    <button className="py-2 w-4/12 bg-[#CB0881] rounded-lg text-white font-medium">Profit Ratio</button>
                    <button className="py-2 w-5/12 ml-4 bg-[#CB0881] rounded-lg text-white font-medium">Proposed Information</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Trade