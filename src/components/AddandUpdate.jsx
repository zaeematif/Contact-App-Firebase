import React, { useState } from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from 'yup';

//validate info
const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required")
})

const AddandUpdate = ({ isOpen, onClose, isUpdate, details }) => {
  

  //ADD CONTACT
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("New Contact Added");
    } catch (error) {
      console.log(error);
    }
  };

  //UPDATE CONTACT
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
       validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? {
                name: details.name,
                email: details.email,
              }
            : {
                name: "",
                email: "",
              }
        }
        onSubmit={(values) =>
          isUpdate
            ? updateContact(values, details.id)
            : addContact({ name: values.name, email: values.email })
        }
      >
        <Form className="w-full p-2">
          <div className="flex flex-col">
            <label className="" htmlFor="">
              Name:
            </label>
            <Field
              className="my-2 px-2 py-1 border border-black focus:outline-none rounded-md"
              name="name"
            />
            <div  className="text-xs text-red mb-2">
              <ErrorMessage name="name"/>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="" htmlFor="">
              Email:
            </label>
            <Field
              className="my-2 px-2 py-1 border border-black focus:outline-none rounded-md"
              name="email"
            />
            <div className="text-xs text-red mb-2">
              <ErrorMessage  name="email"/>
            </div>
          </div>

          <button
            className="border w-fit my-2 py-1 px-2 bg-yellow rounded-md"
            type="submit"
          >
            {isUpdate ? "Update Contact" : "Add Contact"}
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddandUpdate;
