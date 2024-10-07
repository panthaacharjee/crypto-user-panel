import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from "react-hook-form"

/* ============= Component ============== */
import WallatNav from '../../components/WallatNav';
import { toast } from 'react-toastify';
import { clearError, clearSuccessOTS, otsHistory, userOTSTransfer } from '../../redux/actions/userAction';
import TransferHistory from '../../components/TransferHistory';



const Ots = () => {
    const dispatch = useDispatch()
    const {register, formState:{errors}, handleSubmit} = useForm()

    const [modal, setModal] = useState(false);
    const {user} = useSelector(state=>state.user)
    const {oloading, osuccess, error, sent, recive}= useSelector(state=>state.transection)
    
    const total = sent?.length + recive?.length;

    const handelModal = () => {
        setModal(!modal);
    };

    const [filter, setFilter] = useState("1")
    const handleFilter=(number)=>{
        setFilter(number)
    }

    const handleTransfer = (data)=>{
        const userData = {
            amount: parseFloat(data.amount),
            charge: 0,
            reciver: data.username
        }
        dispatch(userOTSTransfer(userData))
    }

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        if(osuccess){
            toast(osuccess)
        }
        dispatch(clearSuccessOTS())
        if(error){
            toast(error)
        }
        dispatch(clearError())

        dispatch(otsHistory())
    }, [modal, error, osuccess, sent, recive]);

    return (
        <div className='pt-28 mx-auto container px-4'>
            <WallatNav />
            <div className='m-10'>
                <h1 className='text-primary text-2xl font-bold p-2'>Sent History</h1>
                <h1 className='p-2 font-bold'>{total ? total :"0"} item found</h1>
                <h1 className='p-2 font-bold'>Amount: {user?.fundingBalance.toFixed(2)} USDT</h1>
                <button onClick={handelModal} className='px-6 w-full sm:w-1/3 py-3 mt-4 rounded-xl bg-primary bg-[#CB0881] text-white'>
                    Transfer
                </button>
            </div>
            <div className="flex flex-row m-10">
                <button  onClick={()=>handleFilter("1")} style={filter==="1" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="px-5 py-2 mr-8 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md">
                    Sent
                </button>
                <button onClick={()=>handleFilter("2")} style={filter==="2" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="px-5 py-2 mr-8 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md">
                    Recive
                </button>
            </div>
            <div className='m-10 w-10/12'>
                {filter === "1"  && <div>
                    {sent?.length > 0 ? <TransferHistory user={"Reciver"} array={sent}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                    </div>}
                    </div>}
                {filter === "2"  && <div>
                    {recive?.length > 0 ? <TransferHistory user={"Sender"} array={recive}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                    </div>}
                </div>}
            </div>
            
            {modal && (
                <div id="popup-modal" tabIndex="-1" className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                    <div className="relative p-4 w-full max-w-md h-auto max-h-full overflow-auto">
                        <form onSubmit={handleSubmit(handleTransfer)} className="relative text-[#eaeeee] rounded-lg shadow bg-gray-700">
                            <button onClick={handelModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 ">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <div>
                                    <h1 className='text-primary text-xl text-center'>Balance Transfer</h1>
                                    <h1 className='text-center'>Current Balance USDT {user?.fundingBalance.toFixed(2)}</h1>
                                    <div className='grid gap-2 my-5'>
                                        <p className='text-start'>Transfer to</p>
                                        <input {...register("username", {required:"This field is required"})} className="appearance-none border rounded py-2 focus:shadow-outline px-3 text-black" id="amount" type="text" placeholder="User Name" />
                                        <p className='text-red-500 text-xs'>{errors.username?.message}</p>
                                        <p className='text-start mt-2'>Amount</p>
                                        <input {...register("amount", {required:"This field is required"})} className=" appearance-none border rounded py-2 focus:shadow-outline px-3 text-black" id="amount" type="text" placeholder="Enter amount" />
                                        <p className='text-red-500 text-xs'>{errors.amount?.message}</p>
                                    </div>
                                    <p className='text-sm pb-5'>Service Charge 0.00 USDT</p>
                                </div>
                                <button   className="text-white bg-primary rounded-xl bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    {oloading ? "Loading...." : "Yes, I'm sure"}
                                </button>
                                <button onClick={handelModal} data-modal-hide="popup-modal" type="button" className="ml-3 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    No, cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ots;
