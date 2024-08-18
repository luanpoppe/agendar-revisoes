import { Botao } from "./Botao";

/* eslint-disable react/prop-types */
export function Card(props: { revisao: Revisao }) {
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
          {/* <Botao clicarBotao={}>Revisado Hoje</Botao> */}
        </div>
      </div>
    </>
  );
}
