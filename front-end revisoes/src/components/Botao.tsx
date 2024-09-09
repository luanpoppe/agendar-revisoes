/* eslint-disable react/prop-types */

export function Botao(props: {color: string, children?: string, clicarBotao: any}) {
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
