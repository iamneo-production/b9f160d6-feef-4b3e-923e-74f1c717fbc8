import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/admin/Navbar";
import SidebarShow from "../../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../../utils/api";

export default function EditDevice() {
  const navigate = useNavigate();
  const { deviceid } = useParams();
  const [device, setDevice] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    api
      .get(`${BASE_URL}/devices/${deviceid}`)
      .then((response) => {
        setDevice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deviceid]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(device);
    api
      .put(`${BASE_URL}/devices/${deviceid}`, device)
      .then((response) => {
        console.log(response);
        window.alert("Device edited successfully");
        navigate("/admin/devices"); // Redirect to the devices page after successful submission
      })
      .catch((error) => {
        window.alert(error);
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <SidebarShow />
      <div className="w-[30rem] border rounded p-4 m-auto mt-28 shadow-xl">
        <h2 className="text-center mb-6 text-lg font-medium">Update Device</h2>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className=" flex items-center gap-2">
            <label
              htmlFor="type"
              className="form-label w-28 text-center text-lg"
            >
              Type:
            </label>
            <input
              type="text"
              className="form-inpu py-1 px-4 w-80 border-2 shadow-sm "
              placeholder="Enter AC type"
              name="type"
              value={device.type || ""}
              readOnly={!isEditable}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="brand"
              className="form-label w-28 text-center text-lg"
            >
              Brand:
            </label>
            <input
              type="text"
              className="form-input py-1 px-4 w-80 border-2 shadow-sm "
              placeholder="Enter AC Brand"
              name="brand"
              value={device.brand || ""}
              readOnly={!isEditable}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="model"
              className="form-label w-28 text-center text-lg"
            >
              Model:
            </label>
            <input
              type="text"
              className="form-input py-1 px-4 w-80 border-2 shadow-sm "
              placeholder="Enter AC Model"
              name="model"
              value={device.model || ""}
              readOnly={!isEditable}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center gap-4 items-center">
            {!isEditable && (
              <button
                type="button"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                onClick={()=>{
                  window.alert("Edit mode on");
                  handleEdit();
                }}
              >
                Edit
              </button>
            )}
            <button
              type="submit"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}