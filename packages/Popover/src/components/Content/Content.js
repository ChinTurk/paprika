import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import isCurrentTargetFocused from "../../helpers/isCurrentTargetFocused";
import { PopoverContext } from "../../Popover";
import { consts as PopoverConstants } from "../../Popover.styles";
import { ContentStyled } from "./Content.styles";

const propTypes = {
  children: PropTypes.node.isRequired,
  onBlur: PropTypes.func,
  zIndex: PropTypes.number,
};

const defaultProps = {
  onBlur: () => {},
  zIndex: 1,
};

const Content = React.forwardRef((props, ref) => {
  const { onBlur, children, zIndex, ...moreProps } = props;
  // TODO: extract this to Storybook story somehow so supporting numbers as strings is not required
  function isNumber(n) {
    return RegExp(/^[0-9]+$/).test(n);
  }

  const handleMouseEvent = (isEager, onDelayedClose, onDelayedOpen) => event => {
    if (!isEager) return;
    if (event.type === "mouseover") {
      onDelayedOpen();
    } else if (event.type === "mouseout") {
      onDelayedClose();
    }
  };

  const handleBlur = onClose => event => {
    // onblur canceling onclick the following happens when:
    // Clicking twice the trigger button (open, close), will fire an onclick and onblur event
    // creating a race condition nullyfing the onClick and keeping the popover open
    // https://stackoverflow.com/questions/121499/when-a-blur-event-occurs-how-can-i-find-out-which-element-focus-went-to
    // the previous link answer suggested the use of the mouseDown event, thought, that will kill all accessibility of onClick,
    // as well will affect the devUX when you want to have a controlled Popover forcing the use of mouseDown event instead of onClick

    // Solution https://stackoverflow.com/a/121708/196038
    // Use timeout to delay examination of activeElement until after blur/focus
    // events have been processed.

    // sythetic asyn event react https://reactjs.org/docs/events.html#event-pooling
    event.persist();
    setTimeout(() => {
      if (!isCurrentTargetFocused(event)) {
        onClose();
        onBlur();
      }
    }, parseInt(PopoverConstants.transition, 10));
  };

  const {
    content,
    isEager,
    isOpen,
    onClose,
    onDelayedClose,
    onDelayedOpen,
    portalElement,
    refContent,
  } = React.useContext(PopoverContext);

  const handleRef = _ref => {
    refContent(_ref);
    if (ref) {
      // https://github.com/reactjs/rfcs/blob/master/text/0017-new-create-ref.md#basic-example
      ref.current = _ref; // eslint-disable-line
    }
  };

  const contentStyles = {
    left: content.x,
    maxWidth: isNumber(content.maxWidth) ? `${content.maxWidth}px` : content.maxWidth,
    top: content.y,
    width: content.width,
  };

  const handler = handleMouseEvent(isEager, onDelayedClose, onDelayedOpen);

  /* eslint-disable jsx-a11y/mouse-events-have-key-events */
  return ReactDOM.createPortal(
    <ContentStyled
      {...moreProps}
      aria-hidden={!isOpen}
      data-component-name="PopoverContent"
      data-qa-anchor="popover-content"
      ref={handleRef}
      isOpen={isOpen}
      onBlur={handleBlur(onClose)}
      onMouseOut={handler}
      onMouseOver={handler}
      style={contentStyles}
      tabIndex={isOpen ? 0 : -1}
      zIndex={zIndex}
    >
      {children}
    </ContentStyled>,
    portalElement
  );
});
/* eslint-enable jsx-a11y/mouse-events-have-key-events */

Content.displayName = "Popover.Content";

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;
export default Content;
