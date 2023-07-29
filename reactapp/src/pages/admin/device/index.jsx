import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../../components/admin/Navbar";
import Sidebar from "../../../components/admin/Sidebar";
import api, { BASE_URL } from "../../../utils/api";

export default function DeviceManagement() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
    
      const response = await api.get(`${BASE_URL}/devices`);
      setDevices(response.data);
    } catch (error) {
      console.error("Error loading devices:", error);
    }
  };

  const deleteDevice = (id) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      api
        .delete(`${BASE_URL}/devices/${id}`)
        .then(() => {
          loadDevices(); // Refresh the device list after deletion
        })
        .catch((error) => {
          console.error("Error deleting device:", error);
        });
    }
  };

  const applyFilter = () => {
    const filteredDevices = devices.filter(
      (device) =>
        (filterType === "" ||
          device.type.toLowerCase().includes(filterType.toLowerCase())) &&
        (filterBrand === "" ||
          device.brand.toLowerCase().includes(filterBrand.toLowerCase()))
    );
    return filteredDevices;
  };

  return (
    <>
      <Navbar />
      <main className="flex w-screen" style={{ marginTop: "100px" }}>
        <section className="flex-[22%]">
          <Sidebar />
        </section>
        <div className="flex-[78%] flex flex-col justify-center items-center py-2 ">
          <h4 className="text-2xl font-bold text-slate-700 mb-6">
            All devices
          </h4>
          <input
            style={{ width: "960px" }}
            type="text"
            className="border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter by Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />

          <br />
          <div className="col-md-6">
            <input
              style={{ width: "960px" }}
              type="text"
              className="border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by Brand"
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
            />
          </div>
          <br />
          <section className="bg-slate-200 shadow-xl w-[60rem] m-auto p-6 ">
            <table className="w-full p-1 bg-cyan-600 text-white">
              <thead>
                <tr>
                  <th scope="col " className="py-2">
                    S.No
                  </th>
                  <th scope="col " className="py-2">
                    ID
                  </th>
                  <th scope="col " className="py-2">
                    Type
                  </th>
                  <th scope="col " className="py-2">
                    Brand
                  </th>
                  <th scope="col " className="py-2">
                    Model
                  </th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applyFilter()
                  .filter((item) =>
                    search === "" ? true : item.id.toString().includes(search)
                  )
                  .map((device, index) => (
                    <tr key={index} className="bg-white text-black text-center">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.model}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap flex items-center justify-evenly">
                        <Link to={`/admin/devices/${device.id}`}>
                          <FiEdit className="m-auto hover:scale-125 transition-all text-green-600 font-bold" />
                        </Link>
                        <button
                          className="inline-block px-4 py-2 text-sm font-medium text-red-500 hover:scale-125 transition-all"
                          onClick={() => deleteDevice(device.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
          <Link
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            to="/admin/devices/add"
            style={{ marginTop: "20px" }}
          >
            Add Device
          </Link>
        </div>
        <br />
      </main>
    </>
  );
}