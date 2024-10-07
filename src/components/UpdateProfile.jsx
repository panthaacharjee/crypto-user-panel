import { useEffect, useState } from "react"
import close from "../assets/icon/close.png"
import password from "../assets/icon/password.png"
import { useDispatch, useSelector } from "react-redux"
import { clearError, clearSuccess, updateProfile } from "../redux/actions/userAction"
import { toast } from "react-toastify"

const UpdateProfile = ({setProfileModel}) => {
    const dispatch = useDispatch()
    const {loading, success, error} = useSelector(state=>state.update)
    const {user}  =  useSelector(state=>state.user)
    console.log(user)

    const [email, setEmail] = useState(user?.email)
    const [name, setName] = useState(user?.name)
    const [gender, setGender] = useState("MALE")
    const [city, setCity] = useState(user?.city)
    const [address, setAddress] = useState(user?.address)
    const [phone, setPhone] = useState(user?.phone)
    
    const handleUpdate = ()=>{
       if(!email){
            toast("Email is required!")
       }else if(!name){
        toast("Name is required!")
       }else if(!city){
        toast("City is required!")
       }else if(!address){
        toast("Address is required!")
       }else if(!phone){
        toast("Phone number is required!")
       }else{
        const userData = {
            email,
            name, 
            gender,
            city,
            address, 
            phone
        }
        dispatch(updateProfile(userData,))
       }
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
    <div className="fixed top-0 left-0 h-[100%] w-[100%] bg-background-opacity flex justify-center items-center overflow-y-auto py-10 z-50">
        <div className="bg-white w-11/12 lg:w-5/12 px-10 py-10 mt-20">
            <div className="flex justify-between">
                <div className="flex items-center bg-[#CB084B] px-5 py-2 rounded-md">
                    <p className="text-white text-sm  font-medium">Update Information </p>
                    <img src={password} className="ml-5"/>
                </div>
                <button onClick={()=>setProfileModel(false)}><img src={close}/></button>
            </div>
            <div className="w-[95%] mt-10">
                <div> 
                    <label className="font-semibold text-sm">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Real Name</label>
                    <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Gender</label>
                    <select onChange={(e)=>setGender(e.target.value)} className="border-[1px] border-[#CB084B] text-[#CB084B]  w-full py-1 px-4 rounded-md mt-2">
                        <option className=" text-[#CB084B] text-semibold" value="MALE">MALE</option>
                        <option className=" text-[#CB084B] text-semibold" value="FEMALE">FEMALE</option>
                        <option className=" text-[#CB084B] text-semibold" value="OTHERS">OTHERS</option>
                    </select>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">City</label>
                    <input onChange={(e)=>setCity(e.target.value)} value={city} type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Phone Number</label>
                    <input onChange={(e)=>setPhone(e.target.value)} value={phone} type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Address</label>
                    <input onChange={(e)=>setAddress(e.target.value)} value={address} type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="w-full">
                    <button onClick={handleUpdate} className="bg-[#CB084B] mx-auto block px-8 py-2 rounded-full text-white text-xs mt-4">{loading?"Loading...":"Update"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile