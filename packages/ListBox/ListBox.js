import React from "react";
import PropTypes from "prop-types";
import Content from "./components/Content";
import Filter from "./components/Filter";
import NoResults from "./components/NoResults";
import Options from "./components/Options";
import Popover from "./components/Popover";
import Trigger from "./components/Trigger";
import Box from "./components/Box";
import List from "./components/List";
import useStore from "./store/useStore";
import handleImperative from "./imperative";
import * as effects from "./effects";

export const propTypes = {
  /** Child of type <ListBox.Option /> */
  children: PropTypes.node.isRequired,

  /** Turn on the input filter for the options */
  hasFilter: PropTypes.bool,

  /** Indicate which is the height for the options container */
  height: PropTypes.number,

  /** Disable the entire ListBox */
  isDisabled: PropTypes.bool,

  /** Let the user to select multiple options at same time */
  isMulti: PropTypes.bool,

  /** This options will display the listbox without the Popover */
  isInlineDisplay: PropTypes.bool,

  /** When true the ListBox will try to focus to the options container asap the
  popover is open */
  isPopoverEager: PropTypes.bool,

  /** Indicates if the popover displaying the options is visible */
  isPopoverOpen: PropTypes.bool,

  /** Message to display when the filter don't find a match */
  hasNotResultsMessage: PropTypes.node,

  /** Callback returning the current selected index on the ListBox */
  onChange: PropTypes.func,

  /** Defaults label to display when the ListBox has not option selected */
  placeholder: PropTypes.string,

  /** [Advance] Override the 'scroll' handler event for popover  */
  getScrollContainer: PropTypes.func,

  /** [Advance] When composing the component will prevent to close the ListBox when
      the user interact with the Trigger container */
  preventOnBlurOnTrigger: PropTypes.bool,

  /** [Advance] Allows to take over the render method for the label inside of the Trigger Component */
  renderLabel: PropTypes.func,

  /** [Advance] Allows to take over the render method for the Checker.
      When `isMulti` prop is active, the default type of checker is a checkbox, in case you don't
      want to render a checkbox you can return null ex. renderChecker={() =>  null} */
  renderChecker: PropTypes.func,

  /** z-index for the popover */
  zIndex: PropTypes.number,
};

export const defaultProps = {
  hasNotResultsMessage: "Your filter did not return any option",
  getScrollContainer: null,
  hasFilter: false,
  height: 200,
  isDisabled: false,
  isMulti: false,
  isPopoverEager: true,
  isPopoverOpen: false,
  onChange: () => {},
  placeholder: "select one of the options",
  preventOnBlurOnTrigger: false,
  renderLabel: null,
  renderChecker: undefined,
  zIndex: 1,
  isInlineDisplay: false,
};

export function ListBoxStructure(props) {
  const {
    renderLabel,
    placeholder,
    height,
    hasNotResultsMessage,
    footer, // eslint-disable-line
  } = props;

  return (
    <React.Fragment>
      <Trigger renderLabel={renderLabel} placeholder={placeholder} />
      <Content>
        <Box>
          <Filter />
          <List height={height}>
            <Options />
          </List>
          {footer}
          <NoResults label={hasNotResultsMessage} />
        </Box>
      </Content>
    </React.Fragment>
  );
}

ListBoxStructure.propTypes = {
  hasNotResultsMessage: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  renderLabel: PropTypes.func,
};

ListBoxStructure.defaultProps = {
  renderLabel: null,
};

const ListBox = React.forwardRef((props, ref) => {
  const [state, dispatch] = useStore();

  // IMPERATIVE API
  React.useImperativeHandle(ref, handleImperative(state, dispatch));

  // EFFECTS
  React.useEffect(effects.handleEffectChildrenChange(dispatch, props.isMulti, props.children), [props.children]);
  React.useEffect(effects.handleEffectHeightChange(props, dispatch), [props.height]);
  React.useEffect(effects.handleEffectIsDisabledChange(dispatch), [props.isDisabled]);
  React.useEffect(effects.handleEffectIsPopOverOpen(state, dispatch), [state.isPopoverOpen]);
  React.useEffect(effects.handleEffectListBoxWidth(state, dispatch), [state.refTriggerContainer.current]);
  React.useLayoutEffect(effects.handleEffectListBoxScrolled(state), [state.activeOption]);

  const {
    children,
    hasFilter,
    height,
    isMulti,
    isPopoverEager,
    isPopoverOpen,
    hasNotResultsMessage,
    onChange,
    placeholder,
    renderLabel,
    renderChecker,
    isInlineDisplay,
    ...moreProps
  } = props;

  const ListBoxStructureProps = {
    children,
    hasNotResultsMessage,
    height,
    placeholder,
    renderLabel,
  };

  if (isInlineDisplay) {
    return <ListBoxStructure {...ListBoxStructureProps} footer={state.footer} />;
  }

  return (
    <Popover {...moreProps} isEager={isPopoverEager}>
      <ListBoxStructure {...ListBoxStructureProps} footer={state.footer} />
    </Popover>
  );
});

export default ListBox;

ListBox.propTypes = propTypes;
ListBox.defaultProps = defaultProps;
