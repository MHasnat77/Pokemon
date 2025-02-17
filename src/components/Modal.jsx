import React, { useEffect, useRef, useState } from "react";
import "./modal.css";

const Modal = ({ isOpen, toggleModal, Pokie }) => {
  const modalRef = useRef(null);

  const [isInfo, setInfo] = useState([]);
  console.log("pokie value for display", Pokie);
  const { types, forms, moves, abilities } = Pokie;
  console.log("pokie value for display", types);
  console.log("pokie value for forms", forms);
  console.log("pokie value for moves", moves);
  console.log("pokie value for abilities", abilities);

  const [isDisplay, setDisplay] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleModal]);

  const toggleInfo = (po) => {
    if (!po || po.length === 0) {
      setInfo(po);
      setDisplay([]);
    }
    setInfo(po);
    const items = po.map((p) => {
      if (p.type) {
        return p?.type?.name;
      } else if (p.ability) {
        return p?.ability?.name;
      } else if (p.move) {
        return p?.move?.name;
      } else {
        return p?.name;
      }
    });
    const myArray = items.join(", ");
    setDisplay(myArray);
  };

  return (
    <>
      <div className=" fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-lg">
        <div
          className="w-[50vw] bg-white fixed top-[40vh] h-[54vh]  translate-y-[-10vh] p-[1.87vw]  rounded-md
    shadow-md shadow-gray-500   "
          ref={modalRef}
        >
          {/* Buttons for information */}
          <div className="flex gap-[2vw]">
            <button
              className="  
    focus-within:border-b-4 focus-within:border-yellow-400 active:border-yellow-500 "
              onClick={() => {
                toggleInfo(types);
              }}
            >
              Types
            </button>

            <button
              className=" 
    focus-within:border-b-4 focus-within:border-yellow-400 active:border-yellow-500 "
              onClick={() => {
                toggleInfo(forms);
              }}
            >
              Forms
            </button>

            <button
              className=" 
    focus-within:border-b-4 focus-within:border-yellow-400 active:border-yellow-500"
              onClick={() => {
                toggleInfo(moves);
              }}
            >
              Moves
            </button>

            <button
              className=" 

    focus-within:border-b-4 focus-within:border-yellow-400 active:border-yellow-500  "
              onClick={() => {
                toggleInfo(abilities);
              }}
            >
              Ability
            </button>
            <button
              className="w-[2vw] h-[2vw] translate-x-[29.7vw] translate-y-[-2.6vw] rounded-full bg-red-500 text-[1.3vw] font-semibold text-white "
              onClick={toggleModal}
            >
              X
            </button>
          </div>

          <div className="flex mt-[1vw]">
            <div className="w-[60vw]">
              {isInfo.length > 0 ? (
                <button className="text-gray-700 text-[0.8vw] ">
                  {isDisplay}
                </button>
              ) : (
                <p className="text-gray-500">Select an option to see details</p>
              )}
            </div>

            <div className="w-[30vw] flex flex-col items-center justify-center ">
              <h1 className="text-[1vw] underline font-bold">
                {Pokie.name.toUpperCase()}
              </h1>
              <img
                src={Pokie.sprites?.front_default}
                alt={Pokie.name}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
