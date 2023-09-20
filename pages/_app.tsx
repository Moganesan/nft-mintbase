import "@/styles/globals.css";
import { WalletContextProvider } from "@mintbase-js/react";
import type { AppProps } from "next/app";
import "@near-wallet-selector/modal-ui/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider
      network="testnet"
      contractAddress="mintspace2.testnet"
    >
      <Component {...pageProps} />
    </WalletContextProvider>
  );
}
