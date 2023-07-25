import React, { useEffect, useState } from "react";
import { FaUserTie, FaUser } from "react-icons/fa";
import {
  MdOutlineMiscellaneousServices,
  MdCloudDone,
  MdSevereCold,
} from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import Piechart from "./Piechart";
import api, { BASE_URL } from "../../utils/api";

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [deviceCount, setdeviceCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [completedServiceCount, setCompletedServiceCount] = useState(0);

  useEffect(() => {
    fetchCustomerCount();
    fetchEmployeeCount();
    fetchServiceCount();
    fetchDeviceCount();
  }, []);

  const fetchCustomerCount = async () => {
    try {
      const response = await api.get("http://localhost:9000/customers");
      setCustomerCount(response.data.length);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };

  const fetchEmployeeCount = async () => {
    try {
      const response = await api.get("http://localhost:9000/employees");
      setEmployeeCount(response.data.length);
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  const fetchDeviceCount = async () => {
    try {
      const response = await api.get(`${BASE_URL}/devices`);
      setdeviceCount(response.data.length);
    } catch (error) {
      console.error("Error fetching device count:", error);
    }
  };

  const fetchServiceCount = async () => {
    try {
      const response = await api.get("http://localhost:9000/repairs");
      const allRepairs = response.data;

      setServiceCount(allRepairs.length);

      const completedRepairs = allRepairs.filter(
        (repair) => repair.status === "Completed"
      );
      setCompletedServiceCount(completedRepairs.length);
    } catch (error) {
      console.error("Error fetching service counts:", error);
    }
  };

  const pieChartData = {
    data2: {
      labels: ["Employees", "Customers"],
      datasets: [
        {
          label: "Total Strength",
          data: [employeeCount, customerCount],
          backgroundColor: [
            "rgba(255, 164, 27, 0.8)",
            "rgba(82, 95, 225, 0.8)",
          ],
          borderColor: ["rgba(255, 164, 27, 1)", "rgba(82, 95, 225, 1)"],
          borderWidth: 1,
        },
      ],
    },
    data: {
      labels: ["Service Requests", "All devices", "Service Completed"],
      datasets: [
        {
          label: "Quantity",
          data: [serviceCount, deviceCount, completedServiceCount],
          backgroundColor: [
            "rgba(239, 98, 98, 0.8)",
            "rgba(39, 55, 77, 0.8)",
            "rgba(130, 205, 71, 0.8)",
          ],
          borderColor: [
            "rgba(239, 98, 98, 0.8)",
            "rgba(39, 55, 77, 0.8)",
            "rgba(130, 205, 71, 0.8)",
          ],
          borderWidth: 1,
        },
      ],
    },
  };

  return (
    <main>
      <h1 className="mt-24 mb-6 text-center text-3xl font-bold text-gray-500">
        Dashboard
      </h1>
      <section className="mb-8 flex justify-center items-center gap-6 text-white">
        <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#525FE1] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
          <FaUser className="m-auto text-3xl" />
          <h4>Registered Users</h4>
          <h4>{customerCount}</h4>
        </div>
        <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#FFA41B] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
          <FaUserTie className="m-auto text-3xl" />
          <h4>Total Employees</h4>
          <h4>{employeeCount}</h4>
        </div>
        <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#27374D] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
          <MdSevereCold className="m-auto text-3xl" />
          <h4>All Devices</h4>
          <h4>{deviceCount}</h4>
        </div>
        <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#EF6262] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
          <MdOutlineMiscellaneousServices className="m-auto text-3xl" />
          <h4>Service Requests</h4>
          <h4>{serviceCount}</h4>
        </div>
        <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#82CD47] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
          <MdCloudDone className="m-auto text-3xl" />
          <h4>Service Done</h4>
          <h4>{completedServiceCount}</h4>
        </div>
      </section>
      <section className="w-80 h-72 p-2 m-auto my-6">
        <Piechart data={pieChartData} />
      </section>
    </main>
  );
};

export default Dashboard;
