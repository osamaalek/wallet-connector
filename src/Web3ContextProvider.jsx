import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { connectors } from "./connectors";

// Helper function to get library
function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

// Web3ContextProvider component
export const Web3ContextProvider = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary} connectors={connectors}>
      {children}
    </Web3ReactProvider>
  );
};
