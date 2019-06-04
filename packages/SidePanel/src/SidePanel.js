import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react/dist/focus-trap-react";
import { sidePanelStyles } from "./SidePanel.styles";
import Overlay from "./components/Overlay";
import Trigger from "./components/Trigger";
import Header from "./components/Header";

const propTypes = {
  /** The content for the SidePanel. */
  children: PropTypes.node.isRequired,

  /** The width of the open panel. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Click event for "Escape" key */
  onEscKey: PropTypes.func,

  /** Callback for onOpen event */
  onOpen: PropTypes.func,

  /** Callback for onClose event */
  onClose: PropTypes.func,

  /**
   * Control the visibility of the side panel. This prop makes the side panel
   */
  isOpen: PropTypes.bool.isRequired,

  /** Control the z position of the sidepanel */
  zIndex: PropTypes.number,
};

const defaultProps = {
  closeOnEscKey: true,
  onClose: () => {},
  onOpen: () => {},
  slideDirection: "right",
  width: "33%",
  zIndex: 100,
};

function extractChildren(children) {
  let SidePanelOverlay = null;
  let SidePanelTrigger = null;
  let SidePanelHeader = null;

  const rest = [];
  React.Children.toArray(children).forEach(child => {
    if (child.type) {
      switch (child.type.componentType) {
        case "SidePanel.Overlay":
          SidePanelOverlay = child;
          break;
        case "SidePanel.Header":
          SidePanelHeader = child;
          break;
        case "SidePanel.Trigger":
          SidePanelTrigger = child;
          break;
        default:
          rest.push(child);
      }
    }
  });

  return { Trigger: SidePanelTrigger, Overlay: SidePanelOverlay, Header: SidePanelHeader, children: rest };
}

function SidePanel(props) {
  const [isSidePanelMounted, setMount] = React.useState(props.isOpen);
  const { onClose, onOpen, onEscKey, ...moreProps } = props;

  const refTrigger = React.useRef(null);
  const refSidePanel = React.useRef(null);

  const { Trigger: TriggerExtracted, Overlay: OverlayExtracted, Header: HeaderExtracted, children } = extractChildren(
    props.children
  );

  const handleEscKey = event => {
    if (event.key === "Escape") {
      if (!props.isOpen) {
        if (onEscKey) {
          onEscKey();
        }
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscKey, false);

    if (props.isOpen) {
      setMount(true);
    }

    return () => {
      document.removeEventListener("keyUp", handleEscKey);
    };
  }, [props.isOpen]);

  const handleAnimationEnd = () => {
    if (!props.isOpen) {
      setMount(false);
      onClose();

      if (TriggerExtracted) {
        refTrigger.current.focus();
      }
      return;
    }

    onOpen();
  };

  const sidePanel = isSidePanelMounted
    ? ReactDOM.createPortal(
      <React.Fragment>
        <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
          <div
            role="dialog"
            aria-modal="true"
            ref={refSidePanel}
            onAnimationEnd={handleAnimationEnd}
            {...moreProps}
            css={sidePanelStyles}
          >
            {HeaderExtracted}
            {children}
          </div>
        </FocusTrap>
        {OverlayExtracted}
      </React.Fragment>,
        document.body
      )
    : null;

  const trigger = TriggerExtracted ? React.cloneElement(TriggerExtracted, { ref: refTrigger }) : null;
  return [trigger, sidePanel];
}

SidePanel.propTypes = propTypes;
SidePanel.defaultProps = defaultProps;
SidePanel.Overlay = Overlay;
SidePanel.Trigger = Trigger;
SidePanel.Header = Header;

export default SidePanel;
