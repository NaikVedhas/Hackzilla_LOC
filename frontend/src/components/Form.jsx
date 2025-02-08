import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

const CrimeForm = () => {
  const [formData, setFormData] = useState({
    descriptionOfCrime: '',
    place: '',
    crimeAct: '',
    crimeSection: '',
    dateTime: '',
    victimName: '',
    victimGender: '',
    victimAge: '',
    witnessName: '',
    witnessAge: '',
    witnessGender: '',
    image: null,
  });

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

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });
    mutate(submissionData);
  };

  return (
    <div className="form-container">
      <h1 className="text-3xl font-bold mb-6">Crime Report Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Description of Crime", name: "descriptionOfCrime" },
          { label: "Place", name: "place" },
          { label: "Crime Act", name: "crimeAct" },
          { label: "Crime Section", name: "crimeSection" },
          { label: "Date and Time", name: "dateTime", type: "datetime-local" },
          { label: "Victim Name", name: "victimName" },
          { label: "Victim Gender", name: "victimGender" },
          { label: "Victim Age", name: "victimAge", type: "number" },
          { label: "Witness Name", name: "witnessName" },
          { label: "Witness Gender", name: "witnessGender" },
          { label: "Witness Age", name: "witnessAge", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="form-group">
            <label>{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        ))}
        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageChange} className="input-field" required />
        </div>
        <button type="submit" className="submit-btn mt-6">Submit Report</button>
      </form>
    </div>
  );
};

export default CrimeForm;
