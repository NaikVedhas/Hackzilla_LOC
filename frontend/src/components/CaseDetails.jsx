import React from 'react';

const CaseDetails = ({ caseData }) => {
  return (
    <div className="relative space-y-4 p-4 rounded-lg shadow-lg ">
  {/* Blinking dot */}
  <div className="flex gap-5 justify-end items-center">
    <p className='-translate-x-9 -translate-y-1'>{caseData.isClosed?"closed":"live"}</p>
  <div
    className={`absolute  w-5 h-5 rounded-full ${
      caseData.isClosed ? "bg-red-600" : "bg-green-900"
    } animate-ping`}
  ></div>
  </div>
  <h3 className="text-xl font-semibold text-purple-500 -translate-y-[50px]">Case #{caseData.caseId}</h3>

  <div className="space-y-2">
    <div className="flex justify-between">
    <p className="flex items-center gap-5">
      <strong>
        <i className="bx bxs-location-plus text-4xl text-red-600" />
      </strong>
      {caseData.place}
    </p>
    <p className="flex items-center gap-5">
      <strong>
        <i className="bx bx-time-five text-4xl"></i>
      </strong>
      {caseData.timeDate}
    </p>
    </div>
    <p>
      <strong>Crime Section:</strong> {caseData.crimeSection}
    </p>
    <p>
      <strong>Crime Description:</strong> {caseData.crimeDescription}
    </p>
    <p>
      {/* <strong>Status:</strong> {caseData.isClosed ? "Closed" : "Open"} */}
    </p>
  </div>
</div>

  );
};

export default CaseDetails;
