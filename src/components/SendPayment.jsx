import { useState } from "react";
import { sendXLM } from "../utils/stellar";
import { parseError } from "../utils/errors";

const STATUS = { IDLE: "idle", PENDING: "pending", SUCCESS: "success", ERROR: "error" };

const SendPayment = ({ publicKey, signTransaction }) => {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [txHash, setTxHash] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSend = async () => {
    if (!destination || !amount) return;
    setStatus(STATUS.PENDING);
    setErrorMsg("");
    try {
      const hash = await sendXLM(publicKey, destination, amount, signTransaction);
      setTxHash(hash);
      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setErrorMsg(parseError(e).message);
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div className="card">
      <h2>📤 Send XLM</h2>
      <input placeholder="Destination Address" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input placeholder="Amount (XLM)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className="btn success" onClick={handleSend} disabled={status === STATUS.PENDING}>
        {status === STATUS.PENDING ? "Sending..." : "Send XLM"}
      </button>
      {status === STATUS.PENDING && <div className="status pending">⏳ Transaction pending...</div>}
      {status === STATUS.SUCCESS && (
        <div className="status success">
          ✅ Sent!{" "}
          <a href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} target="_blank" rel="noreferrer">
            View ↗
          </a>
        </div>
      )}
      {status === STATUS.ERROR && <div className="status error">❌ {errorMsg}</div>}
    </div>
  );
};

export default SendPayment;
