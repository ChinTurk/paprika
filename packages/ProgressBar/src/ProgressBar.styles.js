import styled, { keyframes, css } from "styled-components";
import tokens from "@paprika/tokens";
import stylers from "@paprika/stylers";

export const ProgressBar = styled.div`
  text-align: center;
  width: 100%;
`;

const progress = keyframes`
  0% { background-position: right bottom; }
  100% { background-position: left bottom; }
`;

export const BarFiller = styled.div(
  ({ completed }) => css`
    animation: ${progress} ease 1.5s infinite;
    background-image: linear-gradient(
      270deg,
      ${tokens.color.purple} 30%,
      ${tokens.color.purpleLighten20} 80%,
      ${tokens.color.purple} 100%
    );
    background-size: 200% 200%;
    transition: width 0.2s ease;
    width: ${completed}%;
  `
);

export const Bar = styled.div`
  background-color: ${tokens.color.blackLighten80};
  border: 1px solid ${tokens.border.color};
  border-radius: ${tokens.border.radius};
  display: flex;
  height: ${stylers.spacer(2)};
  overflow: hidden;
  width: 100%;
`;

export const Body = styled.p`
  ${stylers.fontSize()};
`;

export const BarAria = styled.div`
  ${stylers.visuallyHidden}
`;