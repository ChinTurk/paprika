/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from "react";
import PropTypes from "prop-types";
import { dialogStyles, dialogContentStyles } from "./Dialog.styles";

const propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  groupOffsetY: PropTypes.number,
  header: PropTypes.node,
  kind: PropTypes.oneOf(["default", "child"]),
  isCompact: PropTypes.bool,
  isInline: PropTypes.bool,
  offsetY: PropTypes.number,
  onAnimationEnd: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  refHeader: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  refSidePanelContent: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const defaultProps = {
  footer: null,
  groupOffsetY: 0,
  header: null,
  kind: "default",
  isCompact: false,
  isInline: false,
  offsetY: 0,
  onClose: () => {},
};

function Dialog(props) {
  const refSidePanel = React.useRef(null);

  const {
    children,
    footer,
    groupOffsetY,
    onAnimationEnd,
    header,
    kind,
    isCompact,
    isInline,
    offsetY,
    onClose,
    refHeader,
    refSidePanelContent,
    width,
    isOpen,
    ...moreProps
  } = props;
  const [isAnimationDone, setIsAnimationDone] = React.useState(false);

  function handleAnimationEnd() {
    if (!isAnimationDone) setIsAnimationDone(true);
    onAnimationEnd();
  }

  return (
    <div
      aria-modal={isInline ? null : "true"}
      css={dialogStyles}
      groupOffsetY={groupOffsetY}
      kind={kind}
      isCompact={isCompact}
      isInline={isInline}
      isOpen={isOpen}
      offsetY={offsetY}
      onAnimationEnd={handleAnimationEnd}
      ref={refSidePanel}
      role="dialog"
      tabIndex="-1"
      width={width}
      {...moreProps}
    >
      {header ? React.cloneElement(header, { ref: refHeader, isCompact, onClose }) : null}
      <div
        data-pka-anchor="sidepanel.content"
        css={dialogContentStyles}
        isCompact={isCompact}
        isOpen={isOpen}
        isSticky={footer ? footer.props.isSticky : undefined}
        footerHeight={footer ? footer.props.height : undefined}
        kind={kind}
        tabIndex="0"
        ref={refSidePanelContent}
      >
        {children}
      </div>
      {footer ? React.cloneElement(footer, { refSidePanel, isCompact, width, isAnimationDone }) : null}
    </div>
  );
}

export default Dialog;

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;
