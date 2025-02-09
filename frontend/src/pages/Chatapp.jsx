import { useState } from 'react';
import { Shield, MessageSquare, AlertTriangle, FileText, ArrowLeft, Send, Search } from 'lucide-react';

// Dummy data for police stations
const stations = [
  { id: 1, name: "Samtanagar Police Station", district: "Mumbai" },
  { id: 2, name: "Bandra Police Station", district: "Mumbai" },
  { id: 3, name: "Andheri Police Station", district: "Mumbai" },
  { id: 4, name: "Juhu Police Station", district: "Mumbai" }
];

// Dummy data for case files
const caseFiles = [
  {
    id: 1,
    description: "Breaking and entering at commercial property",
    sections: ["IPC 457", "IPC 380"],
    date: "2024-03-20",
    time: "23:15",
    district: "Bandra West",
    province: "Maharashtra",
    complainant: {
      name: "Raj Malhotra",
      phone: "555-0123"
    },
    witness: {
      name: "Priya Singh",
      phone: "555-0124"
    }
  },
  {
    id: 2,
    description: "Vehicle theft from residential area",
    sections: ["IPC 379"],
    date: "2024-03-19",
    time: "14:30",
    district: "Andheri East",
    province: "Maharashtra",
    complainant: {
      name: "Amit Shah",
      phone: "555-0125"
    },
    witness: {
      name: "Sanjay Kumar",
      phone: "555-0126"
    }
  }
];

function Chatapp() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [showCaseFiles, setShowCaseFiles] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (stationId, isAlert = false, caseFile = null) => {
    if (!newMessage && !caseFile) return;

    const newMsg = {
      id: Date.now(),
      text: caseFile ? `Case File #${caseFile.id}: ${caseFile.description}` : newMessage,
      timestamp: new Date().toISOString(),
      sender: 'self',
      type: isAlert ? 'alert' : caseFile ? 'case' : 'message',
      caseFile
    };

    setMessages(prev => ({
      ...prev,
      [stationId]: [...(prev[stationId] || []), newMsg]
    }));

    setNewMessage('');
    setShowCaseFiles(false);

    // Simulate received message
    if (!caseFile && !isAlert) {
      setTimeout(() => {
        const replyMsg = {
          id: Date.now() + 1,
          text: 'Received your message. We\'ll look into it.',
          timestamp: new Date().toISOString(),
          sender: 'other',
          type: 'message'
        };
        setMessages(prev => ({
          ...prev,
          [stationId]: [...(prev[stationId] || []), replyMsg]
        }));
      }, 1000);
    }
  };

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen w-[100vw] bg-[#000000] text-gray-100 p-5">
      <div className=" bg-[#2e2e2e] mx-auto w-[90vw] p-10 rounded-xl">
        <header className="flex items-center gap-4 mb-8">
          <Shield className="w-10 h-10 text-purple-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Police Communication Hub
          </h1>
        </header>

        {!selectedStation ? (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search police stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div className="grid gap-4">
              {filteredStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className="bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-750 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{station.name}</h3>
                    <p className="text-gray-400">{station.district}</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : showCaseFiles ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setShowCaseFiles(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-semibold">Select Case File to Share</h2>
            </div>

            <div className="grid gap-4">
              {caseFiles.map((caseFile) => (
                <button
                  key={caseFile.id}
                  onClick={() => handleSendMessage(selectedStation.id, false, caseFile)}
                  className="bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Case #{caseFile.id}</h3>
                    <span className="text-sm text-gray-400">
                      {caseFile.date} {caseFile.time}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{caseFile.description}</p>
                  <p className="text-sm text-gray-400">
                    Sections: {caseFile.sections.join(", ")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-12rem)] flex flex-col bg-[#000000] rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-750 flex items-center gap-4">
              <button
                onClick={() => setSelectedStation(null)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-semibold">{selectedStation.name}</h2>
                <p className="text-sm text-gray-400">{selectedStation.district}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a1a]">
              {(messages[selectedStation.id] || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.type === 'alert'
                        ? 'bg-red-900/50 border border-red-700'
                        : message.type === 'case'
                        ? 'bg-purple-900/50 border border-purple-700'
                        : message.sender === 'self'
                        ? 'bg-purple-600'
                        : 'bg-gray-700'
                    }`}
                  >
                    {message.type === 'alert' && (
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-semibold">Urgent Alert</span>
                      </div>
                    )}
                    {message.type === 'case' && (
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-semibold">Case File Shared</span>
                      </div>
                    )}
                    <p>{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-750 space-y-4 bg-[#000000]">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setNewMessage("🚨 URGENT ALERT: Immediate assistance required!");
                    handleSendMessage(selectedStation.id, true);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Send Alert
                </button>
                <button
                  onClick={() => setShowCaseFiles(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Share Case
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(selectedStation.id);
                    }
                  }}
                />
                <button
                  onClick={() => handleSendMessage(selectedStation.id)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatapp;
