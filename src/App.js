import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./style.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState(``);
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Digite algum cep!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
    } catch {
      alert("erro ao buscar");
      setInput("");
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Busca CEP</h1>

        <div className="containerInput">
          <input
            type="text"
            maxLength={9}
            placeholder="Cidade"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="buttonSearch" onClick={handleSearch}>
            <BsSearch size={25} color="rgba(0,0,0,0.5)" />
          </button>
        </div>

        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro:{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>Bairro:{cep.bairro}</span>
          <span>
            Cidade: {cep.localidade}
            {cep.uf}
          </span>
        </main>
      </div>
    </div>
  );
}

export default App;
