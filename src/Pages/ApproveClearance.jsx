// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

import { Check, SquareMenu } from "lucide-react";
import axios from "axios";
import { getToken } from "../utils/helperFunctions";

const ApproveClearance = () => {
  const Clearance = [
    "College Bursar",
    "College Registrar",
    "Hall of Residence",
    "University Library",
    "Student Guild",
    "Police Post",
    "Games Union",
    "University Hospital",
    "Dean of Students",
    "University Bursar",
  ];

  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("authenticated") || false
  );

  const [approvalsData, setapprovalsData] = useState([]);

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const loginUser = sessionStorage.getItem("authenticated");
    if (loginUser) {
      setAuthenticated(loginUser);
    }
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8888/clearance/${authUser.DepartmentId}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (!authenticated) {
    window.alert("Not Authenticated");
    navigate("/");
  }

  const data = [
    {
      regNo: "09/U/10524/EVE",
      studentNo: "209013165",
      name: "BAKASHABA Julius",
      program: "BRA",
    },
    {
      regNo: "09/U/10531/EVE",
      studentNo: "209013174",
      name: "EKASHION Everlyn",
      program: "BIT",
    },
    {
      regNo: "09/U/10544/EVE",
      studentNo: "209013190",
      name: "KAPKWEYEK Kisajoram",
      program: "CSC",
    },
    {
      regNo: "09/U/10545/EVE",
      studentNo: "209013191",
      name: "KARUNGI Edina",
      program: "BIT",
    },
    {
      regNo: "09/U/16510/EVE",
      studentNo: "209013079",
      name: "NAKAWOOYA Joyce",
      program: "BIT",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 mx-[10rem]">
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-[7rem]">
          <div className="flex gap-3 items-center">
            <p className={"p-3 bg-blue-400 rounded"}>
              <SquareMenu className={"block text-white"} />
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-2 md:mb-0">
              Clearance Unit: College Busar
            </h1>
          </div>
        </div>
        <div>
          <div className={"bg-white p-3"}>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-2 px-4 border-b">Reg No</th>
                  <th className="py-2 px-4 border-b">Student No</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Program</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    <td className="py-2 px-4 border-b">{student.regNo}</td>
                    <td className="py-2 px-4 border-b">{student.studentNo}</td>
                    <td className="py-2 px-4 border-b">{student.name}</td>
                    <td className="py-2 px-4 border-b">{student.program}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-600 font-semibold hover:underline">
                        Approve
                      </button>
                      {" | "}
                      <button className="text-blue-600 font-semibold hover:underline">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveClearance;
