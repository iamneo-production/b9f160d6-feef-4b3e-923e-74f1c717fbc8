/*import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar/>
    </>
  );
}

export default App;
*/

import React from "react";

import Navbar1 from "./NavComponents/Navbar1";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Service from "./pages/Service";
import Login from "./Components/Login";
import Registration from "./Components/Registration"
import History from "./pages/History";


export default function App() {
  return (
    <div className="App">
      <Router>
       
        <Routes>
        <Route path="/" element={<Registration/>}>
     </Route>
         <Route path="/Login" element={<Login/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/history" element={<History/>} />

        </Routes>
      </Router>
    </div>
     
  );
}

