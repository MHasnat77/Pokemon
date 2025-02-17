import React, { useEffect, useState, useReducer, useRef } from "react";
import axios from "axios";

import Search from "./Search";
import Pokemon from "../assets/pokemonIcon.svg";
import BASE_URL from "../config/Url";
import Display from "./Display";
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
const PokemonCatalog = () => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemon2, setPokemon2] = useState([]);
  const [error, setError] = useState(null);
  const [offset, dispatch] = useReducer(reducer, 0);
  const [limit, setlimit] = useState(20);
  const [isSearch, setSearchPokemon] = useState(false);
  const searchInputRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteringPokemon, setFilteredPokemon] = useState([]);

  const fetchPokemon = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      setPokemon((poke) => [...poke, response?.data]);

      setError(null);
    } catch (err) {
      setSearchPokemon(false);
      fetchPokedex();
    }
  };

  const fetchPokemon2 = async (pokemon2) => {
    try {
      const response = await axios.get(pokemon2.url);
      setPokemon2((poke) => [...poke, response?.data]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Pokémon data.");
      setSearchPokemon(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setFilteredPokemon([]);
      if (searchInput.length > 0) {
        const filteredPokemons = pokemon2.filter((poke) =>
          poke.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchPokemon(true);
        setFilteredPokemon(filteredPokemons);
        setPokemon(filteredPokemons);
      } else {
        setSearchPokemon(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput, filteringPokemon]);

  const fetchPokedex2 = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?offset=${offset}&limit=10000`
      );
      const allPokemon = response.data.results;
      console.log(allPokemon);
      allPokemon.forEach((pokie) => {
        fetchPokemon2(pokie);
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch Pokedex data.");
    }
  };
  const fetchPokedex = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?offset=${offset}&limit=${limit}`
      );
      const allPokemon = response.data.results;
      allPokemon.forEach((pokie) => {
        fetchPokemon(pokie);
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch Pokedex data.");
    }
  };

  useEffect(() => {
    if (!isSearch) {
      setPokemon([]);
      fetchPokemon();
    } else {
      // setPokemon([]);
      setPokemon2([]);
      fetchPokedex2();
    }
  }, [offset, isSearch]);

  return (
    <>
      <div>
        <div className="bg-gray-800  text-center py-[1.85vh] text-bold flex items-center justify-between shadow-lg shadow-yellow-300 mb-[1vh] overflow-hidden w-full px-4">
          <div className="flex items-center">
            <a href="#">
              <h2
                className="text-[3.12vw] text-yellow-300 cursor-pointer"
                onClick={() => {
                  setPokemon([]);
                  fetchPokedex();
                }}
              >
                Pokemon
              </h2>
            </a>
            <img src={Pokemon} alt="" className="w-[5vw] ml-2 " />
          </div>

          <div className="flex items-center ml-auto p-1 rounded">
            <input
              type="search"
              name="search"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              ref={searchInputRef}
              className="w-[10vw] h-[4vh] px-2 rounded-l text-gray-700"
              placeholder="Search Pokemon"
            />
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          {/* Default Display */}
          <Display Search={isSearch} PokemonCards={pokemon} />
          {/* Search Display */}
          <Search Search={isSearch} Filter={pokemon} />
        </div>
      </div>

      {!isSearch && (
        <div className="flex gap-[2vw] justify-center items-center my-[1.85vh] text-[0.83vw]">
          <button
            className="bg-green-500 w-[5.20vw] h-[4.62vh]  shadow-[2px_4px_10px_rgba(0,128,0,0.5)]
text-white rounded-md hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={offset === 0}
            onClick={() => {
              setPokemon([]);
              setSearchPokemon(false);
              dispatch({ type: "previousBtn" });
            }}
          >
            Previous
          </button>
          <div>
            <h1>
              Page {offset / 20 + 1} of {10000 / 20}
            </h1>
          </div>
          <button
            className="bg-green-500 w-[5.20vw] h-[4.62vh] shadow-[2px_4px_10px_rgba(0,128,0,0.5)]
text-white rounded-md hover:bg-green-900 "
            onClick={() => {
              setPokemon([]);
              setSearchPokemon(false);
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

export default PokemonCatalog;
