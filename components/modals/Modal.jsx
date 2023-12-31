import React from "react";

const Modal = ({ children, isOpen }) => {
  return (
    <div
      className={`w-[95%] sm:w-4/5 md:w-2/5 min-h-min max-h-max overflow-y-scroll rounded-md 
      absolute m-auto right-0 left-0 bg-darkbg text-lightestSlate overflow-hidden 
      transition-all duration-300 z-[999]
  ${isOpen ? "bottom-0 top-0" : "bottom-[-200vh]"} `}
    >
      {children}
    </div>
  );
};

export default Modal;
