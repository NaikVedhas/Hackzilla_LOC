import React, { useState } from 'react';
import {useMutation} from "@tanstack/react-query"
const IncidentReportForm = () => {

  const [descriptionOfCrime, setDescriptionOfCrime] = useState('');
  const [place, setPlace] = useState('');
  const [crimeAct, setCrimeAct] = useState('');
  const [crimeSection, setCrimeSection] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [victimName, setVictimName] = useState('');
  const [victimGender, setVictimGender] = useState('');
  const [victimAge, setVictimAge] = useState('');
  const [witnessName, setWitnessName] = useState('');
  const [witnessAge, setWitnessAge] = useState('');
  const [witnessGender, setWitnessGender] = useState('');
  const [image, setImage] = useState(null); // state for image upload

  const [newPenalCode, setNewPenalCode] = useState('');

  const addWitness = () => {
    setFormData({
      ...formData,
      witnesses: [...formData.witnesses, { name: '', aadharNumber: '' }],
    });
  };

  const removeWitness = (index) => {
    const newWitnesses = formData.witnesses.filter((_, i) => i !== index);
    setFormData({ ...formData, witnesses: newWitnesses });
  };

  const addSuspect = () => {
    setFormData({
      ...formData,
      suspects: [...formData.suspects, ''],
    });
  };

  const removeSuspect = (index) => {
    const newSuspects = formData.suspects.filter((_, i) => i !== index);
    setFormData({ ...formData, suspects: newSuspects });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    
  };

  const removeFile = (index) => {
    
  };

  const addPenalCode = () => {
    if (newPenalCode.trim() && !formData.penalCodes.includes(newPenalCode)) {
      setFormData({
        ...formData,
        penalCodes: [...formData.penalCodes, newPenalCode.trim()],
      });
      setNewPenalCode('');
    }
  };

  const removePenalCode = (code) => {
    setFormData({
      ...formData,
      penalCodes: formData.penalCodes.filter((c) => c !== code),
    });
  };

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:5000/api/v1/fir/file", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("descriptionOfCrime", formData.descriptionOfCrime);
    formData.append("place", formData.place);
    formData.append("crimeAct", formData.crimeAct);
    formData.append("crimeSection", formData.crimeSection);
    formData.append("dateTime", formData.dateTime);
    formData.append("victimName", formData.victimName);
    formData.append("victimGender", formData.victimGender);
    formData.append("victimAge", formData.victimAge);
    formData.append("witnessName", formData.witnessName);

    // Append the image file to the FormData
    if (image) {
      formData.append("image", image);
    }

    // mutate(submissionData);
    console.log('Form submitted:', formData);
    // console.log('Form submitted:', submissionData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-purple-300">Police First Incident Report</h1>
          </div>

          <div className="space-y-4">
            {/* Incident Details */}
            <textarea
              name="description"
              placeholder="Description of incident/crime"
              value={formData.description}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
            />
              
            <div className="grid grid-cols-2 gap-4">
              <input
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                name="province"
                placeholder="Province"
                value={formData.province}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <input
              name="crimeType"
              placeholder="Type of Crime"
              value={formData.crimeType}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            {/* Penal Codes */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  placeholder="Add Penal Code"
                  value={newPenalCode}
                  onChange={(e) => setNewPenalCode(e.target.value)}
                  className="flex-1 p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button 
                  type="button" 
                  onClick={addPenalCode}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.penalCodes.map((code, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500 rounded-full text-white"
                  >
                    {code}
                    <button
                      type="button"
                      onClick={() => removePenalCode(code)}
                      className="text-white hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Complainant Details */}
            <div className="space-y-4 pt-4 border-t border-purple-400">
              <h3 className="text-lg font-semibold text-purple-300">Complainant Details</h3>
              <input
                name="name"
                placeholder="Name"
                value={formData.complainant.name}
                onChange={(e) => handleInputChange(e, 'complainant')}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                name="contact"
                placeholder="Contact"
                value={formData.complainant.contact}
                onChange={(e) => handleInputChange(e, 'complainant')}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                name="address"
                placeholder="Address"
                value={formData.complainant.address}
                onChange={(e) => handleInputChange(e, 'complainant')}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Witnesses */}
            <div className="space-y-4 pt-4 border-t border-purple-400">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-300">Witnesses</h3>
                <button 
                  type="button" 
                  onClick={addWitness}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Add Witness
                </button>
              </div>
              {formData.witnesses.map((witness, index) => (
                <div key={index} className="space-y-2 p-4 border border-purple-400 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-purple-300">Witness {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeWitness(index)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    placeholder="Name"
                    value={witness.name}
                    onChange={(e) => handleInputChange(e, 'witnesses', index, 'name')}
                    className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    placeholder="Aadhar Number"
                    value={witness.aadharNumber}
                    onChange={(e) => handleInputChange(e, 'witnesses', index, 'aadharNumber')}
                    className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {/* Suspects */}
            <div className="space-y-4 pt-4 border-t border-purple-400">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-300">Suspects</h3>
                <button 
                  type="button" 
                  onClick={addSuspect}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Add Suspect
                </button>
              </div>
              {formData.suspects.map((suspect, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    placeholder="Suspect Name"
                    value={suspect}
                    onChange={(e) => handleInputChange(e, 'suspects', index)}
                    className="flex-1 p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeSuspect(index)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Evidence */}
            <div className="space-y-4 pt-4 border-t border-purple-400">
              <h3 className="text-lg font-semibold text-purple-300">Evidence</h3>
              <textarea
                name="description"
                placeholder="Evidence Description"
                value={formData.evidence.description}
                onChange={(e) => handleInputChange(e, 'evidence')}
                className="w-full p-3 bg-gray-700 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
              <div className="space-y-2">
                <label className="block">
                  <div className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-center cursor-pointer">
                    Upload VICTIM IMAGE
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,video/*"
                    />
                  </div>
                </label>
                <div className="space-y-2">
                  {formData.evidence.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-lg">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors mt-6"
            >
              Submit Report
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncidentReportForm;