import { useNavigate } from 'react-router-dom';

/* ============= IMAGE =============== */
import roadmap from "../../assets/roadmap.png"

/* ============= COMPONENT ============ */
import WallatNav from '../../components/WallatNav';
import { useSelector } from 'react-redux';


const Funding = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user)
    return (
        <>
            <div className='container mx-auto pt-28 pb-12 px-4'>
                <div>
                    <WallatNav />
                    <p className="mt-10 font-medium">{user.fundingBalance.toFixed(2)} USDT</p>
                </div>
                <div className='grid mb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-center'>
                    <button 
                        onClick={() => navigate('/deposit')} 
                        className='bg-primary p-4 rounded-xl text-white bg-[#CB0881] font-semibold'
                    >
                        Add
                    </button>
                    <button 
                        onClick={() => navigate('/wallet/withdraw')} 
                        className='bg-primary p-4 rounded-xl text-white bg-[#CB0881] font-semibold'
                    >
                        Withdraw
                    </button>
                    <button 
                        onClick={() => navigate('/fund/transfer')}
                        className='bg-primary p-4 rounded-xl text-white bg-[#CB0881] font-semibold'
                    >
                        Transfer
                    </button>
                    <button 
                        onClick={() => navigate('/wallet/funding-history')} 
                        className='bg-primary p-4 rounded-xl text-white bg-[#CB0881] font-semibold'
                    >
                        History
                    </button>
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

export default Funding;
