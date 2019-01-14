import React, { Component } from "react";
import { func, node, bool, string, number, oneOf, oneOfType } from "prop-types";
import throttle from "lodash.throttle";
import tokens from "@acl-ui/tokens";
import isInsideBoundaries from "./helpers/isInsideBoundaries";
import {
  getContentCoordinates,
  getTipCoordinates
} from "./helpers/getPosition";
import { isActiveElementPopover } from "./helpers/isActiveElementPopover";

import Content from "./components/Content/Content";
import Card from "./components/Card/Card";
import Trigger from "./components/Trigger/Trigger";
import Tip from "./components/Tip/Tip";

import PopoverStyled from "./Popover.styles";

// ACCESSIBILITY
// NOTE: When closing the popover interaction seems to be better to focus the trigger button
//       only when the close method is the ESC key, when clicking outside don't feel a fluid action
//       to assign focus to the button again

export const PopoverContext = React.createContext();

const openDelay = 350;
const closeDelay = 150;
const throttleDelay = 20;

// TODO: To handle cases where there are multiple scrolling containers, we need to implement
//       getScrollContainer as oneOfType([func, arrayOf(func)])

// TODO: To accommodate cases like a popover menu, we need two additional alignment options:
//       leftEdge and rightEdge.

const propTypes = {
  /** Where the popover content is positioned relative to the trigger or getPositioningElement. */
  align: oneOf(["top", "right", "bottom", "left"]),

  /** Content of the popover */
  children: node.isRequired,

  /** Displays as a "tooltip" style with white text on black background. */
  isDark: bool,

  /** Activated by mouseOver / focus instead of onClick. */
  isEager: bool,

  /** How "controlled" popovers are shown / hidden. */
  isOpen: bool,

  /** How "uncontrolled" popovers can be rendered open by default. */
  defaultIsOpen: bool,

  /** Maximum width of popover content. Use of a number will imply px units and is recommended. */
  maxWidth: oneOfType([string, number]),

  /** Callback to fire when user closes popover. */
  onClose: func,

  /** Distance, in px, between popover content edge and trigger / getPositioningElement. */
  offset: number,

  /** Function that provides DOM element to use as target for positioning the popover. */
  getPositioningElement: func,

  /** Function that provides the scrolling DOM element that contains the popover. */
  getScrollContainer: func
};

const defaultProps = {
  align: "bottom",
  isDark: false,
  isEager: false,
  isOpen: null,
  defaultIsOpen: null,
  maxWidth: 320,
  onClose: null,
  offset: parseInt(tokens.spaceLg, 10),
  getPositioningElement: null,
  getScrollContainer: null
};

export default class Popover extends Component {
  constructor(props) {
    super(props);

    this.hasListeners = false;
    this.$popover = React.createRef();
    this.$trigger = null;
    this.$tip = null; // this ref comes from a callback of the <Tip /> component

    const portalNode = document.createElement("div");
    portalNode.setAttribute("data-component-name", "PopoverPortal");
    this.$portal = document.body.appendChild(portalNode);

    this.state = {
      hasError: false,
      isOpen: this.props.defaultIsOpen || false,
      tip: {
        x: 0,
        y: 0
      },
      content: {
        x: 0,
        y: 0
      },
      width: "auto"
    };

    // NOTE: should we created a link explaining more deeply this kind of errors?
    //       this type of validation should live in the constructor or somewhere else?

    if (props.isOpen !== null && props.defaultIsOpen !== null) {
      console.error(
        `The use of defaultIsOpen prop is for uncontrolled components only and cannot be used when
        isOpen prop is also provided.`
      );
    }

    if (props.isOpen !== null && props.onClose === null) {
      console.error(
        "This Popover is controlled by its isOpen prop but no onClose prop was provided."
      );
    }
  }

  componentDidMount() {
    // about setState for Popovers and Tooltips in ComponentDidMount
    // https://reactjs.org/docs/react-component.html#componentdidmount

    if (this.isOpen()) {
      this.addListeners();
      this.setPosition();
    }
  }

  componentDidUpdate(previousProps) {
    debugger;
    if (this.isOpen() && !this.hasListeners) {
      this.addListeners();
    }

    if (this.isOpen() && previousProps !== this.props) this.setPosition();
  }

