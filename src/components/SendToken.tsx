import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react'

function SendToken() {

	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState(0);

	const wallet = useWallet();
	const { connection } = useConnection();

	async function sendTokens() {
		try {
			if (!wallet.publicKey) throw new Error('Wallet not connected!');
			const transaction = new Transaction();
			transaction.add(SystemProgram.transfer({
				fromPubkey: wallet.publicKey,
				toPubkey: new PublicKey(receiver),
				lamports: amount * LAMPORTS_PER_SOL
			}));

			await wallet.sendTransaction(transaction, connection);
			alert("Sent " + amount + " SOL to " + receiver);
		} catch (error: any) {
			console.error(error);
			alert("Send Transaction failed: " + error.message);
		}

		setReceiver('');
		setAmount(0);
	}
	return (
		<div className='max-w-xl mx-auto'>
			<h2 className="text-2xl font-bold text-center mb-4">Send Tokens</h2>
			<div className="mb-4">
				<label htmlFor="receiver" className="block mb-2 text-sm font-medium text-gray-900">Receiver address</label>
				<input 
					type="text" 
					id="receiver" 
					onChange={(e) => setReceiver(e.target.value)}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " 
					placeholder="Receiver Address" 
					required 
				/>
			</div>
			<div>
				<label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900">Select amount:</label>
				<div className='flex gap-8'>
					<input
						type="number"
						id="number-input"
						aria-describedby="helper-text-explanation"
						step={0.1}
						onChange={(e) => setAmount(parseFloat(e.target.value))}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
						placeholder="0"
						required
					/>
					<button
						onClick={sendTokens}
						className="bg-[#512da8] hover:bg-[#452394] border border-[#512da8] px-6 rounded-lg text-white"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default SendToken