import { useAccount } from "wagmi";
import contractAddress from "../contractAddress";
import contractABI from "../abi.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CaseDetails from "../components/CaseDetails";
import { Link } from "react-router-dom";

const MyCases = () => {
  const { address } = useAccount();  // Get connected wallet address
  const [cases, setCases] = useState([]); // State to store fetched cases
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null); // State to handle any errors

  // If the user is not connected, display message to connect wallet
  if (!address) {
    return <div>Please connect wallet to see cases</div>;
  }

  // Function to call blockchain and fetch cases
  const callBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      // Call getInspectorCases to fetch the cases for the inspector
      const caseIds = await contract.getInspectorCases();
      
      // Fetch the details of each case using getCase
      const caseDetailsPromises = caseIds.map(async (caseId) => {
        const caseData = await contract.getCase(caseId);
        return {
          caseId: caseId.toString(),
          place: caseData.place,
          timeDate: caseData.timeDate,
          crimeSection: caseData.crimeSection,
          crimeDescription: caseData.crimeDescription,
          victimId: caseData.victimId,
          victimAadharNumber: caseData.victimAadharNumber,
          isClosed: caseData.isClosed,
          witnessNames: caseData.witnessName, // Array of witness names
          witnessAadharNumbers: caseData.witnessAadharNumber, // Array of witness Aadhar numbers
          evidenceImages: caseData.evidenceImages, // Array of evidence images
          evidenceDescriptions: caseData.evidenceDescriptions, // Array of evidence descriptions
          evidenceVideos: caseData.evidenceVideos, // Array of evidence videos
        };
      });

      // Wait for all case details to be fetched
      const casesData = await Promise.all(caseDetailsPromises);

      // Set cases data to state
      setCases(casesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cases:", error);
      setError("Failed to load cases. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      callBlockchainData();
    }
  }, [address]); // Re-fetch data when address changes

  // Render loading, error or cases
  if (loading) {
    return <div className="text-center text-gray-300">Loading cases...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#000000] w-full text-gray-100 p-6">
      <div className="mx-auto bg-[#2e2e2e] w-full p-8 rounded-2xl">
        <header className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            ALl Cases
          </h1>
        </header>

        {cases.length === 0 ? (
          <p className="text-center">No cases found for this inspector.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseData) => (
              <Link key={caseData.caseId} to={`/case/:${caseData.caseId}`}>
                <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all">
                  <CaseDetails caseData={caseData} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCases;
