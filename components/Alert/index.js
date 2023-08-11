import React from "react";

const Alert = ({ type, message, isVisible }) => {
  const alertTypeClasses = {
    success: "bg-green-200 text-green-800",
    error: "bg-red-200 text-red-800",
    warning: "bg-yellow-200 text-yellow-800",
  };

  const alertClasses = `rounded p-4 my-4 w-[25%] ${alertTypeClasses[type]} ${
    isVisible ? "block" : "hidden"
  }`;

  return <div className={alertClasses}>{message}</div>;
};
export default Alert;
