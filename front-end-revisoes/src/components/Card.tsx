import { differenceInDays } from "date-fns";
import { useGlobalContext } from "../GlobalContext";
import { inativarCard, revisarCard } from "../utils/revisarCard";
import { Botao } from "./Botao";

type Props = { revisao: Revisao };

/* eslint-disable react/prop-types */
export function Card({ revisao }: Props) {
  const { setIsLoading } = useGlobalContext();
  return (
    <>
      <div className="card m-2" style={{ width: "24rem" }}>
        <div className="card-body">
          <h5 className="card-title">{revisao.nome}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {revisao.area}
          </h6>
          <p className="card-text">Intervalo: {revisao.intervalo_revisao}</p>
          <p className="card-text">
            Intervalo na prática:{" "}
            {differenceInDays(revisao.proxima_data, revisao.ultima_data)}
          </p>
          <p className="card-text">Última revisão: {revisao.ultima_data}</p>
          <p className="card-text">Próxima revisão: {revisao.proxima_data}</p>
          <p className="card-text">Dificuldade: {revisao.dificuldade}</p>
          <a href={revisao.url_notion} target="_blank" className="card-link">
            Link do Notion
          </a>
          <div className="justify-content-center mt-3">
            <label className="mb-1" htmlFor={`input-${revisao.id}`}>
              Intervalo próxima Revisão:{" "}
            </label>
            <input className="mb-3" type="number" id={`input-${revisao.id}`} />
            <div className="d-flex gap-3 justify-content-center">
              <Botao
                color="primary"
                clicarBotao={() => revisarCard(revisao, setIsLoading)}
              >
                Revisado Hoje
              </Botao>
              <Botao
                color="warning"
                clicarBotao={() => inativarCard(revisao, setIsLoading)}
              >
                Desativar
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
