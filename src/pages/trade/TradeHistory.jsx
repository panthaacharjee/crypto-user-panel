import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"


/* ============ IMAGE ============== */
import profile3 from "../../assets/pro.jpg"
import plus from "../../assets/icon/plus.png"

/* ========== COMPONENT ============ */
import History from "../../components/History"

/* ============== REDUX =========== */
import { aiHistory, teamBonus } from "../../redux/actions/userAction"


const TradeHistory = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    const {aiIn, aiOut, bonus} = useSelector(state=>state.transection)
    console.log(bonus)

    const [filter, setFilter] = useState("1")
    const handleFilter=(number)=>{
        setFilter(number)
    }

    useEffect(()=>{
        dispatch(aiHistory())
        dispatch(teamBonus())
    },[aiIn, aiOut, bonus])
  return (
    <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start ml-8">
                {/* <img src={back} className="mr-4  h-4 w-4 cursor-pointer" onClick={()=>navigate(-1)}/> */}
                <div>
                    <div>
                        <button onClick={()=>handleFilter("1")} style={filter==="1" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">In</button>
                        <button onClick={()=>handleFilter("2")} style={filter==="2" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">Out</button>
                        <button onClick={()=>handleFilter("3")} style={filter==="3" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">Team Bonus</button>
                    </div>
                    <p className="text-[#CB0881] font-semibold mt-5">Balance : $ {user?.aiBalance.toFixed(2)} USDT</p>
                </div>
           </div>
           <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#CB087D]">
                {user?.avatar ? <img src={user.avatar.url} alt="Profile Image"/>: <img src={profile3} alt="Profile Image"/>}
                </div>
                <div className="ml-10">
                    <p className="font-bold  text-xl">{user?.name}</p>
                    <p className="text-[#CB087D]">Beginner</p>
                </div>
            </div>
        </div>
        {filter === "1"  && <div className='w-8/12 ml-8'>
                    {
                        aiIn?.length > 0 ? <History array={aiIn}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                            </div>
                    }
            </div>}
        {filter === "2"  && <div className='w-8/12 ml-8'>
                    {
                        aiOut?.length > 0 ? <History array={aiOut}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                        <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
                            </div>
                    }
        </div>}
        {filter === "3" && <div>
            <input type="date" className="bg-[#FCEEF8] border-[#CB0881] border-[1px] py-2 px-5 rounded-lg w-5/12 ml-8 mt-4"/> 
            <div className="flex flex-wrap ml-8 mt-10">
            { bonus?.map((val, ind)=>{

                const date = new Date(val.createdAt)
                let day = date.getDate()
                let month = date.getMonth()+1
                let year = date.getFullYear() 
                const newDate = `${day}/${month}/${year}`



                const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const formattedTime = formatter.format(date);

                return <div className="w-6/12 text-black" key={ind} >
                <div className="w-[95%] bg-[#FCEEF8] mb-8 px-6 py-5  rounded-md">
                   <div className="flex items-center justify-around font-semibold text-sm">
                        <div>
                            <p>{val._id}</p>
                        </div>
                        <div className="flex items-center">
                            <img src={plus} className="mr-2 mt-[-3px]"/>
                            <p>{val.amount.toFixed(2)} USDT</p>
                        </div>
                        <div className="">
                            <p>{newDate}</p>
                        </div>
                        <div className="">
                            <p>{formattedTime}</p>
                        </div>
                   </div>
                   <p className="text-center mt-5 font-semibold text-sm">{val.title}</p>
                   <p  className="text-center mt-3 font-semibold text-sm">{val.description}</p>
                </div>
            </div>
            })}

            {bonus?.length <=0 && <p>Not Found (404)</p>}
            
        </div>
            </div>}
       
    </div>
  )
}

export default TradeHistory