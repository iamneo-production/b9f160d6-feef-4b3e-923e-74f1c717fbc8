import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import Sidebar from "../../../components/admin/Sidebar";
import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import api from "../../../utils/api";

const baseURL = "http://localhost:9000/customers";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(baseURL);
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error loading customers.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await api.delete(`${baseURL}/${id}`);
        setCustomers(customers.filter((customer) => customer.id !== id));
      } catch (error) {
        console.log("Error deleting customer:", error);
      }
    }
  };

  if (loading) {
    return (
      <p className="absolute top-1/2 left-1/2 text-3xl font-semibold text-cyan-600">
        Loading...
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>

        <section className="flex-[78%] mt-24 mx-8 flex flex-col justify-center items-center gap-6">
          <h4 className="text-center text-2xl tracking-wide font-bold text-gray-700 ">
            Registered Users
          </h4>
          <input
            className="bg-slate-200 border-none outline-none shadow-lg my-4 text-2xl w-[50rem] py-2 px-4 "
            placeholder="Search for customers..."
            type="search"
            name="searchCustomers"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <section className="bg-slate-200 shadow-xl w-[60rem] m-auto p-6 ">
            <table className="w-full p-1 bg-cyan-600 text-white ">
              <thead>
                <tr>
                  <th className="py-2 px-4 ">Sl.No</th>
                  <th className="py-2 ">ID</th>
                  <th className="py-2 ">Name</th>
                  <th className="py-2 ">Email</th>
                  <th className="py-2 ">Phone</th>

                  <th className="py-2 px-8">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center bg-white text-slate-800 font-medium py-2"
                    >
                      No results found...
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((item, index) => (
                    <tr
                      className="text-center hover:scale-105  bg-white text-black border hover:bg-slate-700 active:bg-slate-300 active:text-black hover:text-white transition-all "
                      key={item.id}
                    >
                      <td className="py-4 ">{index + 1}</td>
                      <td className="py-4 ">{item.id}</td>
                      <td className="py-4 ">{item.name}</td>
                      <td className="py-4 ">{item.email}</td>
                      <td className="py-4 ">{item.phoneNumber}</td>

                      <td className="py-4 flex items-center justify-center gap-6">
                        <NavLink to={`/admin/customers/${item.id}`}>
                          <FiEdit className="hover:scale-125 transition-all text-green-500 font-semibold" />
                        </NavLink>

                        <MdDelete
                          className="hover:scale-125 transition-all text-red-600 text-xl cursor-pointer"
                          onClick={() => deleteRecord(item.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </section>
      </main>
    </>
  );
};

export default Customers;
