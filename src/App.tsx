import {  useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './components/RequestAirdrop';
import ShowBalance from './components/ShowBalance';
import VerifyWallet from './components/VerifyWallet';
import SendToken from './components/SendToken';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  const [activeTab, setActiveTab] = useState('send');

  return (
    <main className="w-full min-h-screen px-40 pt-10 bg-gray-100">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <div className="flex justify-between w-full mb-6">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <div className="w-full mb-8">
              <ShowBalance />
            </div>

            {/* Tabs */}
            <div className="max-w-2xl bg-white rounded-lg shadow-md mx-auto">
              <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
                <ul className="flex flex-wrap -mb-px">
                  <li className="me-2">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'send' ? 'text-[#512da8] border-b-2 border-[#512da8]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('send')}
                    >
                      Send Token
                    </button>
                  </li>
                  <li className="me-2">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'airdrop' ? 'text-[#512da8] border-b-2 border-[#512da8]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('airdrop')}
                    >
                      Request Airdrop
                    </button>
                  </li>
                  <li className="me-2">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'verify' ? 'text-[#512da8] border-b-2 border-[#512da8]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                      onClick={() => setActiveTab('verify')}
                    >
                      Verify Wallet
                    </button>
                  </li>


                </ul>
              </div>


              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'airdrop' && <RequestAirdrop />}
                {activeTab === 'verify' && <VerifyWallet />}
                {activeTab === 'send' && <SendToken />}
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </main>
  );
}

export default App;
