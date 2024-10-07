import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


/* ========== IMAGE ========= */
import roadmap from "../../assets/roadmap.png"
import plus from "../../assets/icon/plus.png";

/* ========== COMPONENT ========= */
import WallatNav from "../../components/WallatNav";
import History from "../../components/History"

/* ========== REDUX =========== */
import { spotHistory } from '../../redux/actions/userAction';

const SpotHistory = () => {
    const dispatch = useDispatch()
    const {spotIn, spotOut} = useSelector(state=>state.transection)
   
    const [filter, setFilter] = useState("1")

    const handleFilter=(number)=>{
        setFilter(number)
    }

    useEffect(()=>{
        dispatch(spotHistory())
    },[spotOut, spotIn])

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
                            <p className="text-[#CB0881] font-semibold mt-4 sm:mt-10 text-xl sm:text-2xl">Spot History</p>
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
                </div>

                {filter === "1"  && <div className='w-8/12'>
                    {
                        spotIn?.length > 0 ? <History array={spotIn}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                            </div>
                    }
                </div>}
            {filter === "2"  && <div className='w-8/12'>
                    {
                        spotOut?.length > 0 ? <History array={spotOut}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                        </div>
                    }
                    </div>
            }
                {/* <div className="flex flex-wrap mt-6 sm:mt-10">
                    {data.map((val, ind) => (
                        <div className="w-full sm:w-6/12 lg:w-4/12 text-black" key={ind}>
                            <div className="bg-[#FCEEF8] w-11/12  mb-6 sm:mb-8 px-4 sm:px-6 py-4 sm:py-5 rounded-md shadow-sm">
                                <div className="flex flex-col sm:flex-row items-center justify-between font-semibold text-xs sm:text-sm">
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="truncate">{val.id}</p>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center sm:justify-start">
                                        <img src={plus} className="mr-2 h-4 w-4" alt="Plus" />
                                        <p>{val.stack}</p>
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <p>{val.date}</p>
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <p>{val.time}</p>
                                    </div>
                                </div>
                                <p className="text-center mt-4 sm:mt-5 font-semibold text-xs sm:text-sm">{val.bonus}</p>
                                <p className="text-center mt-2 sm:mt-3 font-semibold text-xs sm:text-sm">{val.type}</p>
                            </div>
                        </div>
                    ))}
                </div> */}
            
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

export default SpotHistory;
