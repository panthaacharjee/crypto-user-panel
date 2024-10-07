import { Link, useNavigate } from "react-router-dom"
import {QRCodeSVG} from 'qrcode.react';
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useForm} from "react-hook-form"
import { toast } from "react-toastify";


/* ========= IMAGE ============ */
import profile3 from "../../assets/pro.jpg"

/* ========= REDUX ============ */
import { clearError, clearSuccess, userDeposit } from "../../redux/actions/userAction";




const Deposit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {success, error, loading} = useSelector(state=>state.transection)
    const {user} = useSelector(state=>state.user)
    const {register, formState:{errors}, handleSubmit} = useForm()

    const [copied, setCopied] = useState(false)
    const depositLink = `hkhusfhfi./orangetour.com/review/explore`

   

    const [trxProof, setTrxProof] = useState()
    const [trxError, setTrxError] = useState(false)

    const chooseProof =(e)=>{
        if (e.target.name === "deposit") {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.readyState === 2) {
                setTrxProof(reader.result);
               }
            };
            reader.readAsDataURL(e.target.files[0]);
          }
    }
    const handleDeposit = (data)=>{
        if(trxProof === undefined){
            setTrxError(true)
        }else{
            setTrxError(false)
            const userData = {
                trxId: data.id,
                amount:data.amount,
                proof:trxProof
            }
            dispatch(userDeposit(userData))
        }
    }
    console.log(user)

    useEffect(()=>{
        if(success){
            toast(success)
        }
        if(error){
            toast(error)
        }
        dispatch(clearSuccess())
        dispatch(clearError())
    },[success, error])

  return (
    <div className="container mx-auto pt-28 pb-12 px-6">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                
                <div className="ml-4">
                    <p className="font-semibold text-lg text-[#CB087D]">Balance Request</p>
                    <QRCodeSVG value={``} className="mt-4"/>
                </div>
           </div>
           <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#CB087D]">
                    {user?.avatar ? <img src={user?.avatar.url} alt="Profile Image"/>: <img src={profile3} alt="Profile Image"/>}
                </div>
                <div className="ml-10">
                    <p className="font-bold  text-xl">{user?.name}</p>
                    <p className="text-[#CB087D]">Beginner</p>
                </div>
            </div>
        </div>
        <div className="flex ml-4  mt-8">
            <p className="border-[1px] border-[#CB087D] rounded-md px-5 py-2">{depositLink}</p>
            <CopyToClipboard text={depositLink}><button onClick={()=>setCopied(true)} className="bg-[#CB087D] px-5 py-1 rounded-md ml-5 text-white   ">{copied ? "Copied" : "Copy"}</button></CopyToClipboard>
        </div>
        <div className=" ml-5 mt-10">
            <Link to="/deposit" className="bg-[#CB0881] px-8 py-3 rounded-full text-xs text-white">Deposit Now</Link>
            <p className="text-md font-semibold mt-20 ">Network: TRC 20</p>
            <p className="text-sm mt-5 font-medium">Currency: USDT</p>
            <p className="text-sm font-semibold mt-4 text-[#CB0881] ">Note: Only TRC 20 Wallet Allowed</p>
        </div>
        <div className="ml-5 mt-16 w-6/12">
            <form onSubmit={handleSubmit(handleDeposit)} >
                <div className="flex justify-around">
                    <div className="mr-2">
                        <label className="text-md font-semibold">Amount</label>
                        <input {...register("amount", {required:"This field is required"})} className="border-[1px] border-[#CB0881] px-4 py-[6.9px] rounded-md mt-1" type="text" placeholder="Type Amount"/>
                        <p className="text-red-500 h-10 text-xs">{errors.amount?.message}</p>
                    </div>
                    <div className="mr-2">
                        <label className="text-md font-semibold">Transaction ID</label>
                        <input {...register("id", {required:"This field is required"})} onClick={(e)=>setId(e.target.value)} className="border-[1px] border-[#CB0881] px-4 py-[6.9px] rounded-md mt-1" type="text" placeholder="Type Your TxID"/>
                        <p className="text-red-500 h-10 text-xs">{errors.id?.message}</p>
                    </div>
                    <div className="mr-2">
                        <label className="text-md font-semibold">Transaction Proof</label>
                        <input onChange={chooseProof} className="border-[1px] border-[#CB0881] px-4 py-1 rounded-md mt-1" name="deposit" type="file" placeholder="Type Your TxID"/>
                        <p className="text-red-500 h-10 text-xs">{trxError && "This field is required"}</p>
                    </div>
                </div>
                
           
                <div className="mt-5">
                    <button className="px-10 py-2 bg-[#CB0881] rounded-full text-white font-medium">{loading?"Loading....":"Submit Request"}</button>
                    <button className="px-10 py-2 bg-[#FCEEF8] rounded-full text-[#CB0881] font-semibold ml-5" onClick={()=>navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Deposit