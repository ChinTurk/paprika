import React from "react";
import PropTypes from "prop-types";
import RawButton from "@paprika/raw-button";
import { overlayCSS } from "./Overlay.styles";

const propTypes = {
  /**
   * Will accept the click event on outside of the sidepanel when losing focus
   * @boolean
   */
  // hasOutsideClick: PropTypes.bool,

  /** Disable the scroll of the body when SidePanel is open. */
  // disabledBodyScroll: PropTypes.bool,

  background: PropTypes.string,
  onClick: PropTypes.func,
  opacity: PropTypes.string,
  /** Control the z position of the sidepanel overlay */
  zIndex: PropTypes.number,
};

const defaultProps = {
  background: "#000",
  opacity: "0.2",
  onClick: null,
  zIndex: 99,
};

export default function Overlay(props) {
  const { onClick, ...moreProps } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <RawButton {...moreProps} onClick={handleClick} css={overlayCSS}>
      Close
    </RawButton>
  );
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
Overlay.componentType = "SidePanel.Overlay";
