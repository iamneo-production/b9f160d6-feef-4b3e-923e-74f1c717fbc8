import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/admin/Navbar";
import SidebarShow from "../../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../../utils/api";

export default function AddDevice() {
  let navigate = useNavigate();

  const [device, setDevice] = useState({
    type: "",
    brand: "",
    model: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await api.post(`${BASE_URL}/devices`, device);
    window.alert("Device added successfully");
    navigate("/admin/devices");
  };

  return (
    <>
      <Navbar />
      <SidebarShow />
      <div className="col-md-6 offset-md-3 w-[35rem] rounded p-4 mt-28 border shadow-xl m-auto">
        <h2 className="text-xl text-center mb-4 font-medium ">Add Device</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div
            style={{ display: "flex", marginBottom: "10px" }}
            className="items-center text-center"
          >
            <label
              htmlFor="type"
              className="text-lg"
              style={{ width: "120px" }}
            >
              Type:
            </label>
            <input
              type="text"
              className="form-control w-96 py-1 px-4 text-xl border-2  shadow-md"
              id="type"
              placeholder="Enter Ac type"
              name="type"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br></br>
          <div
            style={{ display: "flex", marginBottom: "10px" }}
            className="items-center text-center"
          >
            <label
              htmlFor="brand"
              className="text-lg"
              style={{ width: "120px" }}
            >
              Brand:
            </label>
            <input
              type="text"
              className="form-control w-96 py-1 px-4 text-xl border-2 shadow-md"
              id="brand"
              placeholder="Enter Ac's brand"
              name="brand"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br></br>
          <div
            style={{ display: "flex", marginBottom: "10px" }}
            className="items-center text-center"
          >
            <label
              htmlFor="model"
              className="text-lg"
              style={{ width: "120px" }}
            >
              Model:
            </label>
            <input
              type="text"
              className="form-control w-96 py-1 px-4 text-xl border-2  shadow-md"
              id="model"
              placeholder="Enter Ac model"
              name="model"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br></br>

          <section className="flex justify-center gap-3 ">
            <button
              type="submit"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <Link
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              style={{ marginLeft: "10px" }}
              to="/admin/devices"
            >
              Cancel
            </Link>
          </section>
        </form>
      </div>
    </>
  );
}