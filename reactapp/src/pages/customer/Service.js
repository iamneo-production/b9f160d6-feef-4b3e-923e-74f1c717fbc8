import React, { useState, useEffect, useContext } from "react";
import "./styles/styling.css";
import api from "../../utils/api";
import Navbar from "../../components/admin/Navbar";
import SidebarShow from "../../components/admin/SidebarShow";
import { TokenContext } from "../../utils/TokenContext";

const Service = () => {
  const [devices, setDevices] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [description, setDescription] = useState("");
  const [serviceDate, setServiceDate] = useState("");

  const { decodedToken } = useContext(TokenContext);

  useEffect(() => {
    api
      .get("http://localhost:9000/devices")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedBrand("");
    setSelectedModel("");
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedDevice = devices.find(
      (device) =>
        device.type === selectedType &&
        device.brand === selectedBrand &&
        device.model === selectedModel
    );

    const repairData = {
      customer: { id: decodedToken.id }, 
      device: { id: selectedDevice.id },
      description: description,
      status: "Incomplete",
      date: serviceDate,
    };

    console.log(repairData);
    api
      .post("http://localhost:9000/repairs", repairData)
      .then((response) => {
        console.log("Repair data saved successfully:", response.data);
        alert("Successful repair request");
      })
      .catch((error) => {
        console.log(error);
        alert("Error submitting repair request");
      });
  };

  return (
    <div>
      <Navbar />
      <SidebarShow />
      <div className="wrapper1 mt-24" align="center">
        <h3 className="text-2xl mb-3" style={{ color: "#191970" }}>
          Service Request
        </h3>
        <table>
          <tr>
            <td></td>
          </tr>
        </table>
        <form onSubmit={handleSubmit}>
          <div class="wrappers">
            <div class="input-box1">
              <label style={{ width: "120px", display: "inline-block" }}>
                AC type:
              </label>
              <select
                id="acType"
                style={{
                  width: "50%",
                  fontSize: "17px",
                  fontWeight: "400",
                  color: "#333",
                  border: "2.5px solid black",
                  borderBottomWidth: "2.5px",
                  borderRadius: "6px",
                  border: "2px solid grey",
                  transition: "all 0.3s ease",
                }}
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="">Select AC type</option>
                {[...new Set(devices.map(({ type }) => type))].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div class="input-box1">
              <label style={{ width: "120px", display: "inline-block" }}>
                Brand:{" "}
              </label>
              <select
                id="Brand"
                style={{
                  width: "50%",
                  fontSize: "17px",
                  fontWeight: "400",
                  color: "#333",
                  border: "2.5px solid black",
                  borderBottomWidth: "2.5px",
                  borderRadius: "6px",
                  border: "2px solid grey",
                  transition: "all 0.3s ease",
                }}
                value={selectedBrand}
                onChange={handleBrandChange}
              >
                <option value="">Select Brand</option>
                {[
                  ...new Set(
                    devices
                      .filter((device) => device.type === selectedType)
                      .map(({ brand }) => brand)
                  ),
                ].map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div class="input-box1">
              <label style={{ width: "120px", display: "inline-block" }}>
                Model:{" "}
              </label>
              <select
                id="Model"
                style={{
                  width: "50%",
                  fontSize: "17px",
                  fontWeight: "400",
                  color: "#333",
                  border: "2.5px solid black",
                  borderBottomWidth: "2.5px",
                  borderRadius: "6px",
                  border: "2px solid grey",
                  transition: "all 0.3s ease",
                }}
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value)}
              >
                <option value="">Select Model</option>
                {devices
                  .filter(
                    (device) =>
                      device.type === selectedType &&
                      device.brand === selectedBrand
                  )
                  .map((device) => (
                    <option key={device.model} value={device.model}>
                      {device.model}
                    </option>
                  ))}
              </select>
            </div>

            <div class="input-box1">
              <label style={{ width: "120px", display: "inline-block" }}>
                Description:{" "}
              </label>
              <textarea
                id="Description"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{
                  width: "50%",
                  fontSize: "17px",
                  fontWeight: "400",
                  boxSizing: "border box",
                  color: "#333",
                  border: "2.5px solid black",
                  borderBottomWidth: "2.5px",
                  borderRadius: "6px",
                  border: "2px solid grey",
                  transition: "all 0.3s ease",
                }}
              ></textarea>
            </div>

            <div class="input-box1">
              <label style={{ width: "120px", display: "inline-block" }}>
                Date of Service:{" "}
              </label>
              <input
                type="date"
                id="date"
                name="ServiceDate"
                value={serviceDate}
                style={{
                  width: "50%",
                  fontSize: "17px",
                  fontWeight: "400",
                  color: "#333",
                  border: "2.5px solid black",
                  borderBottomWidth: "2.5px",
                  borderRadius: "6px",
                  border: "2px solid grey",
                  transition: "all 0.3s ease",
                }}
                onChange={(event) => setServiceDate(event.target.value)}
              />

              <div class="input-box button1">
                <br />
                <input
                  type="submit"
                  style={{ width: "20%" }}
                  class="Login-btn1"
                  value="Submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Service;