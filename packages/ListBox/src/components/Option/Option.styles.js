import styled from "styled-components";
import tokens from "@paprika/tokens";

const blueSelected = "#e5f1fe";

export const OptionStyled = styled.li`
  padding: 4px;
  margin-bottom: 4px;
  font-size: 13px;
  border-radius: 3px;

  &:hover {
    ${props => {
      const isSelected = props.isSelected ? `background: ${blueSelected}` : `background: #f0f0f0`;
      const isDisabled = props.isDisabled ? "background: transparent; cursor: not-allowed; border: 0;" : "";
      const hasPreventDefaultOnSelect = props.hasPreventDefaultOnSelect ? "background: transparent;" : "";

      return `
        ${isSelected}
        ${isDisabled}
        ${hasPreventDefaultOnSelect}
      `;
    }}
  }

  ${props => {
    const isDisabled = props.isDisabled
      ? `color: ${tokens.color.blackLighten60}; border: 0; background: transparent;`
      : "";

    const isActived = props.isActive
      ? `
        border: 3px solid Highlight;
        border-radius: 3px;
        `
      : "";

    const hasPreventDefaultOnSelect =
      props.isActive && props.hasPreventDefaultOnSelect ? `border: 2px solid ${tokens.color.blackLighten60}` : "";

    const isSelected = props.isSelected ? `font-weight: 600; background: ${blueSelected}` : "";

    return `
      ${isActived}
      ${hasPreventDefaultOnSelect}
      ${isSelected}
      ${isDisabled}
    `;
  }}
`;
