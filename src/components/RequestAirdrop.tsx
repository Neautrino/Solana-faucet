import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function RequestAirdrop() {

    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState(0);
    const minAmount = 0;
    const maxAmount = 5;
    const [address, setAddress] = useState('');

    // Handle decrement
    const handleDecrement = () => {
        if (amount > minAmount) {
            setAmount(amount - 1);
        }
    };

    // Handle increment
    const handleIncrement = () => {
        if (amount < maxAmount) {
            setAmount(amount + 1);
        }
    };


    async function requestAirdrop() {
        if (wallet.publicKey) {
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
        } else {
            alert("Wallet is not connected");
        }
    }

    useEffect(() => {
        if (wallet.publicKey) {
            setAddress(wallet.publicKey.toBase58());
        }
    }, [wallet.publicKey]);


    return (
        <div className='max-w-xl mx-auto'>
            <h2 className="text-2xl font-bold text-center mb-4">Request Airdrop</h2>
            <div className="mb-6">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Wallet address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Wallet Address"
                    required
                />
            </div>
            <div className="">
                <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900">Choose SOL Amount: </label>
                <div className='flex gap-8 '>
                    <div className="relative flex items-center max-w-[10rem]">
                        <button
                            type="button"
                            onClick={handleDecrement}
                            className="bg-[#512da8] hover:bg-[#452394] border border-[#512da8] rounded-s-lg p-3 h-11 "
                        >
                            <AiOutlineMinus className="w-3 h-3 text-white" />
                        </button>
                        <input
                            type="text"
                            id="quantity-input"
                            value={amount}
                            readOnly
                            className="bg-gray-50 border-y-2 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5"
                        />
                        <button
                            type="button"
                            onClick={handleIncrement}
                            className="bg-[#512da8] hover:bg-[#452394] border border-[#512da8] rounded-e-lg p-3 h-11"
                        >
                            <AiOutlinePlus className="w-3 h-3 text-white" />
                        </button>
                    </div>
                    <button
                        onClick={requestAirdrop}
                        className="bg-[#512da8] hover:bg-[#452394] flex-1 border border-[#512da8] px-3 rounded-lg text-white"
                    >
                        Request Airdrop
                    </button>
                </div>
                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
                    Please select a number between 0 and 5.
                </p>
            </div>

        </div>
    )
}

export default RequestAirdrop