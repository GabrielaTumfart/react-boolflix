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
import { useState } from 'react';
import axios from 'axios';

export default function Header() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const loadData = () => {
    // per alcune api potrebbe essere necessario usare un endpoint diverso
    // se search è vuoto
    axios
      .get(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => setData(res.data));
  };

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