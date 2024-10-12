/* eslint-disable react/prop-types */

export function Botao(props: {color: string, children?: string, clicarBotao: any, buttonId?: string}) {
  return (
    <button
      type="button"
      className={`btn btn-${props.color}`}
      onClick={props.clicarBotao}
      id = {props.buttonId ? props.buttonId : ""}
    >
      {props.children}
    </button>
  );
}
