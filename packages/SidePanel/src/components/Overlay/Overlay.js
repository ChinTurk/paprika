import React from "react";
import PropTypes from "prop-types";
import Button from "@paprika/button";
import useI18n from "@paprika/l10n/lib/useI18n";
import { visuallyHidden } from "@paprika/stylers/lib/includes";
import { z } from "@paprika/stylers/lib/helpers";
import { overlayCSS } from "./Overlay.styles";

const propTypes = {
  /**
   * Will accept the click event on outside of the sidepanel when losing focus
   * @boolean
   */
  background: PropTypes.string,
  hasOutsideClick: PropTypes.bool,
  onClose: PropTypes.func,
  /** Control the z position of the sidepanel overlay */
  zIndex: PropTypes.number,
};

const defaultProps = {
  background: "#000",
  hasOutsideClick: true,
  onClose: null,
  zIndex: z.toNumber(6),
};

export default function Overlay(props) {
  const I18n = useI18n();

  const { onClose, hasOutsideClick, ...moreProps } = props;
  const handleClick = () => {
    if (hasOutsideClick) {
      onClose();
    }
  };

  const vh = visuallyHidden;

  return (
    <Button isSemantic={false} {...moreProps} onClick={handleClick} css={overlayCSS}>
      <span css={vh}>{I18n.t("close")}</span>
    </Button>
  );
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
Overlay.componentType = "SidePanel.Overlay";
