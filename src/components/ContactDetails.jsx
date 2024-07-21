import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AddandUpdate from "./AddandUpdate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactDetails = ({ details }) => {
  //DELETE CONTACT
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
    setIsUpdate(true);
  };

  return (
    <>
      <div className="w-2/4 my-2 p-2 rounded-lg mx-auto bg-contact flex justify-between">
        <div className="flex w-full">
          <div className="flex mr-2">
            <FontAwesomeIcon
              className="mx-2 self-center justify-self-center"
              icon={faCircleUser}
              size="2x"
            />
          </div>

          <div className="flex flex-col text-black w-2/3 mr-2">
            <p className="text-lg font-medium ">{details.name}</p>
            <p className="text-sm font-normal ">{details.email}</p>
          </div>
        </div>

        <div className="flex justify-between w-[12%] mx-2">
          <button onClick={onOpen}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={() => deleteContact(details.id)}>
            <FontAwesomeIcon icon={faTrash} className="text-red" />
          </button>
        </div>
      </div>

      <AddandUpdate
        isOpen={isOpen}
        onClose={onClose}
        isUpdate={isUpdate}
        details={details}
      />

      
    </>
  );
};

export default ContactDetails;
