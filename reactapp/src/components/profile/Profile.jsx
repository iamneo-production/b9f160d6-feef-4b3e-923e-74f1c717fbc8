import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../../components/admin/Navbar";
import SidebarShow from "../../components/admin/SidebarShow";
import api, { BASE_URL } from "../../utils/api";
import empImg from "./empImg.png";
import custoImg from "./custoImg.png";
import adminImg from "./adminImg.jpg";

const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
let entity = "";
if (decodedToken && decodedToken.role === "CUSTOMER") {
  entity = "customers";
} else {
  entity = "employees";
}

let entityImg = "";
if (decodedToken && decodedToken.role === "CUSTOMER") {
  entityImg = "customers";
} else if (decodedToken && decodedToken.role === "EMPLOYEE") {
  entityImg = "employees";
} else {
  entityImg = "admin";
}

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    role: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    if (decodedToken) {
      const fetchData = async () => {
        try {
          const response = await api.get(
            `${BASE_URL}/${entity}/${decodedToken.id}`
          );
          const { id, name, password, role, email, phoneNumber, address } =
            response.data;
          setFormData({
            id,
            name,
            password,
            role,
            email,
            phoneNumber,
            address,
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [isEditable, setIsEditable] = useState(false);

  const UpdateData = async () => {
    try {
      console.log(formData);
      await api.put(`${BASE_URL}/${entity}/${decodedToken.id}`, formData);
      setIsEditable(false);
      window.alert("Saved Successfully");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <SidebarShow />

      <div id="unique" className="mt-28 m-auto">
        <div className="profile-pic w-64">
          <img
            src={
              entityImg === "customers"
                ? custoImg
                : entityImg === "employees"
                ? empImg
                : adminImg
            }
            alt="employee"
          />
        </div>
        <div className="information">
          <div className="content">
            <label className="material text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              id=""
              value={formData.name}
              onChange={(e) => {
                handleInputChange("name", e.target.value);
              }}
              disabled={!isEditable}
            />
          </div>

          <div className="content">
            <label className="material text-lg font-medium">ID</label>
            <input
              type="numeric"
              name="id"
              id=""
              value={formData.id}
              onChange={(e) => {
                handleInputChange("id", e.target.value);
              }}
              disabled
            />
          </div>
          <div className="content">
            <label className="material text-lg font-medium">Role</label>
            <input
              type="text"
              name="role"
              id=""
              value={formData.role}
              onChange={(e) => {
                handleInputChange("role", e.target.value);
              }}
              disabled
            />
          </div>

          <div className="content">
            <label className="material text-lg font-medium">Phone</label>
            <input
              inputMode="numeric"
              maxLength="10"
              name="myPhone"
              id=""
              value={formData.phoneNumber}
              onChange={(e) => {
                handleInputChange("phoneNumber", e.target.value);
              }}
              disabled={!isEditable}
            />
          </div>
          <div className="content ">
            <label className="material text-lg font-medium">Email</label>
            <input
              type="email"
              name="myEmail"
              value={formData.email}
              onChange={(e) => {
                handleInputChange("email", e.target.value);
              }}
              disabled={!isEditable}
            />
          </div>
          <div className="content">
            <label className="material text-lg font-medium">Password</label>
            <input
              type="password"
              name="myPassword"
              id=""
              value={formData.password}
              onChange={(e) => {
                handleInputChange("password", e.target.value);
              }}
              disabled={!isEditable}
            />
          </div>
          {entity === "customers" && (
            <div className="content">
              <label className="material text-lg font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!isEditable}
              />
            </div>
          )}
          <section className="parentbutton">
            <button
              type="reset"
              id="edit"
              onClick={() => {
                setIsEditable(true);
                window.alert("Edit mode on");
              }}
            >
              Edit
            </button>
            <button type="submit" id="save" onClick={UpdateData}>
              Save
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;