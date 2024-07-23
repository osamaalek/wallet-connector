import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const MetaMaskBtn = () => {
  const { isActive, account, connector, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const myChainId = import.meta.env.MY_CHAIN_ID || "11155111";

  useEffect(() => {
    const storedActive = localStorage.getItem("walletConnected");
    console.log("storedActive: " + storedActive);
    if (storedActive === "true") {
      onConnectMetaMask();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("walletConnected", isActive ? "true" : "false");

    if (isActive) {
      setLoading(false);
      setError(null);
    }
  }, [isActive]);

  const addChainToMetaMask = async (myChainId) => {
    const chainIdHex = Web3.utils.toHex(parseInt(myChainId));

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: chainIdHex,
            chainName: "Sepolia Test Network",
            nativeCurrency: {
              name: "Sepolia ETH",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [
              "https://sepolia.infura.io/v3/" + import.meta.env.MY_PROJECT_ID,
            ],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
    } catch (err) {
      console.log("Failed to add chain to MetaMask", err);
    }
  };

  const onConnectMetaMask = async () => {
    try {
      setLoading(true);
      setError(null);

      if (
        myChainId &&
        window.ethereum &&
        window.ethereum.networkVersion !== myChainId
      ) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(parseInt(myChainId)) }],
          });
        } catch (err) {
          setError(err);
          setLoading(false);
          if (err.code === 4902) {
            // Chain is not added, add it
            await addChainToMetaMask(myChainId);
            // Retry switching after adding
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(parseInt(myChainId)) }],
            });
          } else {
            console.log("Network change rejected", err);
          }
          console.error("err: " + err);
        }
      } else {
        await connector.activate();
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const onDisconnectMetaMask = () => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    } else if (connector && connector.resetState) {
      connector.resetState();
    }
  };

  return (
    <div>
      {isActive ? (
        <div>
          <p>Connected with account: {account}</p>
          <button onClick={onDisconnectMetaMask}>Disconnect MetaMask</button>
        </div>
      ) : (
        <button onClick={onConnectMetaMask} disabled={loading}>
          {loading ? "Connecting..." : "Connect MetaMask"}
          {error && <div>Error: {error.message}</div>}
        </button>
      )}
    </div>
  );
};

export default MetaMaskBtn;
