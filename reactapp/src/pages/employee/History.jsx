import React, { useEffect, useState } from "react";
import "./styles/History.css";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import api, { BASE_URL } from "../../utils/api";

const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs`);
        const allData = response.data;
        const employeeRepair = allData.filter(
          (item) => item.employee && item.employee.id === decodedToken.id
        );
        setHistory(employeeRepair);
        console.log(history);
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    };
    fetchHistory();
  }, [BASE_URL]);

  return (
    <div>
      <Navbar />
      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>
        <section className="flex-[78%]">
          <h2
            className="text-xl mb-6 font-semibold "
            style={{ textAlign: "center", marginTop: "6rem" }}
          >
            Service History
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer Name</th>
                  <th>Brand Name</th>
                  <th>Brand Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td style={cellStyle}>{row.id}</td>
                    <td style={cellStyle}>{row.customer.name}</td>

                    <td style={cellStyle}>{row.device.brand}</td>
                    <td style={cellStyle}>{row.device.type}</td>
                    <td>
                      <span style={statusStyle(row.status)}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const cellStyle = {
  padding: "10px 16px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

function statusStyle(status) {
  const { textColor, backgroundColor } = getStatusColors(status);
  return {
    padding: "4px",
    borderRadius: "4px",
    color: textColor,
    fontWeight: 690,
    background: backgroundColor,
  };
}

function getStatusColors(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return {
        textColor: "#2196f3",
        backgroundColor: "#bbdefb",
      };
    case "accepted":
      return {
        textColor: "#1A5D1A",
        backgroundColor: "#ADE792",
      };

    default:
      return {
        textColor: "#f71134",
        backgroundColor: "#FFCCCB",
      };
  }
}

export default History;