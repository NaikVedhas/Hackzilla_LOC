import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";

const CrimeForm = () => {
  const [formData, setFormData] = useState({
    descriptionOfCrime: "",
    place: "",
    dateTime: "",
    victimName: "",
    victimGender: "",
    victimAge: "",
    witnesses: [],
    suspects: [],
    selectedTags: [],
    victimImage: null,
    evidenceImage: null,
    evidenceVideo: null,
  });

  const penalCodes = [
    "Section 302 - Murder",
    "Section 307 - Attempted Murder",
    "Section 379 - Theft",
    "Section 392 - Robbery",
    "Section 420 - Cheating",
    "Section 509 - Insulting modesty",
  ];

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:5000/api/v1/fir/file", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const toggleTag = (code) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(code)
        ? prev.selectedTags.filter((tag) => tag !== code)
        : [...prev.selectedTags, code],
    }));
  };

  const addEntry = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeEntry = (field, index) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        submissionData.append(key, JSON.stringify(formData[key]));
      } else {
        submissionData.append(key, formData[key]);
      }
    });
    mutate(submissionData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">File an FIR</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="descriptionOfCrime"
              className="w-full bg-gray-700 rounded p-2 border border-purple-500"
              value={formData.descriptionOfCrime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Place of Crime</label>
            <input
              type="text"
              name="place"
              className="w-full bg-gray-700 rounded p-2 border border-purple-500"
              value={formData.place}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              className="w-full bg-gray-700 rounded p-2 border border-purple-500"
              value={formData.dateTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Applicable Sections</label>
            <div className="flex flex-wrap gap-2">
              {penalCodes.map((code, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleTag(code)}
                  className={`px-3 py-1 rounded text-sm border border-purple-500 transition ${
        formData.selectedTags.includes(code) ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400">Witnesses</h3>
            {formData.witnesses.map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Witness Name"
                  className="w-full bg-gray-700 rounded p-2 border border-purple-500"
                  onChange={(e) => {
                    const newWitnesses = [...formData.witnesses];
                    newWitnesses[index] = e.target.value;
                    setFormData({ ...formData, witnesses: newWitnesses });
                  }}
                />
                <button type="button" onClick={() => removeEntry("witnesses", index)}>
                  <X className="text-red-400" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addEntry("witnesses")} className="text-purple-400 mt-2">
              <PlusCircle /> Add Witness
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400">Upload Evidence</h3>
            <input type="file" name="victimImage" onChange={handleFileChange} className="block text-gray-300" />
            <input type="file" name="evidenceImage" onChange={handleFileChange} className="block text-gray-300 mt-2" />
            <input type="file" name="evidenceVideo" onChange={handleFileChange} className="block text-gray-300 mt-2" />
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg">Submit FIR</button>
        </form>
      </div>
    </div>
  );
};

export default CrimeForm;
