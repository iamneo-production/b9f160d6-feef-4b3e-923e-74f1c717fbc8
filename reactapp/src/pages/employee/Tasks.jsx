import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import api, { BASE_URL } from "../../utils/api";
import { NavLink } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs`);
        const allTasks = response.data;

        const filteredTasks = allTasks.filter(
          (task) => task.employee && task.employee.id === decodedToken.id
        );

        const sortedTasks = filteredTasks.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setTasks(sortedTasks);
        console.log(setTasks);
      } catch (error) {
        window.alert(error);
        console.log(error);
      }
    };
    fetchTask();
  }, [BASE_URL]);

  const updateService = async (item, newStatus) => {
    try {
      
      const { id, customer, device, description, employee, date } = item;
      
      const updatedRepair = {
        id,
        customer: { id: customer.id, name: customer.name },
        device: { id: device.id, type: device.type },
        description,
        date,
        status: newStatus,
        employee: { id: employee.id },
      };

      await api.put(`${BASE_URL}/repairs/${item.id}`, updatedRepair);

      window.alert("status saved successfully");

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === item.id ? updatedRepair : task))
      );
    } catch (error) {
      window.alert("Error updating repair status.");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex w-screen">
        <section className="flex-[22%]">
          <Sidebar />
        </section>
        <section className="flex-[78%]">
          <div className="mt-28 ">
            <h2 className="text-center text-2xl my-5 font-semibold">Tasks</h2>
            <section className="flex justify-center items-center gap-10 flex-wrap m-auto w-[55rem] ">
              {tasks.map((item, key) => {
                return (
                  <article
                    key={key}
                    className="bg-gray-100 hover:bg-slate-200 border shadow-xl flex flex-col gap-6 p-4 w-96 font-medium rounded "
                  >
                    <h4 className="text-center font-semibold text-lg  text-gray-800 border-b-2 border-black">
                      Service no {key + 1}
                    </h4>
                    <h4>
                      Appointment Date:
                      <span className="px-4 text-blue-600">{item.date}</span>
                    </h4>
                    <h4>
                      Customer Name:
                      <span className="px-4 text-blue-600">
                        {item.customer && item.customer.name}
                      </span>
                    </h4>
                    <h4>
                      Device Type:
                      <span className="px-4 text-blue-600">
                        {item.device && item.device.type}
                      </span>
                    </h4>
                    <section className=" flex justify-evenly items-center">
                      <select
                        className="px-2 py-1 border shadow-lg border-blue-600 rounded-lg font-normal"
                        name="status"
                        value={item.status || null}
                        onChange={(e) => updateService(item, e.target.value)}
                      >
                        <option value="Incomplete">Select status</option>
                        <option className="text-blue-500" value="Accepted">
                          Accepted
                        </option>
                        <option className="text-red-500" value="On progress">
                          On progress
                        </option>
                        <option className="text-green-500" value="Completed">
                          Completed
                        </option>
                      </select>
                    </section>
                    <NavLink to={`/employee/tasks/${item.id}`}>
                      <div className="bg-red-500 rounded p-1 text-center text-white hover:scale-105 transition-all">
                        View Details
                      </div>
                    </NavLink>
                  </article>
                );
              })}
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Tasks;