import { Fragment } from "react";
import "./App.css";
import { Titulo } from "./components/Titulo.jsx";
import { Botao } from "./components/Botao.jsx";
// import { Card } from "./components/Card.jsx";
import { Formulario } from "./components/Formulario.jsx";

function App() {
  return (
    <Fragment>
      <Titulo></Titulo>
      <Formulario></Formulario>
      <h3>Pegue as revisões do dia aqui:</h3>
      <Botao></Botao>
      {/* <Card></Card> */}
    </Fragment>
  );
}

export default App;
