import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
import { ShirtSizes } from "@paprika/helpers/lib/customPropTypes";
import CheckIcon from "@paprika/icon/lib/Check";
import radioStyles from "./Radio.styles";
import Group from "./components/Group";

const propTypes = {
  a11yText: PropTypes.string,
  children: PropTypes.node,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  canDeselect: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(ShirtSizes.DEFAULT),
};

const defaultProps = {
  a11yText: null,
  isChecked: false,
  canDeselect: false,
  children: null,
  isDisabled: false,
  size: ShirtSizes.MEDIUM,
};

const Radio = props => {
  const { a11yText, children, isChecked, canDeselect, isDisabled, size, onClick, ...moreProps } = props;

  const radioId = React.useRef(uuid()).current;
  const inputRef = React.useRef(null);

  const styleProps = {
    hasLabel: !!children,
    size,
  };

  const handleKeyDown = event => {
    if (
      // Prevent scrolling the page with a spacerbar keypress
      event.key === " " ||
      // Prevent submitting forms in IE/Edge with and enter keypress
      event.key === "Enter"
    ) {
      event.preventDefault();
    }
  };

  const handleKeyUp = event => {
    const isTriggerKey = event.key === " "; // space key
    if (!isDisabled && isTriggerKey) {
      onClick(event);
    }
  };

  const inputProps = {};
  if (a11yText) inputProps["aria-label"] = a11yText;
  return (
    <div data-pka-anchor="radio" css={radioStyles} {...styleProps} {...moreProps}>
      <input
        onChange={() => {}}
        onClick={onClick}
        checked={isChecked}
        disabled={isDisabled}
        id={radioId}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        type="radio"
        {...inputProps}
      />
      <label onKeyUp={handleKeyUp} className={canDeselect ? "deselectable" : ""} htmlFor={radioId}>
        {children}

        {canDeselect ? (
          <CheckIcon className="radio-icon" aria-hidden data-pka-anchor="radio.icon.check" />
        ) : (
          <div className="radio-icon radio-solid-background" data-pka-anchor="radio.icon.check" />
        )}
      </label>
    </div>
  );
};

Radio.displayName = "Radio";
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
Radio.Group = Group;

export default Radio;
