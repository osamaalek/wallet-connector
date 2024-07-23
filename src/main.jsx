import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ethers } from "ethers";
import { Web3ContextProvider } from './Web3ContextProvider';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </React.StrictMode>
);
