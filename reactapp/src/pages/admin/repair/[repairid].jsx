import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import { useParams } from "react-router-dom";
import SidebarShow from "../../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../../utils/api";

const RepairID = () => {
  const [repair, setRepair] = useState({});
  const [show, setShow] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const param = useParams();
  const employeeURL = `${BASE_URL}/employees`;

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs/${param.repairid}`);
        const { id, customer, device, description, employee, status, date } =
          response.data;

        setRepair({
          id,
          customer,
          device,
          description,
          employee,
          status,
          date,
        });

        setSelectedEmployeeId(response.data.employee?.id || null);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepair();
  }, [param.repairid]);

  console.log(repair);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get(employeeURL);
        const filteredEmployees = response.data.filter(
          (employee) => employee.role !== "ADMIN"
        );
        setEmployeeList(filteredEmployees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, [employeeURL]);

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setRepair((prevState) => ({
      ...prevState,
      status: selectedStatus,
    }));
    setShow(false);
  };

  const emailmodify = (selectedEmail) => {
    const selectedEmployee = employeeList.find(
      (employee) => employee.email === selectedEmail
    );

    setRepair((prevState) => ({
      ...prevState,
      employeeEmail: selectedEmail,
      employee: selectedEmployee || null,
    }));
  };

  useEffect(() => {
    console.log(repair.employee);
  }, [repair.employee]);
  

  const handleSaveRepair = async () => {
    try {
      const { id, customer, device, description, status, employeeEmail, date } =
        repair;

      const selectedEmployee = employeeList.find(
        (employee) => employee.email === employeeEmail
      );

      const updatedData = {
        id,
        customer: { id: customer.id },
        device: { id: device.id },
        description,
        status,
        date,
        employee: { id: selectedEmployee?.id || null },
      };

      console.log(updatedData);

      await api.put(`${BASE_URL}/repairs/${param.repairid}`, updatedData);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <SidebarShow />
      <main>
        <h1 className="mt-24 mb-6 text-center text-2xl font-medium text-slate-700">
          Repair Info
        </h1>

        <form className="w-[50rem] m-auto flex flex-col gap-3 px-6 py-8 border-2 shadow-2xl">
          <section className="flex items-center gap-12 text-lg">
            <label className="px-2 font-semibold w-36" htmlFor="id">
              ID:
            </label>
            <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
              {param.repairid}
            </div>
          </section>

          <section className="flex items-center gap-12 text-lg">
            <label className="px-2 font-semibold w-36" htmlFor="name">
              Name:
            </label>
            <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
              {repair.customer && repair.customer.name}
            </div>
          </section>

          <section className="flex items-center gap-12 text-lg">
            <label className="px-2 font-semibold w-36" htmlFor="device_type">
              Device_Type:
            </label>

            <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
              {repair.device && repair.device.type}
            </div>
          </section>

          <section className="flex items-center gap-12 text-lg">
            <label className="px-2 font-semibold w-36" htmlFor="description">
              Description:
            </label>

            <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
              {repair.description}
            </div>
          </section>

          <section className="flex items-center gap-12 text-lg">
            <label className="px-2 font-semibold w-36" htmlFor="status">
              Status:
            </label>

            <select
              className="w-[34rem] h-12 font-medium bg-gray-100 text-gray-500 border-2 py-2 px-4"
              name="status"
              value={repair.status}
              onChange={handleStatusChange}
            >
              <option value="Incomplete">Select</option>
              <option value="Approved">Approved</option>
              <option value="Disapproved">Disapprove</option>
            </select>
          </section>

          <section className="flex items-center gap-12 text-lg">
            <label className="px-2 font-semibold w-36" htmlFor="employeeEmail">
              Assign_Employee:
            </label>
            {show ? (
              <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
                {repair.employee?.email}
              </div>
            ) : (
              <select
                className="w-[34rem] h-12 font-medium bg-gray-100 text-gray-500 border-2 py-2 px-4"
                name="employeeEmail"
                value={repair.employee?.email}
                onChange={(e) => emailmodify(e.target.value)}
              >
                {employeeList.map((employee) => (
                  <option key={employee.id} value={employee.email}>
                    {employee.email}
                  </option>
                ))}
              </select>
            )}
          </section>

          <section className="m-auto flex gap-4 mt-4">
            <button
              type="button"
              className="w-24 text-white py-1 text-xl font-semibold shadow-2xl bg-green-500 hover:bg-green-600 active:bg-green-400"
              onClick={handleSaveRepair}
            >
              Save
            </button>
          </section>
        </form>
      </main>
    </>
  );
};

export default RepairID;
