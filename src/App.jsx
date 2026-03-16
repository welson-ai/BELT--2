import { useWallet } from "./hooks/useWallet";
import WalletConnect from "./components/WalletConnect";
import Balance from "./components/Balance";
import SendPayment from "./components/SendPayment";
import ContractPanel from "./components/ContractPanel";
import "./App.css";

function App() {
  const { publicKey, connect, disconnect, signTransaction, error } = useWallet();

  return (
    <div className="app">
      <div className="header">
        <h1>🌟 Stellar Level 2 dApp</h1>
        <p className="subtitle">Multi-wallet · Smart Contract · Testnet</p>
      </div>
      <WalletConnect publicKey={publicKey} connect={connect} disconnect={disconnect} error={error} />
      {publicKey && (
        <>
          <Balance publicKey={publicKey} />
          <ContractPanel publicKey={publicKey} signTransaction={signTransaction} />
          <SendPayment publicKey={publicKey} signTransaction={signTransaction} />
        </>
      )}
    </div>
  );
}

export default App;
