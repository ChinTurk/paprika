import { css } from "styled-components";

import tokens from "@paprika/tokens";
import stylers from "@paprika/stylers";

export const iconStyles = css`
  margin-right: ${tokens.spaceSm};
  margin-top: 2px;
`;

const errorMessageStyles = css`
  color: ${tokens.color.orangeDarken10};
  line-height: 1.3;
  margin: ${tokens.spaceSm} 0 0 0;
`;

export default errorMessageStyles;
