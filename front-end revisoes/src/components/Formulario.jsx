import axios from "axios";

export function Formulario() {
  const dataHoje = new Date();
  const dataHojeFormatada = `${dataHoje.getFullYear()}-${
    dataHoje.getMonth() + 1
  }-${dataHoje.getDate()}`;

  console.log(dataHojeFormatada);
  function enviarRequisicao() {
    const userData = {
      // o DOM é um grande objeto
      nome: window.document.getElementById("nome").value,
      area: window.document.getElementById("area").value,
      intervalo_revisao: window.document.getElementById("intervalo").value,
      // ultima_data: window.document.getElementById("ultima-data").value,
      dificuldade: window.document.getElementById("dificuldade").value,
      url_notion: window.document.getElementById("url").value,
    };

    axios.post("http://127.0.0.1:8000/revisoes/", userData).then((resposta) => {
      console.log(resposta);
      return;
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
      <div className="mb-3">
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
      </div>
      <div className="mb-3">
        <label htmlFor="dificuldade" className="form-label">
          Dificuldade
        </label>
        <select id="dificuldade" className="form-select">
          <option value="f">Fácil</option>
          <option value="m" selected>
            Médio
          </option>
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
        Enviar
      </button>
    </form>
  );
}
