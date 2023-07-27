import React, { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setDecodedToken(decoded);
        console.log(decoded);
        localStorage.setItem("decodedToken", JSON.stringify(decoded)); // Store decodedToken in localStorage
      } catch (error) {
        console.error("Error decoding token:", error);
        setDecodedToken(null);
        localStorage.removeItem("decodedToken"); // Remove decodedToken from localStorage
      }
    } else {
      setDecodedToken(null);
      localStorage.removeItem("decodedToken"); // Remove decodedToken from localStorage
    }

    const removeTokenAtMidnight = ()  => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        if (currentHour >= 0 && currentHour < 12) {
          localStorage.removeItem("token");
          localStorage.removeItem("decodedToken");
          console.log("Token removed at 12 AM");
        }
      };
  
      const timeUntilMidnight =
        (24 - (new Date().getHours() % 24)) * 60 * 60 * 1000;
      const timeoutId = setTimeout(removeTokenAtMidnight, timeUntilMidnight);
  
      // Cleanup the timeout on unmount
      return () => clearTimeout(timeoutId);
    }, []);
  
    useEffect(() => {
      console.log(decodedToken);
    }, [decodedToken]);
  
    return (
      <TokenContext.Provider value={{ decodedToken }}>
        {children}
      </TokenContext.Provider>
    );
  };