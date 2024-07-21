import React, { useEffect, useState } from "react";
import logo from "../src/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import ContactDetails from "./components/ContactDetails";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebase";
import AddandUpdate from "./components/AddandUpdate";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");

        onSnapshot(contactRef, (snapshot)=>{
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactList);
        })
        
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "contacts");

    onSnapshot(contactRef, (snapshot)=>{
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      
      const filteredContacts = contactList.filter(contact => 
        contact.name.toLowerCase().includes(value.toLowerCase()))
  
      setContacts(filteredContacts);
  
      //return filterContacts;
    });

  }

  return (
    <>
      <nav className="flex justify-center rounded-lg w-2/4 bg-purple p-4 my-4 mx-auto text-white text-2xl font-medium ">
        <img src={logo} alt="Logo" style={{ width: "3rem", height: "3rem" }} />
        <p className="self-center ml-2">FireBase Contact App</p>
      </nav>

      <div className="w-2/4 my-4 mx-auto flex flex-wrap justify-between">
        <div className="border-2 border-purple w-[88%] rounded-lg h-fit">
          <FontAwesomeIcon
            className="mx-2 text-white"
            icon={faMagnifyingGlass}
            size="lg"
          />
          <input onChange={filterContacts}
            className="w-5/6 p-2 rounded-lg bg-background  focus:outline-none text-white"
            type="text"
            placeholder="search"
          />
        </div>

        <div
          onClick={() => setIsOpen(true)}
          className="self-center rounded-full bg-white text-purple flex justify-center p-1 cursor-pointer h-[2.5rem] w-[2.5rem] "
        >
          <FontAwesomeIcon
            className="mx-2 self-center justify-self-center text-2xl"
            icon={faPlus}
          />
        </div>
      </div>

      <div>
        {contacts.map((contact) => (
          <ContactDetails key={contact.id} details={contact} />
        ))}
      </div>

      <AddandUpdate isOpen={isOpen} onClose={onClose} />

      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;