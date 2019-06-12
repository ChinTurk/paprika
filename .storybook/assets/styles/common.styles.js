import styled from "styled-components";
import tokens from "@paprika/tokens";
import stylers from "@paprika/stylers";

// Common Storybook story styles

export const Story = styled.div`
  padding: ${stylers.spacer(3)};

  h1 {
    margin-top: 0;
  }
`;

export const CenteredStory = styled.div`
  ${stylers.alignMiddle}
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

export const Rule = styled.hr`
  border: none;
  border-bottom: 1px solid ${tokens.border.color};
  margin: ${stylers.spacer(4)} 0;
`;

export const Small = styled.small`
  ${stylers.fontSize(-1)}
`;

export const Large = styled.big`
  ${stylers.fontSize(1)}
`;

export const Subtle = styled.small`
  ${stylers.fontSize(-1)}
  color: ${tokens.color.blackLighten40};
  font-weight: normal;
`;

export const Tagline = styled.div`
  color: ${tokens.textColor.subtle};
  font-style: italic;
`;

export const Gap = styled.div`
  height: ${stylers.spacer(3)};
`;
