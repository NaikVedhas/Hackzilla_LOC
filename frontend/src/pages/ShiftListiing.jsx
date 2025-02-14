import { useEffect, useState } from 'react';
import { Shield, Search, Settings, ChevronDown, X } from 'lucide-react';

const initialOfficers = [
  {
      "id": 1,
      "name": "Vijay Kumar",
      "rank": "Inspector",
      "seniority": "15 years",
      "age": 42,
      "arrests": 234,
      "totalCases": 700,
      "casesPending": 150,
      "totalConvictions": 198,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "Central District",
        "startTime": "08:00",
        "endTime": "16:00"
      }
    },
    {
      "id": 2,
      "name": "Priya Sharma",
      "rank": "Sub-Inspector",
      "seniority": "8 years",
      "age": 35,
      "arrests": 156,
      "totalCases": 500,
      "casesPending": 100,
      "totalConvictions": 125,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "North District",
        "startTime": "16:00",
        "endTime": "00:00"
      }
    },
    {
      "id": 3,
      "name": "Rohan Gupta",
      "rank": "Detective",
      "seniority": "12 years",
      "age": 38,
      "arrests": 189,
      "totalCases": 600,
      "casesPending": 150,
      "totalConvictions": 140,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "South District",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    },
    {
      "id": 4,
      "name": "Anjali Singh",
      "rank": "Assistant Commissioner of Police",
      "seniority": "10 years",
      "age": 40,
      "arrests": 210,
      "totalCases": 750,
      "casesPending": 200,
      "totalConvictions": 180,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "West District",
        "startTime": "10:00",
        "endTime": "18:00"
      }
    },
    {
      "id": 5,
      "name": "Rajesh Patel",
      "rank": "Senior Inspector",
      "seniority": "20 years",
      "age": 50,
      "arrests": 320,
      "totalCases": 900,
      "casesPending": 250,
      "totalConvictions": 230,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "East District",
        "startTime": "07:00",
        "endTime": "15:00"
      }
    },
    {
      "id": 6,
      "name": "Neha Joshi",
      "rank": "Constable",
      "seniority": "5 years",
      "age": 28,
      "arrests": 120,
      "totalCases": 400,
      "casesPending": 150,
      "totalConvictions": 110,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "Central District",
        "startTime": "14:00",
        "endTime": "22:00"
      }
    },
    {
      "id": 7,
      "name": "Arjun Reddy",
      "rank": "Detective",
      "seniority": "14 years",
      "age": 39,
      "arrests": 275,
      "totalCases": 800,
      "casesPending": 250,
      "totalConvictions": 210,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "South District",
        "startTime": "08:00",
        "endTime": "16:00"
      }
    },
    {
      "id": 8,
      "name": "Kavita Patel",
      "rank": "Sergeant",
      "seniority": "7 years",
      "age": 34,
      "arrests": 190,
      "totalCases": 650,
      "casesPending": 200,
      "totalConvictions": 168,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "North District",
        "startTime": "06:00",
        "endTime": "14:00"
      }
    },
    {
      "id": 9,
      "name": "Alok Verma",
      "rank": "Constable",
      "seniority": "3 years",
      "age": 28,
      "arrests": 80,
      "totalCases": 200,
      "casesPending": 60,
      "totalConvictions": 50,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "West District",
        "startTime": "14:00",
        "endTime": "22:00"
      }
    },
    {
      "id": 10,
      "name": "Meera Choudhary",
      "rank": "Sub-Inspector",
      "seniority": "6 years",
      "age": 32,
      "arrests": 130,
      "totalCases": 350,
      "casesPending": 80,
      "totalConvictions": 100,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "East District",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    },
    {
      "id": 11,
      "name": "Rahul Mehta",
      "rank": "Inspector",
      "seniority": "10 years",
      "age": 38,
      "arrests": 200,
      "totalCases": 600,
      "casesPending": 180,
      "totalConvictions": 150,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "Central District",
        "startTime": "07:00",
        "endTime": "15:00"
      }
    },
    {
      "id": 12,
      "name": "Seema Nair",
      "rank": "Assistant Sub-Inspector",
      "seniority": "4 years",
      "age": 29,
      "arrests": 90,
      "totalCases": 250,
      "casesPending": 80,
      "totalConvictions": 70,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "North District",
        "startTime": "16:00",
        "endTime": "00:00"
      }
    },
    {
      "id": 13,
      "name": "Sanjay Yadav",
      "rank": "Detective",
      "seniority": "11 years",
      "age": 37,
      "arrests": 170,
      "totalCases": 550,
      "casesPending": 130,
      "totalConvictions": 140,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "South District",
        "startTime": "08:00",
        "endTime": "16:00"
      }
    },
    {
      "id": 14,
      "name": "Rekha Singh",
      "rank": "Head Constable",
      "seniority": "9 years",
      "age": 36,
      "arrests": 160,
      "totalCases": 400,
      "casesPending": 100,
      "totalConvictions": 120,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "West District",
        "startTime": "10:00",
        "endTime": "18:00"
      }
    },
    {
      "id": 15,
      "name": "Amit Sharma",
      "rank": "Inspector",
      "seniority": "18 years",
      "age": 45,
      "arrests": 280,
      "totalCases": 700,
      "casesPending": 200,
      "totalConvictions": 200,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "East District",
        "startTime": "07:00",
        "endTime": "15:00"
      }
    },
    {
      "id": 16,
      "name": "Pooja Verma",
      "rank": "Constable",
      "seniority": "2 years",
      "age": 25,
      "arrests": 60,
      "totalCases": 150,
      "casesPending": 50,
      "totalConvictions": 40,
      "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
      "shift": {
        "area": "Central District",
        "startTime": "14:00",
        "endTime": "22:00"
      }
    },
    {
        "id": 17,
        "name": "Nisha Menon",
        "rank": "Constable",
        "seniority": "4 years",
        "age": 29,
        "arrests": 100,
        "totalCases": 300,
        "casesPending": 80,
        "totalConvictions": 80,
        "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
        "shift": {
          "area": "South District",
          "startTime": "15:00",
          "endTime": "23:00"
        }
      },
      {
        "id": 18,
        "name": "Gaurav Choudhary",
        "rank": "Sub-Inspector",
        "seniority": "9 years",
        "age": 35,
        "arrests": 180,
        "totalCases": 550,
        "casesPending": 150,
        "totalConvictions": 140,
        "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
        "shift": {
          "area": "West District",
          "startTime": "08:00",
          "endTime": "16:00"
        }
      },
      {
        "id": 19,
        "name": "Jyoti Verma",
        "rank": "Inspector",
        "seniority": "12 years",
        "age": 39,
        "arrests": 220,
        "totalCases": 650,
        "casesPending": 180,
        "totalConvictions": 170,
        "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
        "shift": {
          "area": "East District",
          "startTime": "09:00",
          "endTime": "17:00"
        }
      },
      
        {
          "id": 20,
          "name": "Amit Sharma",
          "rank": "Inspector",
          "seniority": "14 years",
          "age": 40,
          "arrests": 210,
          "totalConvictions": 190,
          "casesPending": 120,
          "totalCases": 540,
          "profilePic": "https://randomuser.me/api/portraits/men/1.jpg",
          "shift": {
            "area": "North District",
            "startTime": "07:00",
            "endTime": "15:00"
          }
        },
        {
          "id": 21,
          "name": "Sonia Verma",
          "rank": "Sub-Inspector",
          "seniority": "9 years",
          "age": 33,
          "arrests": 140,
          "totalConvictions": 120,
          "casesPending": 90,
          "totalCases": 370,
          "profilePic": "https://randomuser.me/api/portraits/women/2.jpg",
          "shift": {
            "area": "Central District",
            "startTime": "15:00",
            "endTime": "23:00"
          }
        },
        {
          "id": 22,
          "name": "Ravi Desai",
          "rank": "Detective",
          "seniority": "11 years",
          "age": 37,
          "arrests": 175,
          "totalConvictions": 150,
          "casesPending": 130,
          "totalCases": 480,
          "profilePic": "https://randomuser.me/api/portraits/men/3.jpg",
          "shift": {
            "area": "South District",
            "startTime": "08:00",
            "endTime": "16:00"
          }
        },
        {
          "id": 23,
          "name": "Pooja Nair",
          "rank": "Assistant Commissioner of Police",
          "seniority": "12 years",
          "age": 41,
          "arrests": 220,
          "totalConvictions": 200,
          "casesPending": 180,
          "totalCases": 620,
          "profilePic": "https://randomuser.me/api/portraits/women/4.jpg",
          "shift": {
            "area": "West District",
            "startTime": "10:00",
            "endTime": "18:00"
          }
        },
        {
          "id": 24,
          "name": "Karan Malhotra",
          "rank": "Senior Inspector",
          "seniority": "18 years",
          "age": 48,
          "arrests": 300,
          "totalConvictions": 220,
          "casesPending": 240,
          "totalCases": 800,
          "profilePic": "https://randomuser.me/api/portraits/men/5.jpg",
          "shift": {
            "area": "East District",
            "startTime": "06:00",
            "endTime": "14:00"
          }
        },
        {
          "id": 25,
          "name": "Divya Chauhan",
          "rank": "Constable",
          "seniority": "4 years",
          "age": 27,
          "arrests": 95,
          "totalConvictions": 80,
          "casesPending": 60,
          "totalCases": 250,
          "profilePic": "https://randomuser.me/api/portraits/women/6.jpg",
          "shift": {
            "area": "West District",
            "startTime": "18:00",
            "endTime": "02:00"
          }
        },
        [
          {
            "id": 1,
            "name": "Vijay Kumar",
            "rank": "Inspector",
            "seniority": "15 years",
            "age": 42,
            "arrests": 234,
            "totalCases": 700,
            "casesPending": 150,
            "totalConvictions": 198,
            "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
            "shift": {
              "area": "Central District",
              "startTime": "08:00",
              "endTime": "16:00"
            }
          },
          {
            "id": 2,
            "name": "Arun Sharma",
            "rank": "Sub-Inspector",
            "seniority": "10 years",
            "age": 38,
            "arrests": 180,
            "totalCases": 500,
            "casesPending": 120,
            "totalConvictions": 140,
            "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
            "shift": {
              "area": "North Zone",
              "startTime": "09:00",
              "endTime": "17:00"
            }
          },
          {
            "id": 3,
            "name": "Rahul Verma",
            "rank": "Head Constable",
            "seniority": "8 years",
            "age": 35,
            "arrests": 120,
            "totalCases": 400,
            "casesPending": 80,
            "totalConvictions": 100,
            "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
            "shift": {
              "area": "South Division",
              "startTime": "10:00",
              "endTime": "18:00"
            }
          },
          {
            "id": 4,
            "name": "Sandeep Joshi",
            "rank": "Constable",
            "seniority": "5 years",
            "age": 30,
            "arrests": 90,
            "totalCases": 300,
            "casesPending": 60,
            "totalConvictions": 80,
            "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
            "shift": {
              "area": "West Precinct",
              "startTime": "12:00",
              "endTime": "20:00"
            }
          },
          {
            "id": 5,
            "name": "Amit Patil",
            "rank": "Assistant Commissioner",
            "seniority": "20 years",
            "age": 50,
            "arrests": 300,
            "totalCases": 1000,
            "casesPending": 200,
            "totalConvictions": 250,
            "profilePic": "https://media.istockphoto.com/id/1126790989/vector/policeman-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people.jpg?s=612x612&w=0&k=20&c=_3XHylXNRush4DllluRW_lyTnP0a87oMMgd9yaIustY=",
            "shift": {
              "area": "East Division",
              "startTime": "07:00",
              "endTime": "15:00"
            }
          }
      ]
      
    ];

