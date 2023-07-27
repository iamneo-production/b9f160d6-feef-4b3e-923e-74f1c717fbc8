import React, { useEffect, useState } from "react";
import "./styles/History.css";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import api, { BASE_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const decodeToken = JSON.parse(localStorage.getItem("decodedToken"));
let customerid = decodeToken && decodeToken.id;

const History = () => {
  const [repair, setRepair] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs`);
        const customerRepairs = response.data.filter(
          (item) => item.customer && item.customer.id === customerid
        );
        setRepair(customerRepairs);
      } catch (error) {
        window.alert(error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (repairid, status) => {
    if (status === "Completed") {
      navigate(`/customer/history/${repairid}`);
    }
    else{
      window.alert("Service report not ready yet.")
    }
  };

  return (
    <div className="history">
      <Navbar />
      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>
        <section className="flex-[78%]">
          <div className="table mt-32 mb-6 m-auto" align="center">
            <h2 className="text-xl font-semibold text-center">
              Customer History
            </h2>
          </div>
          <div className="tableContent" align="center">
            <table id="customers">
              <tr>
                <th>Sl.No</th>
                <th>Device</th>
                <th>Employee incharge</th>
                <th>Status</th>
              </tr>

              {repair.map((item, index) => (
                <tr
                  data-index={index}
                  key={index}
                  onClick={() => handleRowClick(item.id, item.status)}
                  style={{
                    cursor: item.status === "completed" ? "pointer" : "auto",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.device.type}</td>
                  <td>{item.employee ? item.employee.name : "null"}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default History;
