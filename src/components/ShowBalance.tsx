import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowBalance() {

    const [balance, setBalance] = useState(0);

    const { connection } = useConnection();
    const wallet = useWallet();

    async function getBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        }
    }

    useEffect(() => {
        getBalance();
    }, [wallet])
    return (
        <div className="flex items-center justify-center">
            <h1 className="font-bold text-3xl">Balance: {balance} SOL</h1>
        </div>
    )
}

export default ShowBalance