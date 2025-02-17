import Modal from "./Modal";
import React, { useState, useReducer } from "react";
function reducer(state, action) {
  if (action.type === "nextBtn") {
    return state + 20;
  } else if (action.type === "previousBtn") {
    state = state - 20;
    if (state < 0) {
      return 0;
    } else {
      return state;
    }
  }
  throw Error("Unknown action.");
}
const Search = ({ Search, Filter }) => {
  const [offset, dispatch] = useReducer(reducer, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPokemon, setModalPokemon] = useState(null);
  const limit = 20;
  const totalPokemon = Filter.slice(offset, offset + limit);
  const pageNumber = offset / limit + 1;
  const totalPages = Math.ceil(Filter.length / limit);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="grid grid-cols-5 gap-5 mx-[1.1vw]  ">
        {Search &&
          totalPokemon.map((poke, id) => (
            <div
              key={id}
              className=" flex justify-center items-center"
              onClick={() => {
                toggleModal();
                setModalPokemon(poke);
              }}
            >
              <div
                className="w-[20vw] h-[32vw] 
            rounded-md bg-yellow-300 px-[1.1vw] mt-[1vh] shadow-[1px_2px_8px_rgba(0,0,255,0.5)]"
              >
                <div className=" flex justify-center items-center">
                  <img
                    src={poke.sprites?.front_default}
                    alt="Pokemon Image"
                    className="w-[13vw] bg-yellow-200 flex justify-center items-center mt-[2.3vh] rounded-lg"
                  />
                </div>

                <div className="mt-[1vh] flex text-[0.83vw]">
                  <strong className=" pr-[1.25vw]">Name </strong>

                  {poke.name}
                </div>

                <div className=" mt-[1vh] flex text-[0.83vw]">
                  <strong className="pr-[1.71vw]"> Type</strong>

                  {poke.forms[0]?.name}
                </div>

                <div className="mt-[1vw] flex text-[0.83vw]">
                  <strong className="pr-[1.1vw]">Moves</strong>
                  {poke.moves[0]?.move?.name}, {poke.moves[1]?.move?.name},
                  {poke.moves[3]?.move?.name}
                </div>

                <div className=" mt-[1vw] flex text-[0.83vw]">
                  <strong className="pr-[0.46vw]">Abilities</strong>
                  {poke.abilities[0]?.ability?.name},{" "}
                  {poke.abilities[1]?.ability?.name}
                </div>

                <div className=" mt-[1vw]  text-[0.83vw] ">
                  <h1 className="text-center font-bold underline text-[1vw]">
                    Stats
                  </h1>
                  <div className="flex  items-center">
                    <strong>{poke.stats[0]?.stat?.name.toUpperCase()}</strong>
                    {"  "}:
                    <h5 className="mx-[0.5vw]">{poke.stats[0]?.base_stat}</h5>
                    <div
                      className="flex  h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                      style={{ width: `200px` }}
                    >
                      <div
                        className="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-600 text-xs text-white text-center whitespace-nowrap dark:bg-yellow-500 transition duration-500 px-2"
                        style={{ width: `${poke.stats[0]?.base_stat}px` }}
                      >
                        {poke.stats[0]?.base_stat}
                      </div>
                    </div>
                  </div>

                  <div className="flex  items-center">
                    <strong>{poke.stats[1]?.stat?.name.toUpperCase()}</strong>
                    {"  "}:
                    <h5 className="mx-[0.5vw]">{poke.stats[1]?.base_stat}</h5>
                    <div
                      className="flex  h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                      style={{ width: `200px` }}
                    >
                      <div
                        className="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-600 text-xs text-white text-center whitespace-nowrap dark:bg-yellow-500 transition duration-500 px-2"
                        style={{ width: `${poke.stats[1]?.base_stat}px` }}
                      >
                        {poke.stats[1]?.base_stat}
                      </div>
                    </div>
                  </div>

                  <div className="flex  items-center">
                    <strong>{poke.stats[2]?.stat?.name.toUpperCase()}</strong>
                    {"  "}:
                    <h5 className="mx-[0.5vw]">{poke.stats[2]?.base_stat}</h5>
                    <div
                      className="flex  h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                      style={{ width: `200px` }}
                    >
                      <div
                        className="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-600 text-xs text-white text-center whitespace-nowrap dark:bg-yellow-500 transition duration-500 px-2"
                        style={{ width: `${poke.stats[2]?.base_stat}px` }}
                      >
                        {poke.stats[2]?.base_stat}
                      </div>
                    </div>
                  </div>

                  <div className="flex  items-center">
                    <strong>{poke.stats[5]?.stat?.name.toUpperCase()}</strong>
                    {"  "}:
                    <h5 className="mx-[0.5vw]">{poke.stats[5]?.base_stat}</h5>
                    <div
                      className="flex  h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                      style={{ width: `200px` }}
                    >
                      <div
                        className="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-600 text-xs text-white text-center whitespace-nowrap dark:bg-yellow-500 transition duration-500 px-2"
                        style={{ width: `${poke.stats[5]?.base_stat}px` }}
                      >
                        {poke.stats[5]?.base_stat}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          Pokie={isModalPokemon}
        />
      )}
      {Search && (
        <div className="flex gap-[2vw] justify-center items-center my-[1.85vh] text-[0.83vw] ml-[10vw] w-[80vw]">
          <button
            className="bg-green-500 w-[5.20vw] h-[4.62vh]  shadow-[2px_4px_10px_rgba(0,128,0,0.5)]
text-white rounded-md hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={offset === 0}
            onClick={() => {
              dispatch({ type: "previousBtn" });
            }}
          >
            Previous
          </button>
          <div className="w-[11vw]">
            <h1>
              Page {pageNumber} of {totalPages}
            </h1>
          </div>
          <button
            className="bg-green-500 w-[5.20vw] h-[4.62vh] shadow-[2px_4px_10px_rgba(0,128,0,0.5)]
text-white rounded-md hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={pageNumber >= totalPages}
            onClick={() => {
              dispatch({ type: "nextBtn" });
            }}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Search;
