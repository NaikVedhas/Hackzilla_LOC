// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract local {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    struct Case {
        address inspector;
        string place;
        string timeDate;
        string crimeSection; //these details of crime name will  be fetched from api
        string crimeDescription;
        string victimId;
        string victimAadharNumber;
        string[] witnessName; 
        string[] witnessAadharNumber;
        string[] evidenceImages; // IPFS hashes
        string[] evidenceDescriptions;
        string[] evidenceVideos;
        bool isClosed;
    }

    mapping(uint256 => Case) public cases;  // Case ID => Case details
    uint256 public nthCase;
    mapping(address => uint256[]) public inspectorCases; // Inspector address => Array of Case IDs

    event FIRRegistered(uint256 indexed caseId, address indexed inspector, string place);
    event WitnessAdded(uint256 indexed caseId, string witnessName, string witnessAadharNumber);
    event EvidenceAdded(uint256 indexed caseId, string evidenceDescriptions);
    event CaseClosed(uint256 indexed caseId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyInspector(uint256 caseId) {
        require(msg.sender == cases[caseId].inspector, "Only inspector can modify");
        _;
    }

    function registerFIR(
        string memory _place,
        string memory _timeDate,
        string memory _crimeSection,
        string memory _victimId,
        string memory _victimAadharNumber,
        string memory _witnessName,
        string memory _witnessAadharNumber,
        string memory _evidenceImages,
        string memory _evidenceDescriptions,
        string memory _evidenceVideos,
        string memory _crimeDescription
    ) public {
        Case storage newCase = cases[nthCase];
        newCase.inspector = msg.sender;
        newCase.place = _place;
        newCase.timeDate = _timeDate;
        newCase.crimeSection = _crimeSection;
        newCase.victimId = _victimId;
        newCase.victimAadharNumber = _victimAadharNumber;
        newCase.witnessName.push(_witnessName);
        newCase.witnessAadharNumber.push(_witnessAadharNumber);
        newCase.isClosed = false;
        newCase.evidenceDescriptions.push(_evidenceDescriptions);
        newCase.evidenceImages.push(_evidenceImages);
        newCase.evidenceVideos.push(_evidenceVideos);
        newCase.crimeDescription = _crimeDescription;

        // Map the inspector to this case ID
        inspectorCases[msg.sender].push(nthCase);

        emit FIRRegistered(nthCase, msg.sender, _place);
        nthCase++;
    }

    function addWitness(uint256 caseId, string memory _witnessName, string memory _witnessAadharNumber) 
        public onlyInspector(caseId) 
    {
        cases[caseId].witnessName.push(_witnessName);  //nthCase=caseId only ha 
        cases[caseId].witnessAadharNumber.push(_witnessAadharNumber);
        emit WitnessAdded(caseId, _witnessName, _witnessAadharNumber);
    }

    function addEvidence(
        uint256 caseId,
        string memory _evidenceDescriptions,
        string memory _evidenceImages,
        string memory _evidenceVideos
    ) public onlyInspector(caseId) {

        cases[caseId].evidenceDescriptions.push(_evidenceDescriptions);
        cases[caseId].evidenceImages.push(_evidenceImages);
        cases[caseId].evidenceVideos.push(_evidenceVideos);

        emit EvidenceAdded(caseId, _evidenceDescriptions);
    }

    function closeCase(uint256 caseId) public onlyInspector(caseId) {
       
        cases[caseId].isClosed = true;
        emit CaseClosed(caseId);
    }

    function getInspectorCases() public view returns (uint256[] memory) {
        return inspectorCases[msg.sender];
    }

    function getCase(uint caseId) public view returns(Case memory){
        return cases[caseId];
    }
}
