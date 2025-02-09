import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import contractABI from "../abi.json";
import contractAddress from "../contractAddress";
import { ethers } from "ethers";
import { useAccount } from 'wagmi';

function FirListing() {
  const { id } = useParams();  // Get case ID from URL

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newWitness, setNewWitness] = useState({
    name: "",
    phone: "",
    aadharNo: ""
  });
  const [showWitnessModal, setShowWitnessModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [newEvidence, setNewEvidence] = useState("");
  const { address } = useAccount();  // Get connected wallet address

  // Fetch blockchain data for the specific case
  const callBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const caseData = await contract.getCase(id);  // Fetch data for the case with id
      console.log(caseData);

      const fetchedCases = [
        {
          id,
          district: "Metropolitan District",  // Hardcoded district data
          description: "I'm stabbed",  // Hardcoded crime description
          sections: ["IPC 302", "IPC 376"],  // Hardcoded crime sections
          province: "Metropolitan",  // Hardcoded province
          date: "2025-02-09",  // Hardcoded date
          time: "12:00 PM",  // Hardcoded time
          victimId: "V12345",  // Hardcoded victim ID
          complainant: {
            name: "John Doe",  // Hardcoded complainant name
            phone: "1234567890",  // Hardcoded complainant phone
          },
          victim: {
            gender: "Male",  // Hardcoded victim gender
            age: 30,  // Hardcoded victim age
            aadharNo: "1234-5678-9876",  // Hardcoded victim Aadhar number
          },
          evidence: [
            "https://www.livelaw.in/cms/wp-content/uploads/2016/05/Homelessness-and-Crime.jpg",
            "https://media.istockphoto.com/id/1363488987/photo/detective-board-with-fingerprints-photos-map-and-clues-connected-by-red-string-on-white-brick.jpg?s=612x612&w=0&k=20&c=tM-x3PB-_hP7kVY5CBf3uPt2doTDrgkut-euQx_IjIk="
          ],
          witnesses: [],
        },
      ];

      setCases(fetchedCases);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching case data:", error);
      setError("Failed to load case data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      callBlockchainData();  // Call blockchain data fetching function when address is available
    }
  }, [address]);  // Refetch if the address changes

  const addWitness = (caseId) => {
    if (!newWitness.name || !newWitness.phone || !newWitness.aadharNo) return;

    setCases(cases.map(case_ => {
      if (case_.id === caseId) {
        return {
          ...case_,
          witnesses: [...case_.witnesses, newWitness]
        };
      }
      return case_;
    }));

    setNewWitness({ name: "", phone: "", aadharNo: "" });
    setShowWitnessModal(false);
  };

  const addEvidence = (caseId) => {
    if (!newEvidence) return;

    setCases(cases.map(case_ => {
      if (case_.id === caseId) {
        return {
          ...case_,
          evidence: [...case_.evidence, newEvidence]
        };
      }
      return case_;
    }));

    setNewEvidence("");
    setShowEvidenceModal(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] w-[100vw] text-gray-100 p-6">
      <div className="mx-auto bg-[#2e2e2e] w-[90vw] p-11 rounded-2xl">
        <header className="flex items-center gap-4 mb-8">
          <Shield className="w-10 h-10 text-purple-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Police Case Management
          </h1>
        </header>

        <div className="space-y-4">
          {loading ? (
            <p>Loading cases...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            cases
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((case_) => (
                <div key={case_.id} className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                  <div className="p-6 space-y-6 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                        <p>{case_.description}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Sections</h3>
                        <p>{case_.sections.join(", ")}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Location</h3>
                        <p>{case_.district}, {case_.province}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Date & Time</h3>
                        <p>{new Date(case_.date).toLocaleDateString()} at {case_.time}</p>
                      </div>
                    </div>

                    <div className="bg-[#2e2e2e]/50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Complainant</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Name</label>
                          <p>{case_.complainant.name}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Phone</label>
                          <p>{case_.complainant.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#2e2e2e]/50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Victim</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Gender</label>
                          <p>{case_.victim.gender}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Age</label>
                          <p>{case_.victim.age}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Aadhar No.</label>
                          <p>{case_.victim.aadharNo}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#2e2e2e]/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">Witnesses</h3>
                        <button
                          onClick={() => {
                            setSelectedCaseId(case_.id);
                            setShowWitnessModal(true);
                          }}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
                        >
                          Add Witness
                        </button>
                      </div>
                      {case_.witnesses.length === 0 ? (
                        <p className="text-gray-400 ">No witnesses recorded</p>
                      ) : (
                        <div className="space-y-4">
                          {case_.witnesses.map((witness, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="text-sm text-gray-400">Name</label>
                                <p>{witness.name}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Phone</label>
                                <p>{witness.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Aadhar No.</label>
                                <p>{witness.aadharNo}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-[#2e2e2e]/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">Evidence</h3>
                      </div>
                      {case_.evidence.length === 0 ? (
                        <p className="text-gray-400">No evidence recorded</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {case_.evidence.map((url, index) => (
                            <div key={index} className="relative">
                              <img
                                src={url}
                                alt={`Evidence ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.onerror = null; // Prevent infinite loop in case of broken link
                                  e.target.src = "https://via.placeholder.com/150"; // Placeholder image if the image fails to load
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FirListing;