function ShiftListing() {
  const [officers, setOfficers] = useState(initialOfficers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeSettingsId, setActiveSettingsId] = useState(null);

  const sortFields = [
    { field: 'name', label: 'Name' },
    { field: 'age', label: 'Age' },
    { field: 'rank', label: 'Rank' },
    { field: 'seniority', label: 'Seniority' },
    { field: 'arrests', label: 'Arrests' },
    { field: 'totalCases', label: 'Total Cases' },
    { field: 'casesPending', label: 'Pending Cases' },
    { field: 'totalConvictions', label: 'Convictions' }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setShowSortMenu(false);
  };

  const handleShiftUpdate = (officerId, field, value) => {
    setOfficers(officers.map(officer => 
      officer.id === officerId 
        ? { 
            ...officer, 
            shift: { 
              ...officer.shift, 
              [field]: value 
            } 
          }
        : officer
    ));
  };

  const filteredAndSortedOfficers = officers
  .filter(officer => 
    (officer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    officer.rank?.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  .sort((a, b) => {
    let comparison = 0;
    if (typeof a[sortField] === 'number') {
      comparison = a[sortField] - b[sortField];
    } else {
      comparison = String(a[sortField]).localeCompare(String(b[sortField]));
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });


  return (
    <div className="min-h-screen bg-[#000000] text-gray-100 w-[100vw] p-16">
      <div className="max-w-7xl mx-auto bg-[#2e2e2e] p-11 rounded-2xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-purple-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Police Shift Management
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search officers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 h-[50px] w-64 bg-[#1e1e1e] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="px-4 py-2 h-[50px] bg-[#232323] rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
              >
                Sort by
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48  rounded-lg  shadow-lg py-2 z-10">
                  {sortFields.map(({ field, label }) => (
                    <button
                      key={field}
                      onClick={() => handleSort(field)}
                      className={`w-full px-4 py-2 text-left  hover:bg-gray-700 transition-colors ${
                        sortField === field ? 'text-purple-500' : ''
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="grid gap-4">
          {filteredAndSortedOfficers.map((officer) => (
            <div
              key={officer.id}
              className="bg-[#1e1e1e] rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={officer.profilePic}
                  alt={officer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{officer.name}</h3>
                  <p className="text-gray-400">{officer.rank} • {officer.seniority}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <p className="text-sm text-gray-400">Arrests</p>
                    <p className="font-semibold">{officer.arrests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Cases</p>
                    <p className="font-semibold">{officer.totalCases}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pending</p>
                    <p className="font-semibold">{officer.casesPending}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Convictions</p>
                    <p className="font-semibold">{officer.totalConvictions}</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setActiveSettingsId(activeSettingsId === officer.id ? null : officer.id)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  {activeSettingsId === officer.id && (
                    <div className="absolute right-0 mt-2 w-72 bg-gray-700 rounded-lg shadow-2xl p-4 z-20">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">Shift Settings</h4>
                        <button
                          onClick={() => setActiveSettingsId(null)}
                          className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Area Allocated</label>
                          <input
                            type="text"
                            value={officer.shift.area}
                            onChange={(e) => handleShiftUpdate(officer.id, 'area', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Shift Start</label>
                          <input
                            type="time"
                            value={officer.shift.startTime}
                            onChange={(e) => handleShiftUpdate(officer.id, 'startTime', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Shift End</label>
                          <input
                            type="time"
                            value={officer.shift.endTime}
                            onChange={(e) => handleShiftUpdate(officer.id, 'endTime', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShiftListing;
