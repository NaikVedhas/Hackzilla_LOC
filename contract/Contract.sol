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
        string crimeAct; //these details of crime name will  be fetched from api
        string crimeSection;
        string crimeDescription;
        string victimName;
        uint256 victimAge;
        string victimGender;
        bool victimAliveDead;  // false = dead
        string victimPhoto;
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
        string memory _crimeAct,
        string memory _crimeSection,
        string memory _victimName,
        uint256 _victimAge,
        string memory _victimGender,
        bool _victimAliveDead,
        string memory _victimPhoto,
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
        newCase.crimeAct = _crimeAct;
        newCase.crimeSection = _crimeSection;
        newCase.victimName = _victimName;
        newCase.victimAge = _victimAge;
        newCase.victimGender = _victimGender;
        newCase.victimAliveDead = _victimAliveDead;
        newCase.victimPhoto = _victimPhoto;
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
        Case storage currentCase = cases[caseId];   //nthCase=caseId only ha 
        require(!currentCase.isClosed, "Cannot add witness to a closed case");

        currentCase.witnessName.push(_witnessName);
        currentCase.witnessAadharNumber.push(_witnessAadharNumber);

        emit WitnessAdded(caseId, _witnessName, _witnessAadharNumber);
    }

    function addEvidence(
        uint256 caseId,
        string memory _evidenceDescriptions,
        string memory _evidenceImages,
        string memory _evidenceVideos
    ) public onlyInspector(caseId) {
        Case storage currentCase = cases[caseId];
        require(!currentCase.isClosed, "Cannot add evidence to a closed case");

        currentCase.evidenceDescriptions.push(_evidenceDescriptions);
        currentCase.evidenceImages.push(_evidenceImages);
        currentCase.evidenceVideos.push(_evidenceVideos);

        emit EvidenceAdded(caseId, _evidenceDescriptions);
    }

    function closeCase(uint256 caseId) public onlyInspector(caseId) {
        Case storage currentCase = cases[caseId];
        require(!currentCase.isClosed, "Case is already closed");

        currentCase.isClosed = true;
        emit CaseClosed(caseId);
    }

    function getInspectorCases() public view returns (uint256[] memory) {
        return inspectorCases[msg.sender];
    }
}
