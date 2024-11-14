import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useCallback, useState } from 'react';

function VerifyWallet() {
    const { publicKey, signMessage } = useWallet();

    // Type state variables
    const [signature, setSignature] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [verified, setVerified] = useState<boolean>(false);

    // Define onClick as an async function and ensure proper error handling with types
    const onClick = useCallback(async () => {
        setError(null);
        setVerified(false);
        setSignature(null);
        setLoading(true);

        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');

            const message = new TextEncoder().encode(
                `${window.location.host} wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`
            );

            const signature = await signMessage(message);
            const isValid = ed25519.verify(signature, message, publicKey.toBytes());

            if (!isValid) throw new Error('Message signature invalid!');

            setSignature(bs58.encode(signature));
            setVerified(true);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }, [publicKey, signMessage]);

    return (
        <div className="max-w-lg mx-auto ">
            <h2 className="text-2xl font-bold text-center mb-4">Verify Wallet</h2>
            <p className="text-center text-gray-600 mb-6">
                This tool verifies that your Solana wallet can sign messages securely.
            </p>
            <button
                onClick={onClick}
                disabled={!publicKey || !signMessage || loading}
                className="w-full py-3 bg-[#512da8] hover:bg-[#452394] border border-[#512da8] text-white rounded-lg disabled:opacity-50 focus:outline-none"
            >
                {loading ? 'Signing...' : 'Sign Message'}
            </button>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {signature && (
                <div className="overflow-y-auto max-w-lg mt-4 p-3 bg-green-100 text-green-700 rounded">
                    <p><strong>Signature:</strong> {signature}</p>
                    {verified && <p>✅ Signature verified successfully!</p>}
                </div>
            )}
        </div>
    );
}

export default VerifyWallet;
