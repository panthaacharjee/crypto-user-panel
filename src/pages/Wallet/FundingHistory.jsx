import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


/* ========== IMAGE ========= */
import roadmap from "../../assets/roadmap.png"

/* ========== COMPONENT ========= */
import WallatNav from "../../components/WallatNav";
import History from "../../components/History"

/* ========== REDUX =========== */
import { fundingHistory, withdrawHistory } from '../../redux/actions/userAction';
import WithdrawItem from '../../components/WithdrawItem';

const FundingHistory = () => {
    const dispatch = useDispatch()
    const {fundIn, fundOut, withdraw} = useSelector(state=>state.transection)
   
    const [filter, setFilter] = useState("1")

    const handleFilter=(number)=>{
        setFilter(number)
    }

    useEffect(()=>{
        dispatch(fundingHistory())
        dispatch(withdrawHistory())
    },[fundIn, fundOut])

    return (
        <>
            <div className="container mx-auto pt-28 pb-12 px-4 sm:px-6 md:px-10">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div className="flex items-start">
                        {/* <img 
                            src={back} 
                            className="mr-4 h-4 w-4 cursor-pointer" 
                            onClick={() => navigate(-1)} 
                            alt="Back"
                        /> */}
                        <div>
                            <WallatNav />
                            <p className="text-[#CB0881] font-semibold mt-4 sm:mt-10 text-xl sm:text-2xl">Funding History</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-6 sm:mt-10 ml-0">
                    <button onClick={()=>handleFilter("1")} style={filter==="1" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="px-4 py-2 sm:px-5 sm:py-2 mr-4 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md text-xs sm:text-sm">
                        In
                    </button>
                    <button onClick={()=>handleFilter("2")} style={filter==="2" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="px-4 py-2 sm:px-5 sm:py-2 mr-4 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md text-xs sm:text-sm">
                        Out
                    </button>
                    <button onClick={()=>handleFilter("3")} style={filter==="3" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="px-4 py-2 sm:px-5 sm:py-2 mr-4 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md text-xs sm:text-sm">
                        Withdraw
                    </button>
                </div>

                {filter === "1"  && <div className='w-8/12'>
                    {
                        fundIn?.length > 0 ? <History array={fundIn}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                            </div>
                    }
                </div>}
            {filter === "2"  && <div className='w-8/12'>
                    {
                        fundOut?.length > 0 ? <History array={fundOut}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                        </div>
                    }
                    </div>
            }

            {filter === "3"  && <div className='w-8/12'>
                    {
                        withdraw?.length > 0 ? <WithdrawItem array={withdraw}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                        </div>
                    }
                    </div>
            }
            
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

export default FundingHistory;
