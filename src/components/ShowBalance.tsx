import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowBalance() {

    const [balance, setBalance] = useState<number>(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        let subscriptionId: number | null = null;

        async function fetchInitialBalance() {
            if (publicKey) {
                const initialBalance = await connection.getBalance(publicKey);
                setBalance(initialBalance / LAMPORTS_PER_SOL);
            }else {
                setBalance(0); // Reset balance on disconnection
            }
        }

        if (publicKey) {
            // Fetch the initial balance
            fetchInitialBalance();

            // Subscribe to account changes for live updates
            subscriptionId = connection.onAccountChange(publicKey, (accountInfo) => {
                const newBalance = accountInfo.lamports;
                setBalance(newBalance / LAMPORTS_PER_SOL);
            });
        }else {
            setBalance(0); // Reset balance on disconnection
        }

        return () => {
            // Clean up the subscription when publicKey changes or component unmounts
            if (subscriptionId !== null) {
                connection.removeAccountChangeListener(subscriptionId);
            }
        };
    }, [publicKey, connection]);

    return (
        <div className="flex items-center justify-center">
            <h1 className="font-bold text-3xl">Balance: {balance} SOL</h1>
        </div>
    )
}

export default ShowBalance