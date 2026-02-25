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
const IMG_URL = import.meta.env.VITE_IMG_URL;

export default function Header() {
  const [data, setData] = useState([]);
  const [tvData, setTvData] = useState([]);
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

    //aggiungo un secondo stato per le serie TV e una seconda chiamata API

    axios
      .get(API_URL + "/search/tv", {
        params: {
          api_key: API_KEY,
          query: search,
          language: "it-IT",
        },
      })
      .then(function (res) {
        setTvData(res.data.results);
        console.table(res.data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(loadData, []);

  return (
    <>
      <h1>BoolFlix</h1>
      <h2>FILM</h2>
      <div>
        <input
          type="text"
          placeholder="Cerca un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={loadData}>Cerca</button>
      </div>
      <div className="row">
        {data.map((movie) => (
          <div className="col-3" key={movie.id}>
            <div className="card">
              <p>Titolo: {movie.title}</p>
              <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
              <p>Titolo Originale: {movie.original_title}</p>
              <span
                className={`fi fi-${languages[movie.original_language]}`}
              ></span>
              <p>Voto: ⭐️{Math.round(movie.vote_average * 0.5)}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>SERIE TV</h2>
      <>
        <div className="row">
          {tvData.map((tv) => (
            <div className="col-3" key={tv.id}>
              <div className="card">
                <img src={`${IMG_URL}${tv.poster_path}`} alt={tv.name} />
                <p>Titolo: {tv.name}</p>
                <p>Titolo Originale: {tv.original_name}</p>
                <span
                  className={`fi fi-${languages[tv.original_language]}`}
                ></span>
                <p>Voto: ⭐️{Math.round(tv.vote_average * 0.5 * 10)}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    </>
  );
}
