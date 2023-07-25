import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import SidebarShow from "../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../utils/api";
import { useParams } from "react-router-dom";

const TaskBar = () => {
  const param = useParams();

  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs/${param.repairid}`);
        setDetails(response.data);
        console.log(details);
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    };
    fetchData();
  }, [BASE_URL, param.repairid]);

  if (Object.keys(details).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <SidebarShow />
      <h4 className="text-2xl font-semibold text-center mt-28">Task Details</h4>
      <div className="my-6  m-auto w-[52rem] flex flex-col gap-4 border p-4 shadow-xl ">
        <div className="flex gap-4 items-center px-4 py-1 ">
          <label className="w-40 font-medium  p-2">Customer Name : </label>

          <input
          className="w-[35rem] py-2 px-4 border shadow"
            type="text"
            name="customerName"
            value={details.customer.name}
            disabled
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-1 ">
          <label className="w-40 font-medium  p-2">Address : </label>

          <input
          className="w-[35rem] py-2 px-4 border shadow"
            type="text"
            name="customerAddress"
            value={details.customer.address}
            disabled
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-1 ">
          <label className="w-40 font-medium  p-2">Device Brand : </label>

          <input
          className="w-[35rem] py-2 px-4 border shadow"
            type="text"
            name="deviceBrand"
            value={details.device.brand}
            disabled
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-1 ">
          <label className="w-40 font-medium  p-2">Device Type : </label>

          <input
          className="w-[35rem] py-2 px-4 border shadow"
            type="text"
            name="deviceType"
            value={details.device.type}
            disabled
          />
        </div>
        <div className="flex gap-4 items-center px-4 py-1 ">
          <label className="w-40 font-medium  p-2">Device Model : </label>

          <input
          className="w-[35rem] py-2 px-4 border shadow"
            type="text"
            name="deviceModel"
            id=""
            value={details.device.model}
            disabled
          />
        </div>

        <div className="flex gap-4 items-center px-4 py-1 ">
          <label className="w-40 font-medium p -2">Description : </label>
          <textarea
            name="customerDescription"
            className="w-[35rem] py-2 px-4 border shadow"
            id="description"
            cols="30"
            rows="3"
            disabled
          >
            {details.description}
          </textarea>
        </div>
      </div>
    </>
  );
};

export default TaskBar;