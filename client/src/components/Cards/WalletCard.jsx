import {FaWallet } from 'react-icons/fa';

const WalletCard = ({balance}) => {
    return(
        <div className="flex flex-col items-center">
            <FaWallet size={50} />
            <div className='text-3xl font-bold m-8'>KARMA POINTS</div>
            <div className='text-5xl m-5'>{balance}</div>
        </div>
    )
};

export default WalletCard;