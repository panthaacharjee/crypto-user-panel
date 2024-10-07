import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* ======== COMPONENT ======== */
import WallatNav from "../../components/WallatNav";

/* ========= IMAGE =========== */
import p2p from "../../assets/icon/p2p.png"
import roadmap from '../../assets/roadmap.png'

const Wallet = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user)
    return (
        <>
            <div>
                <div className="container mx-auto pt-28 pb-12 px-10">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-8/12">
                            <WallatNav />
                            <p className="font-medium mt-10">{user?.spotBalance.toFixed(2)} USDT</p>
                            <button 
                                onClick={() => navigate("/wallet/transfer")} 
                                className="bg-[#CB0881] px-20 py-2 mr-8 rounded-md text-white mt-5 md:mt-20"
                            >
                                Transfer
                            </button>
                            <button 
                                onClick={() => navigate("/wallet/spot/history")} 
                                className="bg-[#CB0881] px-20 py-2 mr-8 rounded-md text-white mt-5 md:mt-20"
                            >
                                History
                            </button>
                        </div>
                        <div className="w-full lg:w-4/12 mt-8 lg:mt-0">
                            <div className="bg-[#FCEEF8] p-4 sm:p-5 rounded-md">
                                <div className="flex items-center justify-between">
                                <p className="text-md sm:text-lg font-medium text-[#CB0881]">P2P Trading</p>
                                <img src={p2p} alt="P2P Trading" className="w-12 h-12" />
                                </div>
                                <p className="mt-3 text-sm sm:text-base">
                                Engage in peer-to-peer (P2P) trading on the TB20 network by connecting directly with other users to buy and sell assets without intermediaries.
                                </p>
                            </div>
                        </div>
                    </div>
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

export default Wallet;
