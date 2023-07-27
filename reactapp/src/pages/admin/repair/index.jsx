import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import Sidebar from "../../../components/admin/Sidebar";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import api, { BASE_URL } from "../../../utils/api";

const Repairs = () => {
  const [repairRecords, setRepairRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs`);
        setRepairRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching the database");
      }
    };
    fetchData();
  }, []);

  const deleteRecord = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this repair details?")
    ) {
      try {
        await api.delete(`${BASE_URL}/repairs/${id}`);
        setRepairRecords(repairRecords.filter((repair) => repair.id !== id));
      } catch (error) {
        console.log("error deleting repair record");
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = repairRecords.filter((item) => {
    const customerName = (item.customer && item.customer.name) ? item.customer.name.toLowerCase() : "";
    const deviceType = (item.device && item.device.type) ? item.device.type.toLowerCase() : "";
    const status = (item.status) ? item.status.toLowerCase() : "";
    const searchQuery = searchTerm.toLowerCase();
    return (
      customerName.includes(searchQuery) ||
      deviceType.includes(searchQuery) ||
      status.includes(searchQuery)
    );
  });

  const lifoRecords = [...filteredRecords].reverse();

  return (
    <>
      <Navbar />
      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>

        <section className="flex-[78%] mt-24 mx-8 flex flex-col justify-center items-center gap-6">
          <h4 className="text-center text-2xl tracking-wide font-bold text-gray-700 ">
            All Repairs
          </h4>

          <input
            className="bg-slate-200 border-none shadow-lg my-4 text-2xl w-[50rem] py-2 px-4 outline-none "
            placeholder="Search for repairs..."
            type="search"
            name="searchrepairs"
            value={searchTerm}
            onChange={handleSearch}
          />
          <section className="bg-slate-200 shadow-xl w-[60rem] m-auto p-6 ">
            <table className="w-full p-1 bg-cyan-600 text-white ">
              <thead>
                <tr>
                  <th className="py-2">Repair_ID</th>
                  <th className="py-2">Customer Name</th>
                  <th className="py-2">Device type</th>
                  <th className="py-2">Employee responsible</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {lifoRecords.map((item) => (
                  <tr
                    className="text-center hover:scale-105  bg-white text-black border hover:bg-slate-700 active:bg-slate-300 active:text-black hover:text-white transition-all "
                    key={item.id}
                  >
                    <td className="py-4">{item.id}</td>
                    <td className="py-4">{item.customer.name}</td>
                    <td className="py-4">{item.device.type}</td>
                    <td className="py-4">{item.employeeEmail}</td>
                    <td className="py-4">{item.status}</td>
                    <td className="py-4 px-6 flex justify-evenly items-center gap-6">
                      <NavLink to={`/admin/repairs/${item.id}`}>
                        <FiEdit className="m-auto hover:scale-125 transition-all text-green-600" />
                      </NavLink>
                      <MdDelete
                        className=" text-red-500 text-xl m-auto cursor-pointer"
                        onClick={() => deleteRecord(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </main>
    </>
  );
};

export default Repairs;
