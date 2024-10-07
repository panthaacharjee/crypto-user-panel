import React, { useEffect } from "react"
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"

/* ======== IMAGE ========= */
import roadmap from "../../assets/roadmap.png"
import p2p from "../../assets/icon/p2p.png";

/* ========== COMPONENT ============ */
import WallatNav from "../../components/WallatNav";
import { clearError, clearSuccessST, spotTransfer } from "../../redux/actions/userAction";


const WalletTransfer = () => {
  const dispatch = useDispatch()
  const {stloading, stsuccess, error} = useSelector(state=>state.transection)
  const {register, formState:{errors}, handleSubmit} = useForm()
  const handleTransfer = (data)=>{
    const userData = {
      wallet : data.wallet,
      amount : parseInt(data.amount)
    }
    dispatch(spotTransfer(userData))
  }
  
  useEffect(()=>{
    if(stsuccess){
      toast(stsuccess)
    }
    dispatch(clearSuccessST())
    if(error){
      toast(error)
    }
    clearError()
  },[stsuccess, error])
  return (
  <>
    <div className="pt-28 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
      <WallatNav />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-8/12">
          <form onSubmit={handleSubmit(handleTransfer)} className="w-full mt-10">
            <p className="font-semibold text-[#CB0881] text-lg md:text-xl">Transfer from Spot</p>
            <div className="mt-5">
              <label className="font-semibold text-sm sm:text-base">From Wallet</label>
              <select {...register("wallet", {required:"This field is required"})} className="border-[1px] border-[#CB0881] py-2 px-4 rounded-md w-full mt-2 text-sm sm:text-base">
                <option>AI</option>
                <option>Funding</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="font-semibold text-sm sm:text-base">Amount</label>
              <input
                type="text"
                placeholder="Enter Amount"
                className="border-[1px] border-[#CB0881] py-2 px-4 rounded-md w-full mt-2 text-sm sm:text-base"
                {...register("amount", {required:"This field is required"})}
              />
            </div>
            <p className="text-xs text-red-500">{errors.amount?.message}</p>
            <div>
              <button className="px-6 py-2 bg-[#CB0881] rounded-full text-white font-medium mt-10 text-sm sm:text-base">
                {stloading? "Loading...": "Transfer"}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-4/12 mt-8 lg:mt-0">
          <div className="bg-[#FCEEF8] p-4 sm:p-5 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-md sm:text-lg font-medium text-[#CB0881]">P2P Trading</p>
              <img src={p2p} alt="P2P Trading" className="w-12 h-12" />
            </div>
            <p className="mt-3 text-sm sm:text-base">
              Engage in peer-to-peer (P2P) trading on the TB20 network by connecting directly with other users to buy and sell assets without intermediaries.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='border-t-2 border-[#CB0881] py-4'>
        <div className='container mx-auto px-10'>
            <p className='text-xl text-[#CB0881] font-bold'>Orion Trading Roadmap</p>
            <div className="flex justify-center">
              <img src={roadmap} style={{height:"200px"}} className='ml-10 mt-8'/>
            </div>
        </div> 
    </div>  
  </>
  );
};

export default WalletTransfer;
