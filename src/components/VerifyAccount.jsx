import close from "../assets/icon/close.png"
import  selfie from "../assets/selfie.png"
import back from "../assets/nid-back.png"
import front from "../assets/nid-font.png"
import {useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import { clearError, clearSuccess, userVerification } from "../redux/actions/userAction"
import { toast } from "react-toastify"

const VerifyAccount = ({setVerifyAccount}) => {
    const dispatch = useDispatch()
    const {loading, success, error} = useSelector(state=>state.verification)
    const [type, setType] = useState("NID")
    const [dob, setDob] = useState()
    const [document, setDocument] = useState()

  const [font, setFont] = useState();
  const [backP, setBackP] = useState();
  const [selfieP, setSelfieP] = useState();


  const chooseAvatar = (e) => {
    if (e.target.name === "font") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setFont(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    if (e.target.name === "back") {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.readyState === 2) {
            setBackP(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    if (e.target.name === "selfie") {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.readyState === 2) {
            setSelfieP(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
  };
  const handleVerify = ()=>{
    if(!font){
        toast("Font picture is required")
    }else if(!backP){
        toast("Back picture is required")
    }else if(!selfieP){
        toast("Selfie is required")
    }else if(!document){
        toast("Document Number is required")
    }else if(!dob){
        toast("Date of Birth is required")
    }else{
        const userData = {
            font:font,
            back:backP,
            selfie:selfieP,
            type:type,
            dob:dob,
            document:document,
        }
        dispatch(userVerification(userData))
    }
    // console.log(userData)
  }
  useEffect(()=>{
    if(success){
        toast(success)
    }
    dispatch(clearSuccess())
    if(error){
        toast(error)
    }
    clearError()
  },[success, error])
  return (
    <div className="fixed top-0 left-0  z-50 h-[100%] w-[100%] bg-background-opacity flex justify-center items-center">
        <div className="bg-white w-11/12 lg:w-6/12 px-10 py-10">
            <div className="flex justify-between">
                <div className="flex items-center  ">
                    <p className="text-[#CB084B] text-md font-medium">Verify Your Account </p>
                </div>
                <button onClick={()=>setVerifyAccount(false)}><img src={close}/></button>
            </div>
            <form className="flex mt-5 items-center">
                <div className="mr-5 cursor-pointer">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        name="font"
                        onChange={chooseAvatar}
                    />
                    <label htmlFor="file-upload">
                        <img src={front}/>
                    </label>
                </div>
                <div className="mr-5 cursor-pointer">
                    <input
                        type="file"
                        id="file-upload2"
                        className="hidden"
                        name="back"
                        onChange={chooseAvatar}
                    />
                    <label htmlFor="file-upload2">
                        <img src={back}/>
                    </label>
                </div>
                <div className="cursor-pointer">
                    <input
                        type="file"
                        id="file-upload3"
                        className="hidden"
                        name="selfie"
                        onChange={chooseAvatar}
                    />
                    <label htmlFor="file-upload3">
                        <img src={selfie}/>
                    </label>
                </div>
            </form>
            <div className="w-[85%] mt-10">
                <div> 
                    <label className="font-semibold text-sm">Document Type</label>
                    {/* <input /> */}
                    <select onChange={(e)=>setType(e.target.value)} className="border-[1px] border-[#CB084B] text-[#CB084B]  w-full py-1 px-4 rounded-md mt-2">
                        <option className=" text-[#CB084B] text-semibold" value={"NID"}>NID</option>
                    </select>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Document Number</label>
                    <input onChange={(e)=>setDocument(e.target.value)} type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2"> 
                    <label className="font-semibold text-sm">Date of Birth</label>
                    {/* <input /> */}
                    <input onChange={(e)=>setDob(e.target.value)} type="date" className="border-[1px] border-[#CB084B] text-[#CB084B]  w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="w-full">
                    <button onClick={handleVerify} className="bg-[#CB084B] block px-8 py-2 rounded-full text-white text-xs mt-4">{loading ?"Loading...":"Submit"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyAccount