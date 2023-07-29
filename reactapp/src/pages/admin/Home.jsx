import React from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Dashboard from "../../components/admin/Dashboard";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="flex ">
        <section className="flex-[22%]">
          <Sidebar />
        </section>
        <section className="flex-[78%]">
          <Dashboard />
        </section>
      </main>
    </>
  );
};

export default Home;