  // componentDidCatch is failing with the linter
  // eslint-disable-next-line
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });

    // NOTE: we might want to log this in somewhere maybe
    // have a service for this? maybe new relic?
  }

  componentWillUnmount() {
    this.removeListeners();

    clearTimeout(this.openTimer);
    this.openTimer = null;
    clearTimeout(this.closeTimer);
    this.closeTimer = null;

    document.body.removeChild(this.$portal);
  }

  getContentWidth() {
    const $shadowContent = this.$content.cloneNode(true);
    $shadowContent.style.visibility = "hidden";
    $shadowContent.style.top = 0;
    $shadowContent.style.left = 0;
    $shadowContent.style.width = "auto";
    $shadowContent.style.maxWidth = this.props.maxWidth;

    document.body.appendChild($shadowContent);
    const contentWidth = $shadowContent.getBoundingClientRect().width;
    document.body.removeChild($shadowContent);

    return contentWidth;
  }

  setPositionState(isOpening = false) {
    const { content, tip } = this.getCoordinates();

    const newState = {
      content,
      tip
    };
    if (isOpening) newState.isOpen = true;

    this.setState(newState);
  }

  setPosition(isOpening = false) {
    // dynamically setting a fixed width before positioning avoids issues at the
    // right edge of the screen
    if (isOpening && ["top", "bottom"].includes(this.props.align)) {
      const newWidth = this.getContentWidth();
      if (newWidth !== this.state.width) {
        this.setState({ width: newWidth }, () => {
          this.setPositionState(isOpening);
        });
        return;
      }
    }

    this.setPositionState(isOpening);
  }

  isOpen() {
    return this.props.isOpen !== null ? this.props.isOpen : this.state.isOpen;
  }

  getCoordinates = () => {
    const { align, getScrollContainer } = this.props;

    const targetRect =
      this.props.getPositioningElement === null
        ? this.$popover.current.getBoundingClientRect()
        : this.props.getPositioningElement().getBoundingClientRect();

    const contentCoords = getContentCoordinates({
      rect: this.$content.getBoundingClientRect(),
      targetRect,
      scrollRect:
        getScrollContainer !== null
          ? getScrollContainer().getBoundingClientRect()
          : null,
      align,
      offset: this.props.offset
    });

    let tipCoords = { x: null, y: null, rotate: null };

    if (this.$tip) {
      tipCoords = getTipCoordinates({
        tipRect: this.$tip.getBoundingClientRect(),
        targetRect,
        contentRect: this.$content.getBoundingClientRect(),
        contentCoords,
        align
      });
    }

    return {
      tip: tipCoords,
      content: contentCoords
    };
  };

  // eslint is forcing to put handleReposition before ComponentDidMount
  // eslint-disable-next-line
  handleReposition = throttle(() => {
    if (this.isOpen()) {
      const scrollContainer =
        this.props.getScrollContainer === null
          ? document.documentElement
          : this.props.getScrollContainer();
      if (
        !isInsideBoundaries({
          $container: scrollContainer,
          $element: this.$popover.current,
          align: this.props.align
        })
      ) {
        this.close();
        return;
      }
      this.setPosition();
    }
  }, throttleDelay);

  handleKeyUp = event => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  handleTransitionEnd = event => {
    // NOTE: do this should make more that only focus the content div? should as well
    //       find the first focusable element like button, input, etc?
    //       can focus automatically
    //       should we set focus into the popover content automatically?
    if (this.isOpen() && event.propertyName === "visibility") {
      event.target.focus();
    }
  };

  handleOpen = () => {
    this.open();
  };

  handleClose = () => {
    this.close();
  };

  handleDelayedOpen = () => {
    clearTimeout(this.closeTimer);
    this.openTimer = setTimeout(this.handleOpen, openDelay);
  };

  handleDelayedClose = () => {
    clearTimeout(this.openTimer);
    this.closeTimer = setTimeout(this.handleClose, closeDelay);
  };

  handleClick = () => {
    if (this.isOpen()) this.close();
    else this.open();
  };

  open() {
    this.$trigger = document.activeElement;

    this.setPosition(true);
  }

  close() {
    // NOTE: Even if uncontrolled, the app may want to be notified when closed via the onClose callback
    if (this.props.onClose !== null) this.props.onClose();

    if (this.props.isOpen === null) {
      this.setState({ isOpen: false });

      // NOTE: If we don't prevent the focusing back to the trigger while using focus and mouseover prop
      //       will created a bug looping over opening and closing constantly.
      if (!this.props.isEager && this.$trigger && !isActiveElementPopover()) {
        this.$trigger.focus();
      }
      this.removeListeners();
    }
  }

  refTip = ref => {
    this.$tip = ref;
  };

  refContent = ref => {
    this.$content = ref;
  };

  addListeners() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    window.addEventListener("resize", this.handleReposition, false);
    window.addEventListener("scroll", this.handleReposition, false);
    if (this.props.getScrollContainer !== null) {
      this.props
        .getScrollContainer()
        .addEventListener("scroll", this.handleReposition, false);
    }
    this.$content.addEventListener(
      "transitionend",
      this.handleTransitionEnd,
      false
    );
    this.hasListeners = true;
  }

  removeListeners() {
    window.removeEventListener("resize", this.handleReposition);
    if (this.props.getScrollContainer === null) {
      window.removeEventListener("scroll", this.handleReposition);
    } else {
      this.props
        .getScrollContainer()
        .removeEventListener("scroll", this.handleReposition);
    }
    window.removeEventListener("keyup", this.handleKeyUp);
    this.$content.removeEventListener(
      "transitionend",
      this.handleTransitionEnd
    );
    this.hasListeners = false;
  }

  render() {
    if (this.state.hasError) {
      // NOTE: how we displayed an error on the React tree?
      // we might need a bubbly or something for this?
      // do we throw Error? suggestions?
    }

    // NOTE: please help me review if this will have the wrong
    // effect as you can red in the caveat section of context API
    // https://reactjs.org/docs/context.html#caveats
    const contextValue = {
      content: {
        ...this.state.content,
        maxWidth: this.props.maxWidth, // maybe we should code a minimum maxWidth?
        width: this.state.width
      },
      isDark: this.props.isDark,
      isEager: this.props.isEager,
      isOpen: this.isOpen(),
      onClick: this.handleClick,
      onClose: this.handleClose,
      onDelayedClose: this.handleDelayedClose,
      onDelayedOpen: this.handleDelayedOpen,
      onOpen: this.handleOpen,
      portalElement: this.$portal,
      refContent: this.refContent,
      refTip: this.refTip,
      tip: this.state.tip
    };

    return (
      <PopoverContext.Provider value={contextValue}>
        <PopoverStyled innerRef={this.$popover}>
          {this.props.children}
        </PopoverStyled>
      </PopoverContext.Provider>
    );
  }
}

Popover.displayName = "Popover";

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Card = Card;
Popover.Tip = Tip;
