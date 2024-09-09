import axios from "axios";
import { Botao } from "./Botao";

/* eslint-disable react/prop-types */
export function Card(props: { revisao: Revisao }) {
  function revisarCard() {
    const input = document.getElementById(`input-${props.revisao.id}`) as HTMLInputElement
    if (input.value) {
      props.revisao.intervalo_revisao = parseInt(input.value)
      props.revisao.proxima_data = undefined
      console.log('props.revisao: ', props.revisao)
      // axios.patch(`http://localhost:8000/revisao/${props.revisao.id}`, props.revisao)
    }
  }

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.revisao.nome}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {props.revisao.area}
          </h6>
          <p className="card-text">
            Intervalo: {props.revisao.intervalo_revisao}
          </p>
          <p className="card-text">
            Última revisão: {props.revisao.ultima_data}
          </p>
          <p className="card-text">
            Próxima revisão: {props.revisao.proxima_data}
          </p>
          <p className="card-text">Dificuldade: {props.revisao.dificuldade}</p>
          <a
            href={props.revisao.url_notion}
            target="_blank"
            className="card-link"
          >
            Link do Notion
          </a>
          <div className="justify-content-center mt-3">
            <label className="mb-1" htmlFor={`input-${props.revisao.id}`}>Intervalo próxima Revisão: </label>
            <input className="mb-3" type="number" id={`input-${props.revisao.id}`}/>
            <Botao color="primary" clicarBotao={revisarCard}>Revisado Hoje</Botao>
          </div>
        </div>
      </div>
    </>
  );
}
