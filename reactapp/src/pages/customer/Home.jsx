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
import api, { BASE_URL } from "../../utils/api";


ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [totalRequests, setTotalRequest] = useState(0);
  const [completedServices, setCompletedServices] = useState(0);
  const [pendingServices, setPendingServices] = useState(0);

  const data = {
    labels: ["Service Requests", "Pending Service", "Service Completed"],
    datasets: [
      {
        label: "Quantity",
        data: [totalRequests, pendingServices, completedServices],
        backgroundColor: [
          "rgba(82, 95, 225, 0.8)",
          "rgba(255, 120, 196, 0.8)",
          "rgba(130, 205, 71, 0.8)",
        ],
        borderColor: [
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
      fetchServiceCount(decodedToken.id);
    }
  }, []);

  const fetchServiceCount = async (customerid) => {
    try {
      const response = await api.get(`${BASE_URL}/repairs`);
      const alldata = response.data;
      const CustomerRepairs = alldata.filter(
        (item) => item.customer && item.customer.id === customerid
      );

      const complete = CustomerRepairs.filter(
        (item) => item.status === "Completed"
      );

      const pending = CustomerRepairs.filter(
        (item) => item.status !== "Completed"
      );

      setTotalRequest(CustomerRepairs.length);
      setCompletedServices(complete.length);
      setPendingServices(pending.length);
    } catch (error) {
      console.error(error);
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
          <section className="mb-8 flex justify-center items-center gap-6 text-white">
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#525FE1] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <MdOutlineMiscellaneousServices className="m-auto text-3xl" />
              <h4>Service requested</h4>
              <h4>{totalRequests}</h4>
            </div>
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#82CD47] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <MdCloudDone className="m-auto text-3xl" />
              <h4>Service done</h4>
              <h4>{completedServices}</h4>
            </div>
            <div className="flex flex-col justify-evenly text-xl font-medium items-center  bg-[#FF78C4] w-52 h-44 py-6 px-3 rounded-lg shadow-lg hover:scale-110 transition-all">
              <MdPendingActions className="m-auto text-3xl" />
              <h4>Service pending</h4>
              <h4>{pendingServices}</h4>
            </div>
          </section>
          <section className="w-72 m-auto">
            <Doughnut data={data} />
          </section>
        </main>
      </main>
    </>
  );
};

export default Home;
