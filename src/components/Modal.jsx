import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="absolute inset-[7rem] h-fit z-50 w-2/4 my-2 p-2 rounded-lg mx-auto bg-white flex flex-col gap-2 justify-between">
            <div
              onClick={() => onClose()}
              className="text-2xl cursor-pointer w-fit self-end mx-2"
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            {children}
          </div>

          <div className="absolute top-0 z-40 h-screen w-screen backdrop-blur "></div>
        </>
      )}
    </>
  , document.getElementById("modal-root"));
};

export default Modal;
