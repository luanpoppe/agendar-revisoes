/* eslint-disable react/prop-types */

export function Botao(props) {
  return (
    <button
      type="button"
      className={`btn btn-${props.color}`}
      onClick={props.clicarBotao}
    >
      {props.children}
    </button>
  );
}
