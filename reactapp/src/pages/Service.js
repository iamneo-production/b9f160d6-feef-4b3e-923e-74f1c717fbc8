import React, { useState } from "react";
import "./styling.css";
import Navbar1 from "../NavComponents/Navbar1";
import axios from 'axios';

export default function Service() {
  const [acType, setacType] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  async function save(event) 
  {
      event.preventDefault();
      try
      {
         
          await axios.post("http://localhost:8080/service", {
            type : acType,
            brand: Brand,
            model: Model,
            description:Description,
            dos :date

          });
          alert("Submitted Successful");
      }
      catch(err)
      {
          alert(err);
      }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "acType") 
    {
      setacType(value);
    }

    if (id === "Brand") 
    {
      setBrand(value);
    }
    if (id === "Model") 
    {
      setModel(value);
    }

    if (id === "Description") 
    {
      setDescription(value);
    }
    if (id === "date") 
    {
      setDate(value);
    }
  };
  const handleSubmit = () => {
    console.log(acType, Brand, Model, Description, date);
    
  };

  return (
    <div>
  
      <Navbar1/>
      
      <div class="wrapper1" align="center">
      <h3 style={{color:"#191970"}}>Service Request</h3>
      <table>
        <tr>
          <td></td>
        </tr>
      </table>
      <form>
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
              border:"2px solid grey",
              transition: "all 0.3s ease"
            }}
            
            onChange={(event) => {setacType(event.target.value);
            }}
          >
            <option value="Ductless Mini-Split">Ductless Mini-Split</option>
            <option value=" Window Air Conditioner"> Window Air Conditioner</option>
            <option value=" Floor Mounted Air Conditioner"> Floor Mounted Air Conditioner</option>
            <option value=" Portable Air Conditioner"> Portable Air Conditioner</option>
            <option value=" Central Air Conditioner"> Central Air Conditioner</option>
           
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
              border:"2px solid grey",
              transition: "all 0.3s ease"
            }}
            
            onChange={(event) => {setBrand(event.target.value);
            }}
          >
            <option value="LG">LG</option>
            <option value="Panasonic ">Panasonic </option>
            <option value="Blue Star ">Blue Star </option>
            <option value="Voltas ">Voltas </option>
            <option value="Whirlpool">Whirlpool</option>
            <option value="Havells-Lloyd">Havells-Lloyd</option>
            <option value="Daikin">Daikin</option>
            <option value="Carrier">Carrier</option>
            <option value="Samsung">Samsung</option>
            <option value="Godrej">Godrej</option>
          </select>
        </div>

        <div class="input-box1">
          <label style={{ width: "120px", display: "inline-block" }}>
            Model:{" "}
          </label>
          <input type="text"
          placeholder="Model"
            id="Model"
            style={{
              width: "50%",
              fontSize: "17px",
              fontWeight: "400",
              color: "#333",
              border: "2.5px solid black",
              borderBottomWidth: "2.5px",
              borderRadius: "6px",
              border:"2px solid grey",
              transition: "all 0.3s ease"
            }}
            
            onChange={(event) => {setModel(event.target.value);
            }}
          >
           
          </input>
        </div>

        <div class="input-box1">
          <label style={{ width: "120px", display: "inline-block" }}>
            Description:{" "}
          </label>
          <textarea
            id="Description"
            placeholder="description"
            
            onChange={(event) => {setDescription(event.target.value);
            }}
            style={{
              width: "50%",
              fontSize: "17px",
              fontWeight: "400",
              boxSizing: "border box",
              color: "#333",
              border: "2.5px solid black",
              borderBottomWidth: "2.5px",
              borderRadius: "6px",
              border:"2px solid grey",
              transition: "all 0.3s ease"
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
            
            style={{
              width: "50%",
              fontSize: "17px",
              fontWeight: "400",
              color: "#333",
              border: "2.5px solid black",
              borderBottomWidth: "2.5px",
              borderRadius: "6px",
              border:"2px solid grey",
              transition: "all 0.3s ease"
            }}
            onChange={(event) => {setDate(event.target.value);
            }}
          />
          
            <div class="input-box button1">
         
         <br/><input type="Submit" style={{ width: "20%"}} onClick={save} class="Login-btn1" value="Submit"/>
       </div>
        </div>
        </div>
        
      
      </form>
    </div>

    </div>
   
  );
}
