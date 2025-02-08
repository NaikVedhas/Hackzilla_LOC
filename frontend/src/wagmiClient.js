// wagmiClient.js
import { createClient, configureChains, chain } from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected';

// Configure supported Ethereum networks
const { chains, provider, webSocketProvider } = configureChains(
  [chain.sepolia,chain.mainnet], // You can add more chains if you like
  [
    // Add popular providers
    publicProvider(),
  ]
);

// Create the Wagmi client
const wagmiClient = createClient({
  autoConnect: true, // Automatically connect if possible (will use injected wallet like MetaMask)
  connectors: [new InjectedConnector({ chains })],
  provider,
  webSocketProvider,
});

export default wagmiClient;
