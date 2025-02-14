import React, { useState } from 'react';
import { Search, Database, AlertCircle, CheckCircle } from 'lucide-react';

const DatabaseIntegration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('criminal');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Simulated API call - replace with actual authorized API integration
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated response
      setResults({
        status: 'SUCCESS',
        timestamp: new Date().toISOString(),
        queryId: Math.random().toString(36).substring(7),
      });
    } catch (err) {
      setError('Error connecting to database. Please verify credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Database className="w-8 h-8 text-purple-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Government Database Integration</h1>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-[#232323] rounded-lg p-6 mb-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Search Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-[#131313] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="criminal">Criminal Records</option>
                <option value="warrants">Active Warrants</option>
                <option value="vehicle">Vehicle Registration</option>
                <option value="licenses">Professional Licenses</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Search Query</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search criteria..."
                  className="w-full bg-[#131313] rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !searchQuery}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-md py-2 px-4 flex items-center justify-center gap-2 transition-colors"
          >
            <Database className="w-5 h-5" />
            {loading ? 'Searching...' : 'Search Database'}
          </button>
        </form>

        {/* Results Section */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200">{error}</p>
          </div>
        )}
        {results && !error && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold">Search Results</h2>
            </div>
            
            <div className="grid gap-4 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400">{results.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Timestamp:</span>
                <span>{new Date(results.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Query ID:</span>
                <span>{results.queryId}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseIntegration;
