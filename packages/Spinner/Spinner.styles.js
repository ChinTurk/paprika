import tokens from "@paprika/tokens";
import stylers from "@paprika/stylers";

const SpinnerStyles = () => `

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.spinner__visual {
  animation: spin 1.2s infinite linear;
  border-color: rgba(0, 0, 0, 0.1);
  border-left-color: ${tokens.color.purple};
  border-radius: 50%;
  border-style: solid;
  font-size: rem-calc(${stylers.fontSize(-2)});
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

&.spinner--small .spinner__visual{
  border-width: 2px;
  height: ${stylers.spacer(3)};
  width: ${stylers.spacer(3)};
}

&.spinner--medium .spinner__visual{
  border-width: 3px;
  height: ${stylers.spacer(6)};
  width: ${stylers.spacer(6)};
}

&.spinner--large .spinner__visual{
  border-width: 4px;
  height: ${stylers.spacer(9)};
  width: ${stylers.spacer(9)};
}

.spinner__caption {
  color: ${tokens.color.blackLighten20};
  font-weight: normal;
  ${stylers.lineHeight(-2)}
  margin: ${tokens.space} auto 0 auto;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}

&.spinner--small .spinner__caption {
  ${stylers.fontSize(-3)};
  max-width: 210px;
}

&.spinner--medium .spinner__caption {
  ${stylers.fontSize(-1)};
  max-width: 240px;
}

&.spinner--large .spinner__caption {
  ${stylers.fontSize()};
  max-width: 270px;
}

.spinner__aria-alert {
  ${stylers.visuallyHidden}
}
`;

export default SpinnerStyles;
