import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia, mainnet, polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "loc7",
  projectId: "59738a3aed3d161d34bda195475becbe",
  chains: [sepolia, mainnet, polygon],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});

const chains = [sepolia, mainnet, polygon];

// // Configure chains
// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, arbitrum, optimism],
//   [publicProvider()]
// );

// // Get default wallets
// const { connectors } = getDefaultWallets({
//   appName: "loc7",
//   projectId: "59738a3aed3d161d34bda195475becbe", // WalletConnect Project ID
//   chains,
// });

// // Create Wagmi config
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
