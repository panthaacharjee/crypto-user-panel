import { useEffect } from 'react';
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"

/* =========== IMAGE ============ */
import roadmap from "../../assets/roadmap.png"
import WallatNav from '../../components/WallatNav';

/* ========== REDUX ============ */
import { clearError, clearSuccessFTS, fundingToSpot } from '../../redux/actions/userAction';

const FundTransfer = () => {
    const dispatch = useDispatch()
    const {register, formState:{errors}, handleSubmit} = useForm()
    const {ftsloading, ftssuccess, error} = useSelector(state=>state.transection)

    const handleTransfer=(data)=>{
        const userData = {
            amount:parseInt(data.amount)
        }
        dispatch(fundingToSpot(userData))
        // console.log(userData)
    }
    useEffect(()=>{
        if(ftssuccess){
            toast(ftssuccess)
        }
        dispatch(clearSuccessFTS())
        if(error){
            toast(error)
        }
        dispatch(clearError())
    },[ftssuccess, error])
    return (
        <>
            <div className='pt-28 container mx-auto px-4 mb-5'>
                <WallatNav/>
                <div className='mt-12'>
                    <p className='text-xl text-[#CB0881] font-bold'>Transfer to Spot</p>
                    <form className='w-6/12 ' onSubmit={handleSubmit(handleTransfer)}>
                        <div className='mt-4 '>
                            <label className='font-semibold text-md'>From Wallet</label>
                            <p className='border-[1px] border-[#CB0881] py-2 px-4 rounded-md w-full mt-2 text-sm sm:text-base'>Funding</p>
                        </div>
                        <div className='mt-4 '>
                            <label className='font-semibold text-md'>From Wallet</label>
                            <p className='border-[1px] border-[#CB0881] py-2 px-4 rounded-md w-full mt-2 text-sm sm:text-base'>Spot</p>
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
                        <p className='text-red-500 text-xs'>{errors.amount?.message}</p>
                        <div>
                            <button className="px-6 py-2 bg-[#CB0881] rounded-full text-white font-medium mt-10 text-sm sm:text-base">
                                {ftsloading? "Loading...": "Transfer"}
                            </button>
                        </div>
                    </form>
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

export default FundTransfer;
