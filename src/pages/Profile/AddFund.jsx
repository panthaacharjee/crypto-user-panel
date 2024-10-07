import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

/* ========== IMAGE ========== */
import deposit from "../../assets/deposit.png"
import profile3 from "../../assets/pro.jpg"

/* ========== REDUX ============= */
import { allDeposit } from "../../redux/actions/userAction"

/* =========== COMPONENT ========== */
import DepositItem from "../../components/DepositItem"


const AddFund = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    const {deposits} = useSelector(state=>state.transection)

    
    const pending = deposits?.filter((val)=>val.status==="Pending")
    const paid = deposits?.filter((val)=>val.status==="Paid")
    const rejected = deposits?.filter((val)=>val.status ==="Reject")
    console.log(pending, paid, rejected)

    const [filter, setFilter] = useState("1")
    const handleFilter=(number)=>{
        setFilter(number)
    }

    let number = 0
    for(var i=0; i<pending?.length; i++){
        number += pending[i]?.amount
    }

    useEffect(()=>{
        dispatch(allDeposit())
    },[deposits])
  return (
    <div className="container mx-auto pt-28 pb-10 px-10">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                
                <img src={deposit}/>
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
        <div className="ml-5 mt-12">
            <Link to="/deposit" className="bg-[#CB0881] px-8 py-3 rounded-full text-xs text-white">Deposit Now</Link>
            <p className="text-md font-semibold mt-20 text-[#CB0881]">All History</p>
            <p className="text-sm mt-5">{deposits?.length} items found</p>
            <p className="text-sm font-medium mt-4"><span>Amount</span><span className="ml-3">USDT ${number.toFixed(2)}</span><span></span></p>
        </div>
        <div className="ml-5 mt-16 w-8/12">
            <div>
                <button onClick={()=>handleFilter("1")} style={filter==="1" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">Pending</button>
                <button onClick={()=>handleFilter("2")} style={filter==="2" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">Paid</button>
                <button onClick={()=>handleFilter("3")} style={filter==="3" ? {background:"#CB0881", color:"#fff"}: {background:"#F1F1F1"}} className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">Rejected</button>
            </div>
           
            {filter === "1"  && <div>
                {pending?.length > 0 ? <DepositItem array={pending}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
            </div>}
                </div>}
            {filter === "2"  && <div>
                {paid?.length > 0 ? <DepositItem array={paid}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
            </div>}
                </div>}
            {filter === "3"  && <div>
                {rejected?.length > 0 ?<DepositItem array={rejected}/>: <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
            </div>}
                </div>}
        </div>
    </div>
  )
}

export default AddFund