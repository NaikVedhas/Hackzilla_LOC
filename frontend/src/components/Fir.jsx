import React, { useState,useEffect } from "react";
import { Plus, X, Upload, FileText } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function CaseFilingForm() {
  const [formData, setFormData] = useState({
    description: "",
    sections: [""],
    district: "",
    province: "",
    date: "",
    time: "",
    complainantName: "",
    complainantPhone: "",
    witnessName: "",
    witnessPhone: "",
    profilePicture: null,
    evidence: [],
    victimGender: "",
    victimAge: "",
    victimAadharCardNo: "", 
    witnessAadharCardNo: ""
  });


  const [AIOutput,setAIOutput]=useState("")
  const [AISections,setAISections]=useState("")

  console.log(AIOutput,AISections);

const handleGenerateGemini=async()=>{
    const res=await fetch("http://localhost:3000/api/ipc_section",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({description:formData.description})
    })
    console.log(res)
    const data=await res.json()

    if(data)
    {
        setAIOutput(data["reasoning by ai"].replace(/\*+/g, '').trim())
        setAISections(data['sections'])
    }

    

  }

  

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:5000/api/v1/fir/file", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data)=>{
      console.log(data);
      
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (index, value) => {
    const newSections = [...formData.sections];
    newSections[index] = value;
    setFormData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, ""],
    }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (e.target.name === "profilePicture") {
      setFormData((prev) => ({
        ...prev,
        profilePicture: files[0], // Only one file for the profile picture
      }));
    } else if (e.target.name === "evidenceImages") {
      setFormData((prev) => ({
        ...prev,
        evidence: [...prev.evidence, ...files],
      }));
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combine date and time into a single string
    const dateTime = `${formData.date} ${formData.time}`;

    // Create a new FormData object to send to the backend
    const formDataToSend = new FormData();

    // Append all the form data to the FormData object
    formDataToSend.append("descriptionOfCrime", formData.description);
    formDataToSend.append("crimeSection", JSON.stringify(formData.sections)); // Convert array to string
    formDataToSend.append("place", formData.district);
    formDataToSend.append("province", formData.province);
    formDataToSend.append("dateTime", dateTime); // Append the combined date and time
    formDataToSend.append("victimName", formData.complainantName);
    formDataToSend.append("victimGender", formData.victimGender); // Victim gender
    formDataToSend.append("victimAge", formData.victimAge); // Victim age
    formDataToSend.append("victimAadharCardNo", formData.victimAadharCardNo); // Victim Aadhar
    formDataToSend.append("witnessAadharCardNo", formData.witnessAadharCardNo); // Witness Aadhar
    formDataToSend.append("complainantPhone", formData.complainantPhone);
    formDataToSend.append("witnessName", formData.witnessName);
    formDataToSend.append("witnessPhone", formData.witnessPhone);

    // Append the profile picture and evidence images
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }

    formData.evidence.forEach((file) => {
      formDataToSend.append("evidenceImages", file);
    });

    // Submit the form data
    try {
      await mutate(formDataToSend);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(()=>{
    if(AISections)
    {
        setFormData(prev => ({
            ...prev,
            sections: AISections // Assuming AISections is an array
          }));
    }
  },[AISections])

  return (
    <div className="w-[100vw] flex items-center min-h-screen bg-gray-900 p-6">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Police Case Filing Form
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Crime Description */}
              <div className="relative">
                <label className="block text-purple-300 mb-2">Description of Incident/Crime</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-40 bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Provide detailed description of the incident..."
                />
                <div className="flex absolute right-2 bottom-5 items-center">
                    <button type='button' className='' onClick={handleGenerateGemini}>G</button>
                    <p className='mx-3 border-1 border-white px-[10px] py-[1px] rounded-full text-white' title={AIOutput!==""?AIOutput:"Please enter Description"}>i</p>
                    {/* <Popup/> */}
                </div>
              </div>

              {/* Sections of Penal Code */}
              <div>
                <label className="block text-purple-300 mb-2">Sections of Penal Code</label>
                <div className="space-y-3">
                  {formData.sections.map((section, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={section}
                        onChange={(e) => handleSectionChange(index, e.target.value)}
                        placeholder="e.g., IPC 234"
                        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                      {index === formData.sections.length - 1 ? (
                        <button
                          type="button"
                          onClick={addSection}
                          className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* District and Province */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Province</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Complainant Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">Complainant Name</label>
                  <input
                    type="text"
                    name="complainantName"
                    value={formData.complainantName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Complainant Phone</label>
                  <input
                    type="tel"
                    name="complainantPhone"
                    value={formData.complainantPhone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Witness Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">Witness Name</label>
                  <input
                    type="text"
                    name="witnessName"
                    value={formData.witnessName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Witness Phone</label>
                  <input
                    type="tel"
                    name="witnessPhone"
                    value={formData.witnessPhone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Victim Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">Victim Gender</label>
                  <input
                    type="text"
                    name="victimGender"
                    value={formData.victimGender}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Victim Age</label>
                  <input
                    type="number"
                    name="victimAge"
                    value={formData.victimAge}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">Victim Aadhar Card No</label>
                  <input
                    type="text"
                    name="victimAadharCardNo"
                    value={formData.victimAadharCardNo}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 mb-2">Witness Aadhar Card No</label>
                  <input
                    type="text"
                    name="witnessAadharCardNo"
                    value={formData.witnessAadharCardNo}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mt-6">
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div>
                <label className="block text-purple-300 mb-2">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                />
              </div>

              {/* Evidence Images */}
              <div className="space-y-2">
                <label className="block text-purple-300 mb-2">Evidence Images</label>
                <input
                  type="file"
                  name="evidenceImages"
                  multiple
                  onChange={handleFileChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                />
                <div className="flex gap-2 mt-2">
                  {formData.evidence.map((file, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-white text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg ${
                isLoading ? "bg-gray-500" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Case"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CaseFilingForm;
