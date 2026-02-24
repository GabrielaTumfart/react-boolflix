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
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Header() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = () => {
    // per alcune api potrebbe essere necessario usare un endpoint diverso
    // se search è vuoto
    axios
      .get(API_URL + "/discover/tv", {
        params: {
          api_key: API_KEY,
        },
      })
      .then(function (res) {
        setData(res.data);
        console.log(res.data);
        console.log(res.data.results[0].name);
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
        <input type="text" placeholder="Cerca un film..." />
        <button>Cerca</button>
      </div>
    </>
  );
}
