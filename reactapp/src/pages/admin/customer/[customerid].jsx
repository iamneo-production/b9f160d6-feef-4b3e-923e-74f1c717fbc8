import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import SidebarShow from "../../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../../utils/api";

const CustomerID = () => {
  const [customer, setCustomer] = useState({});
  const [show, setShow] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const param = useParams();
  let Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${BASE_URL}/customers/${param.customerid}`
        );
        const { id, name, password, role, email, phoneNumber, address } =
          response.data;
        setCustomer({ id, name, password, role, email, phoneNumber, address });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [param.customerid]);

  const handlechange = (key, value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [key]: value,
    }));

    if (key === "name") {
      setNameError(false);
    }

    if (key === "email") {
      setEmailError(false);
    }
  };

  const saveCustomer = async () => {
    if (customer.name.trim() === "") {
      setNameError(true);
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(customer.email)) {
      setEmailError(true);
      return;
    }

    try {
      await api.put(`${BASE_URL}/customers/${param.customerid}`, customer);
      setShow(false);
      window.alert("Edited successfully");
      Navigate("/admin/customers");
    } catch (error) {
      window.alert("Error saving customer.");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <SidebarShow />
      <main>
        <h1 className="mt-24 mb-6 text-center text-2xl font-medium text-slate-700">
          Customer Info
        </h1>

        <form className="w-[40rem] m-auto flex flex-col gap-3 px-6 py-8 border-2 shadow-2xl">
          <section className="flex items-center gap-4 text-lg">
            <label className="px-2 font-semibold w-24" htmlFor="name">
              Name:
            </label>
            {show ? (
              <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
                {customer.name}
              </div>
            ) : (
              <input
                className="w-[34rem] h-12 font-medium bg-gray-100 text-gray-500 border-2 py-2 px-4"
                required
                type="text"
                placeholder="Name"
                value={customer.name}
                onChange={(e) => handlechange("name", e.target.value)}
              />
            )}
          </section>
          {!show && nameError && (
            <p className="text-red-500 m-auto">Name field cannot be empty</p>
          )}

          <section className="flex items-center gap-4 text-lg">
            <label className="px-2 font-semibold w-24" htmlFor="id">
              ID:
            </label>
            <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
              {param.customerid}
            </div>
          </section>

          <section className="flex items-center gap-4 text-lg">
            <label className="px-2 font-semibold w-24" htmlFor="email">
              Email:
            </label>
            {show ? (
              <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
                {customer.email}
              </div>
            ) : (
              <input
                className="w-[34rem] h-12 font-medium bg-gray-100 text-gray-500 border-2 py-2 px-4"
                required
                type="email"
                placeholder="Email"
                value={customer.email}
                onChange={(e) => handlechange("email", e.target.value)}
              />
            )}
          </section>
          {!show && emailError && (
            <p className="text-red-500 m-auto">Invalid email format</p>
          )}

          <section className="flex items-center gap-4 text-lg">
            <label className="px-2 font-semibold w-24" htmlFor="phone">
              Mobile:
            </label>
            {show ? (
              <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
                {customer.phoneNumber}
              </div>
            ) : (
              <input
                className="w-[34rem] h-12 font-medium bg-gray-100 text-gray-500 border-2 py-2 px-4"
                type="number"
                placeholder="Mobile No"
                value={customer.phoneNumber}
                onChange={(e) => handlechange("phoneNumber", e.target.value)}
              />
            )}
          </section>

          <section className="flex items-center gap-4 text-lg">
            <label className="px-2 font-semibold w-24" htmlFor="address">
              Address:
            </label>
            {show ? (
              <div className="w-[34rem] h-12 font-medium bg-gray-100 border-2 py-2 px-4">
                {customer.address}
              </div>
            ) : (
              <input
                className="w-[34rem] h-12 font-medium bg-gray-100 text-gray-500 border-2 py-2 px-4"
                type="text"
                placeholder="Address"
                value={customer.address}
                onChange={(e) => handlechange("address", e.target.value)}
              />
            )}
          </section>

          <section className="m-auto flex gap-4 mt-4">
            <button
              type="reset"
              className="w-24 text-white py-1 text-xl font-semibold shadow-2xl bg-red-500 hover:bg-red-600 active:bg-red-400"
              onClick={() => {
                setShow(false);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="w-24 text-white py-1 text-xl font-semibold shadow-2xl bg-green-500 hover:bg-green-600 active:bg-green-400"
              onClick={saveCustomer}
            >
              Save
            </button>
          </section>
        </form>
      </main>
    </>
  );
};

export default CustomerID;
