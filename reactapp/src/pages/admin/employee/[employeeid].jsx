import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/admin/Navbar";
import SidebarShow from "../../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../../utils/api";

export default function EditEmployee() {
  let navigate = useNavigate();
  const params = useParams();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  console.log(params);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(
          `${BASE_URL}/employees/${params.employeeid}`
        );
        const { id, name, password, role, email, phoneNumber } = response.data;
        setEmployee({ id, name, password, role, email, phoneNumber });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [params.employeeid]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    try {
      console.log(employee);
      await api.put(`${BASE_URL}/employees/${params.employeeid}`, employee);
      setIsEditing(true);
      window.alert("Edited successfully");
      navigate("/admin/employees");
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) {
    return (
      <div className="m-auto my-96 w-16 text-xl font-bold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <SidebarShow />
      <div
        className="container bg-cyan-600 w-[35rem] m-auto py-2 shadow-xl"
        style={{ marginTop: "120px" }}
      >
        <h2 className="text-center m-2 text-xl font-medium text-white">
          Update Employee
        </h2>
        <div className="w-[35rem] border p-4 shadow bg-white">
          <form>
            <div className="mb-4 flex gap-4 items-center">
              <label htmlFor="ID" className="form-label w-36 font-medium">
                Employee_ID:
              </label>
              <input
                type="number"
                className="form-input w-96 py-1 px-4 text-lg border-2"
                placeholder="Employee ID"
                name="id"
                value={employee.id}
                disabled
              />
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <label htmlFor="role" className="form-label w-36 font-medium">
                Role:
              </label>
              <input
                type="text"
                className="form-input w-96 py-1 px-4 text-lg border-2"
                placeholder="role"
                name="role"
                value={employee.role}
                disabled
              />
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <label htmlFor="name" className="form-label w-36 font-medium">
                Name:
              </label>
              <input
                type="text"
                className="form-input w-96 py-1 px-4 text-lg border-2"
                placeholder="Enter Name"
                name="name"
                value={employee.name}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <label htmlFor="email" className="form-label w-36 font-medium">
                Email:
              </label>
              <input
                type="text"
                className="form-input w-96 py-1 px-4 text-lg border-2"
                placeholder="Enter Email"
                name="email"
                value={employee.email}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <label
                htmlFor="phonenumber"
                className="form-label w-36 font-medium"
              >
                PhoneNumber:
              </label>
              <input
                type="text"
                className="form-input w-96 py-1 px-4 text-lg border-2"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={employee.phoneNumber}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4 flex gap-4 items-center">
              <label htmlFor="password" className="form-label w-36 font-medium">
                Password:
              </label>
              <input
                type="password"
                className="form-input w-96 py-1 px-4 text-lg border-2"
                placeholder="Enter Phone Number"
                name="password"
                value={employee.password}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditing}
              />
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  window.alert("Edit mode on");
                  handleEdit();
                }}
              >
                Edit
              </button>

              <button
                type="button"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}