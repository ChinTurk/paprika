import { css, keyframes } from "styled-components";

function slideIn(width) {
  return keyframes`
  from {
    opacity: 0;
    right: -${width};
  }

  to {
    opacity: 1;
    right: 0;
  }
  `;
}

function slideOut(width) {
  return keyframes`
  from {
    opacity: 1;
    right: 0;
  }

  to {
    opacity: 0;
    right: -${width};
  }
  `;
}

export const sidePanelStyles = css`
  background: #fff;
  box-sizing: border-box;
  height: 100%;
  position: fixed;
  top: 0;

  ${props => {
    const width = Number.isNaN(Number(props.width)) ? props.width : `${props.width}px`;
    const animation = props.isOpen ? slideIn(width) : slideOut(width);

    return css`
      animation: ${animation} 0.5s ease;
      right: 0;
      width: ${width};
      z-index: ${props.zIndex};
      ${props.isOpen ? "opacity: 1" : "opacity: 0"};
    `;
  }}
`;
