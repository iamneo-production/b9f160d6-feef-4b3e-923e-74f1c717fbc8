import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../../components/admin/Navbar";
import Sidebar from "../../../components/admin/Sidebar";
import api, { BASE_URL } from "../../../utils/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await api.get(`${BASE_URL}/employees`);
    console.log(result);
    const filteredEmployees = result.data.filter(
      (employee) => employee.role !== "ADMIN"
    );
    setEmployees(filteredEmployees);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure, you want to delete this employee ?")) {
      try {
        await api.delete(`${BASE_URL}/employees/${id}`);
        loadEmployees();
      } catch (error) {
        window.alert(error);
        console.log("Error deleting employee");
      }
    }
  };

  const applyFilter = () => {
    const filteredEmployees = employees.filter(
      (employee) =>
        (filterName === "" ||
          employee.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (filterEmail === "" ||
          employee.email.toLowerCase().includes(filterEmail.toLowerCase()))
    );
    return filteredEmployees;
  };
  return (
    <>
      <Navbar />

      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>

        <section className="flex-[78%] mt-24 mx-8 flex flex-col justify-center items-center gap-6">
          <h4 className="text-center text-2xl tracking-wide font-bold text-gray-700 ">
            All Employees
          </h4>

          <div>
            <div className="col-md-6">
              <input
                style={{ width: "960px" }}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <br />
            <div className="col-md-6">
              <input
                style={{ width: "960px" }}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Filter by Email"
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </div>
            <br />
            <section className="bg-slate-200 shadow-xl w-[60rem] m-auto p-6 ">
              <table className="w-full p-1 bg-cyan-600 text-white ">
                <tr className="">
                  <th className="py-2">Sl.No</th>
                  <th className="py-2">ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Phone No.</th>
                  <th className="py-2">Actions</th>
                </tr>
                <>
                  {applyFilter()
                    .filter((item) =>
                      search === "" ? true : item.id.toString().includes(search)
                    )
                    .map((employee, index) => (
                      <tr key={index} className=" bg-white text-black ">
                        <td className="px-6 py-4 ">{index + 1}</td>
                        <td className="px-6 py-4 ">{employee.id}</td>
                        <td className="px-6 py-4 ">{employee.name}</td>
                        <td className="px-6 py-4 ">{employee.email}</td>
                        <td className="px-6 py-4 ">{employee.phoneNumber}</td>
                        <td className="flex">
                          <button className="px-6 py-4 ">
                            <Link to={`/admin/employees/${employee.id}`}>
                              <FiEdit className="m-auto hover:scale-125 transition-all text-green-500 font-medium" />
                            </Link>
                          </button>
                          <button
                            className="inline-block px-4 py-2 font-medium text-red-500 rounded hover:scale-125 "
                            onClick={() => deleteEmployee(employee.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              </table>
            </section>
            <Link
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              to={`/admin/employees/add`}
              style={{ marginTop: "20px" }}
            >
              Add Employee
            </Link>
          </div>
          <br />
        </section>
      </main>
    </>
  );
};

export default Employees;