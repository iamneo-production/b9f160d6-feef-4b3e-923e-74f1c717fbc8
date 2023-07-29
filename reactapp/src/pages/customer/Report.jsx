import React, { useEffect, useState } from "react";
import { FaCloudDownloadAlt, FaFan } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api, { BASE_URL } from "../../utils/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Report = () => {
  const [details, setDetails] = useState({});
  const param = useParams();

  console.log(param.repairid);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}/repairs/${param.repairid}`);
        setDetails(response.data);
        console.log(details);
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
    };
    fetchData();
  }, []);

  const handleDownloadClick = () => {
    const doc = new jsPDF("landscape", "px", "a4");

    const printReportElement = document.querySelector(".pdf-content");

    html2canvas(printReportElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save("report.pdf");
    });
  };

  return (
    <>
      <main className="border border-black w-[70rem] m-auto mt-8 pdf-content">
        <section className="bg-[#131f32]  m-auto flex justify-between items-center p-3  text-white">
          <h4 className="flex items-center gap-2 mx-3 text-lg">
            <FaFan className="text-orange-400" /> AC Service Center
          </h4>
          <h4 className="mx-4">
            Date: &nbsp;{currentDate.toLocaleDateString()}
          </h4>
        </section>
        <h1 className="text-center text-xl font-semibold my-4">
          Customer Service Report
        </h1>

        <article className="mb-6">
          <section className="font-medium flex flex-col gap-6 justify-center items-center">
            <div className="w-[64rem] flex m-auto items-center ">
              <label className="w-32 bg-[#131f32] text-white py-1 px-4 border border-black ">
                Name:
              </label>
              <p className="w-[56rem] py-1 px-4 border border-black ">
                {details.customer && details.customer.name}
              </p>
            </div>

            <section className="flex gap-4 w-[64rem]">
              <div className="w-[36rem] flex  items-center ">
                <label className="w-28 bg-[#131f32] text-white py-1 px-4 border border-black">
                  Email:
                </label>
                <p className="w-[29rem] py-1 px-4 border border-black ">
                  {details.customer && details.customer.email}
                </p>
              </div>
              <div className="w-[27rem] flex  items-center ">
                <label className="w-28 bg-[#131f32] text-white py-1 px-4 border border-black">
                  Phone:
                </label>
                <p className="w-[20rem] py-1 px-4 border border-black ">
                  {details.customer && details.customer.phoneNumber}
                </p>
              </div>
            </section>

            <div className="w-[64rem] flex m-auto items-end mb-3 ">
              <label className="w-32 bg-[#131f32] text-white py-1 px-4 border border-black ">
                Address:
              </label>
              <p className="w-[56rem] py-1 px-4 border border-black ">
                {details.customer && details.customer.address}
              </p>
            </div>

            <section className="flex gap-4 ">
              <div className="w-[24rem] flex  items-center ">
                <label className="w-36 bg-[#131f32] text-white py-1 px-4 border border-black">
                  Device type:
                </label>
                <p className="w-[15rem] py-1 px-4 border border-black ">
                  {details.device && details.device.type}
                </p>
              </div>
              <div className="w-[18rem] flex  items-center ">
                <label className="w-20 bg-[#131f32] text-white py-1 px-2 border border-black">
                  Brand:
                </label>
                <p className="w-[13rem] py-1 px-4 border border-black ">
                  {details.device && details.device.brand}
                </p>
              </div>
              <div className="w-[20rem] flex  items-center ">
                <label className="w-20 bg-[#131f32] text-white py-1 px-2 border border-black">
                  Model:
                </label>
                <p className="w-[15rem] py-1 px-4 border border-black ">
                  {details.device && details.device.model}
                </p>
              </div>
            </section>

            <div className="w-[64rem] flex m-auto items-start mb-3">
              <label className="w-60 bg-[#131f32] text-white py-1 px-4 border border-black ">
                Problem description:
              </label>
              <p className="w-[56rem] py-1 px-4 border border-black ">
                {details.description}
              </p>
            </div>

            <section className="flex gap-4 w-[64rem]">
              <div className="w-[36rem] flex  items-center ">
                <label className="w-28 bg-[#131f32] text-white py-1 px-3 border border-black">
                  Employee:
                </label>
                <p className="w-[29rem] py-1 px-4 border border-black ">
                  {details.employee && details.employee.name}
                </p>
              </div>
              <div className="w-[27rem] flex  items-center ">
                <label className="w-28 bg-[#131f32] text-white py-1 px-4 border border-black">
                  Phone:
                </label>
                <p className="w-[20rem] py-1 px-4 border border-black ">
                  {details.employee && details.employee.phoneNumber}
                </p>
              </div>
            </section>

            <div className="w-[64rem] flex m-auto items-center ">
              <label className="w-48 bg-[#131f32] text-white py-1 px-4 border border-black ">
                Employee Email:
              </label>
              <p className="w-[52rem] py-1 px-4 border border-black ">
                {details.employee && details.employee.email}
              </p>
            </div>

            <section className="flex gap-4 w-[64rem]">
              <div className="w-[36rem] flex  items-center ">
                <label className="w-48 bg-[#131f32] text-white py-1 px-3 border border-black">
                  Date of service:
                </label>
                <p className="w-[24rem] py-1 px-4 border border-black ">
                  {details.date}
                </p>
              </div>
              <div className="w-[27rem] flex  items-center ">
                <label className="w-28 bg-[#131f32] text-white py-1 px-4 border border-black">
                  status:
                </label>
                <p className="w-[20rem] py-1 px-4 border border-black ">
                  Completed
                </p>
              </div>
            </section>
          </section>
        </article>
      </main>
      <div className="flex justify-center my-4">
        <button
          className="flex items-center gap-2 bg-blue-500 py-2 rounded px-4 text-lg text-white font-semibold hover:bg-blue-600 hover:scale-105 transition-all"
          onClick={handleDownloadClick}
        >
          Download
          <FaCloudDownloadAlt />
        </button>
      </div>
    </>
  );
};

export default Report;