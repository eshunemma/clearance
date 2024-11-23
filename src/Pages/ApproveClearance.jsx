// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { SquareMenu } from "lucide-react";
import axios from "axios";
import {
  baseURL,
  getStatusClass,
  getToken,
  replaceObjectInArray,
} from "../utils/helperFunctions";

const ApproveClearance = () => {
  const navigate = useNavigate();

  const [approvalsData, setapprovalsData] = useState([]);

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const loginUser = sessionStorage.getItem("authenticated");
    if (!loginUser) {
      return navigate("/login");
    }
    const getData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/approvals/department/${authUser.DepartmentId}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setapprovalsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const approveClearance = async (id, status) => {
    try {
      const response = await axios.put(
        `${baseURL}/approvals/${id}`,
        {
          status: `${status}`,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setapprovalsData(
        replaceObjectInArray(
          approvalsData,
          response?.data?.id,
          response?.data?.status
        )
      );
      // setapprovalsData();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickApprove = (e) => {
    approveClearance(e.target.id, "approved");
  };

  const onClickDisapprove = (e) => {
    approveClearance(e.target.id, "rejected");
  };

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
                  <th className="py-2 px-4 border-b">Student No</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {approvalsData.map((student, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    <td className="py-2 px-4 border-b">{student?.user?.id}</td>
                    <td className="py-2 px-4 border-b">
                      {student.user.firstName} {student?.user?.lastName}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusClass(
                        student?.status
                      )}`}
                    >
                      {student?.status}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        id={student?.id}
                        className="text-blue-600 font-semibold hover:underline"
                        onClick={onClickApprove}
                      >
                        Approve
                      </button>
                      {" | "}
                      <button
                        id={student?.id}
                        className="text-blue-600 font-semibold hover:underline"
                        onClick={onClickDisapprove}
                      >
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
