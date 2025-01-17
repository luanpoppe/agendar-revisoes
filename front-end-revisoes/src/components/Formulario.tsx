import axios from "axios";
import { apiUrl } from "../environments";
import { Loading } from "./Loading";
import { useGlobalContext } from "../GlobalContext";

type Props = {
  handleGetRevisao: any;
};

export function Formulario({ handleGetRevisao }: Props) {
  const { isLoading, setIsLoading, setCardsRevisoes } = useGlobalContext();

  const dataHoje = new Date();
  const dataHojeFormatada = `${dataHoje.getFullYear()}-${
    dataHoje.getMonth() + 1
  }-${dataHoje.getDate()}`;

  function enviarRequisicao() {
    setIsLoading(true);
    const userData = {
      // o DOM é um grande objeto
      nome: window.document.getElementById("nome").value,
      area: window.document.getElementById("area").value,
      intervalo_revisao: window.document.getElementById("intervalo").value,
      // ultima_data: window.document.getElementById("ultima-data").value,
      dificuldade: window.document.getElementById("dificuldade").value,
      url_notion: window.document.getElementById("url").value,
    };

    axios.post(`${apiUrl}/revisoes/`, userData).then((resposta) => {
      console.log(resposta);
      const url = document.getElementById("url") as HTMLInputElement;
      const nome = document.getElementById("nome") as HTMLInputElement;
      url.value = "";
      nome.value = "";
      setIsLoading(false);
      return handleGetRevisao();
    });
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome
        </label>
        <input type="text" className="form-control" id="nome" />
      </div>
      <div className="mb-3">
        <label htmlFor="area" className="form-label">
          Área
        </label>
        <input type="text" className="form-control" id="area" />
      </div>
      <div className="mb-3">
        <label htmlFor="intervalo" className="form-label">
          Intervalo de Dias
        </label>
        <input type="text" className="form-control" id="intervalo" />
      </div>
      {/* <div className="mb-3">
        <label htmlFor="data" className="form-label">
          Próxima Data
        </label>
        <input type="date" className="form-control" id="data" />
      </div>
      <div className="mb-3">
        <label htmlFor="ultima-data" className="form-label">
          Última data:
        </label>
        <input
          type="date"
          className="form-control"
          id="ultima-data"
          defaultValue={dataHojeFormatada}
        />
      </div> */}
      <div className="mb-3">
        <label htmlFor="dificuldade" className="form-label">
          Dificuldade
        </label>
        <select defaultValue={"m"} id="dificuldade" className="form-select">
          <option value="f">Fácil</option>
          <option value="m">Médio</option>
          <option value="d">Difícil</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">
          Link do Notion
        </label>
        <input type="url" className="form-control" id="url" />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={enviarRequisicao}
      >
        {isLoading ? <Loading /> : "Enviar"}
      </button>
    </form>
  );
}
