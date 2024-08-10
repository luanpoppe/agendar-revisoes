/* eslint-disable react/prop-types */
import axios from "axios";

export function Botao() {
  function fazerGet() {
    axios.get("").then((resposta) => {
      console.log(resposta);
    });
  }

  return (
    <button type="button" className="btn btn-primary" onClick={fazerGet}>
      Clique aqui
    </button>
  );
}
