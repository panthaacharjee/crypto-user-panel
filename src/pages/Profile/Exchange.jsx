import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"



/* ============== Image =========== */
import profile3 from "../../assets/pro.jpg"
import token from "../../assets/icon/assignment_late.png"
import swap from "../../assets/icon/swap_horiz.png"

/* ============== Redux =============== */
import { clearError, clearSuccess, exchangeCoin } from "../../redux/actions/userAction"




const Exchange = () => {
    const dispatch = useDispatch()

  const {user} = useSelector(state=>state.user)
  const {loading, success, error} = useSelector(state=>state.exchange)

  const [first, setFirst] = useState(1000)
  const [second, setSecond]  = useState(10)

  const [firstCurrency, setFirstCurrency] = useState("BZIT")
  const [secondCurrency, setSecondCurrency] = useState("USDT")

  const handleFirst=(e)=>{
   if(e.target.value <= 0){
    setFirst(0)
    setSecond(0)
   }else{
    setFirst(parseFloat(e.target.value))
    setSecond(e.target.value / 100)
   }
  }

  const handleSecond=(e)=>{
    if(e.target.value <= 0){
        setFirst(0)
        setSecond(0)
    }else{
        setSecond(parseFloat(e.target.value))
        setFirst(e.target.value * 100)
    }
  }

  const tax = (first * 5)/100
  const exchange = ()=>{
    const userData = {
        tax : tax,
        first : first,
        second:second,
    }
    dispatch(exchangeCoin(userData))
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
  },[success, error])
  return (
    <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start ml-12">
                {/* <img src={back} className="mr-4 cursor-pointer" onClick={()=>navigate(-1)}/> */}
                <div>
                    <p className="font-semibold text-lg text-[#CB087D]">Exchange Token</p>
                    <div className="flex items-center mt-10">
                        <img src={token} className="mr-2"/>
                        <p>Minimum Exchange 1000 BZIT</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <img src={token} className="mr-2"/>
                        <p>Minimum Exchange 10 USDT </p>
                    </div>
                </div>
           </div>
           
           <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#CB087D]">
                    {user?.avatar ? <img src={user.avatar.url} alt="Profile Image"/>: <img src={profile3} alt="Profile Image"/>}
                </div>
                <div className="ml-10">
                    <p className="font-bold  text-xl">MD. Omar Faruk</p>
                    <p className="text-[#CB087D]">Coin Balance : <span>{user?.coinBalance} BZIT</span></p>
                </div>
            </div>
        </div>
        <div className="ml-12 w-9/12 flex items-center mt-10">
            <div className=" mr-5 w-6/12">
                    <p className="text-md font-semibold mb-2">Tokens to Exchange</p>
                    <label className="input input-bordered border-2 px-5 py-2 rounded-md border-[#CB0881] flex items-center gap-2">
                        <input type="text" className="grow w-5/12 focus:outline-none" placeholder="1000" value={first} onChange={(e)=>handleFirst(e)}/>
                        <p className="text-[#CB0881]">{firstCurrency}</p>
                    </label>
            </div> 
            <div className="mr-5 cursor-pointer">
                    <img src={swap}/>
            </div>
            <div className="w-6/12">
                    <p className="text-md font-semibold mb-2">Get Amount</p>
                    <label className="input input-bordered border-2 px-5 py-2 rounded-md border-[#CB0881] flex items-center gap-2">
                        <input type="text" className="grow focus:outline-none" placeholder="10" value={second} onChange={(e)=>handleSecond(e)} />
                        <p className="text-[#CB0881]">{secondCurrency}</p>
                    </label>
            </div>
        </div>
        <div className="ml-12 mt-10">
                <p className="text-md font-semibold mt-20 "><span className="text-[#CB0881] font-semibold">Exchange Charge :</span><span className="text-[#CB0881] font-semibold ml-5 mr-4">5%</span><span>add with BZIT</span></p>
                <p className="text-sm mt-5 font-medium text-md"><span className="text-[#CB0881] font-semibold">Charge Amount :</span><span className="text-[#CB0881] font-semibold ml-5 mr-4">{tax.toFixed(2)}</span> <span>BZIT</span></p>
                <p className="text-sm mt-5 font-medium text-md"><span className="text-[#CB0881] font-semibold">Final Payment: </span><span className="text-[#CB0881] font-semibold ml-5 mr-4">{(first + tax).toFixed(2)}</span> <span>BZIT</span></p>
                <p className="text-sm mt-5 font-medium"><span className="text-[#CB0881] font-semibold ">Get Paid: </span><span className="text-[#CB0881] font-semibold ml-5 mr-4">{second.toFixed(2)}</span> <span>USDT</span></p>
        </div>
        <div className="ml-12 mt-16 w-6/12">
                <div className="mt-5">
                    <button onClick={exchange} className="px-10 py-2 bg-[#CB0881] rounded-full text-white font-medium">{loading? "Loading.......":"Confirm Now"}</button>
                </div>
        </div>
    </div>
  )
}

export default Exchange