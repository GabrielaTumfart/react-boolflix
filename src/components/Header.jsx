/*Tutor Stefano ci ha disponibillizzato:
function Component() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = () => {
    // per alcune api potrebbe essere necessario usare un endpoint diverso
    // se search è vuoto
    axios
      .get(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => setData(res.data));
  };

  // se metto search nelle dipendenze, caricamento per ogni volta che digito, IN SPECIALIZZAZIONE
  // TECNICHE PER GESTIRLO CORRETTAMENTE (magari la clear up function potrebbe aiutare...)
  useEffect(loadData, [search]);

  // se NON metto search nelle dipendenze, non faccio fetch quando digito MA! lo delego quando clicco il pulsante
  useEffect(loadData, []);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={loadData}>Search!</button>
    </>
  );
}
*/
import { useEffect, useState } from "react";
import axios from "axios";
import { languages } from "../data/languages";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Header() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = () => {
    axios
      .get(API_URL + "/search/movie", {
        params: {
          api_key: API_KEY,
          query: search,
          language: "it-IT",
        },
      })
      .then(function (res) {
        setData(res.data.results);
        console.log(res.data);
        console.table(res.data.results); //results[0].name
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(loadData, []);

  return (
    <>
      <h1>BoolFlix</h1>
      <div>
        <input
          type="text"
          placeholder="Cerca un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={loadData}>Cerca</button>
      </div>
      <ul>
        {data.map((movie) => (
          <li key={movie.id}>
            <p>Titolo: {movie.title}</p>
            <p>Titolo Originale: {movie.original_title}</p>
            <p>Lingua: {movie.original_language}</p>
            <p>Voto: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
