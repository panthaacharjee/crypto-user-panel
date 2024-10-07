import axios from "axios";

const AxiosPublic =()=>{
    const axiosPublic = axios.create({
        baseURL : 'https://localhost:4000'
    })
    return axiosPublic
}

export default AxiosPublic