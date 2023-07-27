import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import {
  MdCloudDone,
  MdOutlineMiscellaneousServices,
  MdPendingActions,
} from "react-icons/md";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FaStamp, FaUserTie } from "react-icons/fa";
import api, { BASE_URL } from "../../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeHome = () => {
  
  const [totalServiceCount, setTotalServiceCount] = useState(0);
  const [approvedServiceCount, setApprovedServiceCount] = useState(0);
  const [completedServiceCount, setCompletedServiceCount] = useState(0);
  const [pendingServiceCount, setPendingServiceCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  const data = {
    labels: [
      "Service Requests",
      "Approved service",
      "Pending Service",
      "Service Completed",
    ],
    datasets: [
      {
        label: "Quantity",
        data: [
          totalServiceCount,
          approvedServiceCount,
          pendingServiceCount,
          completedServiceCount,
        ],
        backgroundColor: [
          "rgba(249, 123, 34, 0.8)",
          "rgba(82, 95, 225, 0.8)",
          "rgba(255, 120, 196, 0.8)",
          "rgba(130, 205, 71, 0.8)",
        ],
        borderColor: [
          "rgba(249, 123, 34, 0.8)",
          "rgba(82, 95, 225, 0.8)",
          "rgba(255, 120, 196, 0.8)",
          "rgba(130, 205, 71, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
    if (decodedToken && decodedToken.id) {
      fetchServiceCounts(decodedToken.id);
      fetchEmployeeCount();
    }
  }, []);

  const fetchEmployeeCount = async () => {
    try {
      const response = await api.get(`${BASE_URL}/employees`);
      setEmployeeCount(response.data.length);
    } catch (error) {
      console.error("Error fetching number of employees");
    }
  };

  const fetchServiceCounts = async (employeeId) => {
    try {
      const response = await api.get(`${BASE_URL}/repairs`);
      const allRepairs = response.data;

      const employeeRepairs = allRepairs.filter(
        (repair) => repair.employee && repair.employee.id === employeeId
      );

      const approvedCount = employeeRepairs.filter(
        (repair) => repair.status === "Accepted"
      ).length;

      const completedCount = employeeRepairs.filter(
        (repair) => repair.status === "Completed"
      ).length;

      const pendingCount = employeeRepairs.filter(
        (repair) =>
          repair.status === "Approved" || repair.status === "On progress"
      ).length;

      setTotalServiceCount(employeeRepairs.length);
      setApprovedServiceCount(approvedCount);
      setCompletedServiceCount(completedCount);
      setPendingServiceCount(pendingCount);
    } catch (error) {
      console.error("Error fetching service counts:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>

        <main className="flex-[78%]">
          <h1 className="mt-24 mb-6 text-center text-3xl font-bold text-gray-500">
            Dashboard
          </h1>
          <section className="mb-8 flex justify-center items-center gap-12 text-white">
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#F97B22] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <MdOutlineMiscellaneousServices className="m-auto text-3xl" />
              <h4>Total services</h4>
              <h4>{totalServiceCount}</h4>
            </div>
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#525FE1] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <FaStamp className="m-auto text-3xl" />
              <h4>Approved Sevice</h4>
              <h4>{approvedServiceCount}</h4>
            </div>
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#82CD47] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <MdCloudDone className="m-auto text-3xl" />
              <h4>Service done</h4>
              <h4>{completedServiceCount}</h4>
            </div>
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#FF78C4] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <MdPendingActions className="m-auto text-3xl" />
              <h4>Service pending</h4>
              <h4>{pendingServiceCount}</h4>
            </div>
          </section>
          <section className="flex items-center justify-center w-[45rem] m-auto gap-8 ">
            <div className="flex flex-col justify-evenly text-xl font-medium items-center text-white bg-red-500 w-72 h-40 py-6 px-3 rounded-lg hover:scale-110 transition-all shadow-2xl">
              <FaUserTie className="m-auto text-4xl text-yellow-400" />
              <h4>Total Staffs: {employeeCount}</h4>
            </div>
            <section className="w-80 ">
              <Doughnut data={data} />
            </section>
          </section>
        </main>
      </main>
    </>
  );
};

export default EmployeeHome;