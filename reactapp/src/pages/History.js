import React from "react";
import Navbar1 from "../NavComponents/Navbar1";
import "./History.css"
import { HistoryData } from "./HistoryData";

export default function History() {


   

  return (
    <div className="history">
       <Navbar1 />
       <div className="table" align="center">
       <h2 >Customer History</h2>
       </div>
       <div className="tableContent" align="center">
       <table id="customers">
  
       <tr>
                <th>ID</th>
                <th>Device</th>
                <th>Employee</th>
                <th>Status</th>
            </tr>
  
            {HistoryData.map((history, index) => (
              <tr data-index={index}>
                <td>{history.RepairId}</td>
                <td>{history.Device}</td>
                <td>{history.Employee}</td>
                <td>{history.Status}</td>
              </tr>
            ))}
</table>
       </div>
    
    </div>
  );
}