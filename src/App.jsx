import { Route, Routes } from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

/* =========== Components ============== */
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import AddFund from "./pages/Profile/AddFund"
import Deposit from "./pages/Profile/Deposit";
import Wallet from "./pages/Wallet/Wallet"
import WalletTransfer from "./pages/Wallet/WalletTransfer"
import SpotHistroy from "./pages/Wallet/SpotHistory"
import Funding from "./pages/Wallet/Funding"
import FundTransfer from "./pages/Wallet/FundTransfer"
import FundWithdraw from "./pages/Wallet/FundWithdraw"
import Ots from "./pages/Wallet/Ots"
import Rewards from "./pages/Wallet/Rewards"
import Trade from "./pages/trade/Trade"
import TradeHistory from "./pages/trade/TradeHistory"
import TradeTransfer from "./pages/trade/Transfer"
import Exchange from "./pages/Profile/Exchange"
import Reffer from "./pages/Reffer";
import FundingHistory from "./pages/Wallet/FundingHistory";
import Affiliate from "./pages/affiliate/Affiliate";


/* =============== Redux ================ */
import { loadUser } from "./redux/actions/userAction";




function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadUser())
  },[])
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/r/:token" element={<Reffer/>}/>
        <Route path="/forgot/password" element={<Forgot/>}/>
        <Route path="/password/reset/:token" element={<Reset/>}/>
        <Route path="/" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/add-fund" element={<ProtectedRoute><AddFund/></ProtectedRoute>}/>
        <Route path="/deposit" element={<ProtectedRoute><Deposit/></ProtectedRoute>}/>
        <Route path="/wallet" element={<ProtectedRoute><Wallet/></ProtectedRoute>}/>
        <Route path="/wallet/transfer" element={<ProtectedRoute><WalletTransfer/></ProtectedRoute>}/>
        <Route path="/wallet/spot/history" element={<ProtectedRoute><SpotHistroy/></ProtectedRoute>}/>
        <Route path="/wallet/funding" element={<ProtectedRoute><Funding/></ProtectedRoute>}/>
        <Route path="/fund/transfer" element={<ProtectedRoute><FundTransfer/></ProtectedRoute>}/>
        <Route path="/wallet/funding-history" element={<ProtectedRoute><FundingHistory/></ProtectedRoute>}/>
        <Route path="/wallet/withdraw" element={<ProtectedRoute><FundWithdraw/></ProtectedRoute>}/>
        <Route path="/wallet/ots" element={<ProtectedRoute><Ots/></ProtectedRoute>}/>
        <Route path="/wallet/rewards" element={<ProtectedRoute><Rewards/></ProtectedRoute>}/>
        <Route path="/trade" element={<ProtectedRoute><Trade/></ProtectedRoute>}/>
        <Route path="/trade/history" element={<ProtectedRoute><TradeHistory/></ProtectedRoute>}/>
        <Route path="/trade/transfer" element={<ProtectedRoute><TradeTransfer/></ProtectedRoute>}/>
        <Route path="/affilate" element={<ProtectedRoute><Affiliate/></ProtectedRoute>}/>
        <Route path="/exchange" element={<ProtectedRoute><Exchange/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
