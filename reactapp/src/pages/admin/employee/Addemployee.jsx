import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/admin/Navbar";
import SidebarShow from "../../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../../utils/api";

export default function AddEmployee() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "EMPLOYEE",
  });

  const { name, email, phoneNumber, password } = employee;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`${BASE_URL}/api/v1/auth/register`, employee);
      window.alert("Added Employee Successfully");
      navigate("/admin/employees");
    } catch (error) {
      window.alert(error);
      console.log("Error:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <SidebarShow />
      <div className="container border shadow-xl bg-cyan-600 w-[40rem] m-auto mt-32">
        <h4 className="text-center text-white font-medium text-xl m-4">
          Add Employee
        </h4>
        <div className="col-md-6 offset-md-3 border rounded p-4 bg-white mt-2 shadow-xl">
          <form onSubmit={(e) => onSubmit(e)} className="p-8">
            <div
              style={{ display: "flex", marginBottom: "10px" }}
              className="items-center gap-6"
            >
              <label className=" font-medium  w-36" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                className="form-control w-96 border shadow-lg text-lg py-1 px-4"
                id="name"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <br></br>
            <div
              style={{ display: "flex", marginBottom: "10px" }}
              className="items-center gap-6"
            >
              <label className=" font-medium w-36" htmlFor="email">
                Email:
              </label>
              <input
                type="text"
                required
                className="form-control w-96 border shadow-lg text-lg py-1 px-4"
                id="email"
                placeholder="Enter email address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <br></br>
            <div
              style={{ display: "flex", marginBottom: "10px" }}
              className="items-center gap-6"
            >
              <label className=" font-medium w-36" htmlFor="phoneNumber">
                Phone Number:
              </label>
              <input
                type="text"
                className="form-control w-96 border shadow-lg text-lg py-1 px-4"
                id="phoneNumber"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <br></br>
            <div
              style={{ display: "flex", marginBottom: "10px" }}
              className="items-center gap-6"
            >
              <label className=" font-medium w-36" htmlFor="name">
                Password:
              </label>
              <input
                type="password"
                className="form-control w-96 border shadow-lg text-lg py-1 px-4"
                id="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <Link
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                style={{ marginLeft: "10px" }}
                to="/admin/employees"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}