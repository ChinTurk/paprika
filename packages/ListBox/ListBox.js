import React from "react";
import PropTypes from "prop-types";
import Box from "./components/Box";
import Content from "./components/Content";
import Filter from "./components/Filter";
import List from "./components/List";
import NoResults from "./components/NoResults";
import Options from "./components/Options";
import Popover from "./components/Popover";
import Trigger from "./components/Trigger";
import useListBox from "./useListBox";
import handleImperative from "./imperative";
import * as effects from "./effects";

export const propTypes = {
  //works with isInline, isDisabled, hasSelectedOptions, going to be a clear button taht you cannot click

  /** Child of type <ListBox.Option /> */
  children: PropTypes.node,

  /** Turn on the input filter for the options */
  hasFilter: PropTypes.bool,

  /** To set whether or not to render clear button at the right side of the Trigger */
  hasClearButton: PropTypes.bool,

  /** Indicate the height for the options container */
  height: PropTypes.number,

  /** [Advance] instead of marking the option as checked/unchecked, the option will toggle between visible and hidden */
  hideOptionOnSelected: PropTypes.bool,

  /** Disable the entire ListBox */
  isDisabled: PropTypes.bool,

  /** Let the user to select multiple options at same time */
  isMulti: PropTypes.bool,

  /** This options will display the listbox without the Popover */
  isInline: PropTypes.bool,

  /** When true the ListBox will try to focus to the options container as soon as the
  Popover is open */
  isPopoverEager: PropTypes.bool,

  /** Indicates if the Popover is visible */
  isPopoverOpen: PropTypes.bool,

  /** Message to be displayed once the filtering process doesn't find a match */
  hasNotResultsMessage: PropTypes.node,

  /** Callback returning the current selected index on the ListBox and more arguments */
  onChange: PropTypes.func,

  /** Callback ocurring after the user clicks the [x] clear button in the Trigger area */
  onClickClear: PropTypes.func,

  /** Callback announcing which option has been marked as selected */
  onSelected: PropTypes.func,

  /** Callback announcing which option has been marked as deselected */
  onDeselected: PropTypes.func,

  /** Callback happening once the Popover has close */
  onClose: PropTypes.func,

  /** Default label to display when no option is selected */
  placeholder: PropTypes.string,

  /** [Advance] Override the 'scroll' target element for popover default is document.body  */
  // Test on cypress
  getScrollContainer: PropTypes.func,

  /** [Advance] When composing the component will prevent to close the ListBox when
      the user interact with the Trigger container */
  // Test on cypress
  preventOnBlurForTriggerListBox: PropTypes.bool,

  /** [Advance] Allows to take over the render method for the label inside of the Trigger Component */
  renderTrigger: PropTypes.func,

  /** [Advance] Allows to take over the render method for the Checker.
      When `isMulti` prop is active, the default type of checker is a checkbox, in case you don't
      want to render a checkbox you can return null ex. renderCheckbox={() =>  null} */
  renderCheckbox: PropTypes.func,

  /** Overrides the filter function and delegates the responsibility to the developer */
  // will take over the original func that does filter, allows to do custom filter.
  //return all the indexes that re male or females. hard code male - spiderman, females - wonder woman
  filter: PropTypes.func,

  /** z-index for the popover */
  zIndex: PropTypes.number,
};

export const defaultProps = {
  children: null,
  filter: null,
  getScrollContainer: null,
  hasClearButton: false,
  hasFilter: false,
  hasNotResultsMessage: "Your search did not match any options.",
  height: 200,
  hideOptionOnSelected: false,
  isDisabled: false,
  isInline: false,
  isMulti: false,
  isPopoverEager: true,
  isPopoverOpen: null,
  onChange: () => {},
  onClickClear: null,
  onClose: () => {},
  onDeselected: () => {},
  onSelected: () => {},
  placeholder: "Select one of the options",
  preventOnBlurForTriggerListBox: false,
  renderCheckbox: undefined,
  renderTrigger: null,
  zIndex: 1,
};

export function ListBox(props) {
  const [state, dispatch] = useListBox();
  const { children, hasNotResultsMessage, height, onClickClear, placeholder, renderTrigger } = props;
  const [footer, setFooter] = React.useState(null);

  const handleFooterFound = footer => {
    if (!state.hasFooter) {
      dispatch({
        type: useListBox.types.setHasFooter,
        payload: true,
      });
    }

    setFooter(footer);
  };

  return (
    <React.Fragment>
      <Trigger
        data-qa-anchor="listbox-trigger"
        onClickClear={onClickClear}
        renderTrigger={renderTrigger}
        placeholder={placeholder}
      />
      <Content>
        <Box>
          <Filter filter={props.filter} />
          <List height={height}>
            <Options onFooterFound={handleFooterFound}>{children}</Options>
          </List>
          <NoResults label={hasNotResultsMessage} />
          {<div ref={state.refFooterContainer}>{footer}</div> || null}
        </Box>
      </Content>
    </React.Fragment>
  );
}

ListBox.propTypes = {
  ...propTypes,
  children: PropTypes.node.isRequired,
  filter: PropTypes.func,
  hasNotResultsMessage: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  onClickClear: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  renderTrigger: PropTypes.func,
};

ListBox.defaultProps = {
  filter: null,
  onClickClear: null,
  renderTrigger: null,
};

const ListBoxContainer = React.forwardRef((props, ref) => {
  const [state, dispatch] = useListBox();
  // IMPERATIVE API
  const imperativeHandle = handleImperative(state, dispatch);
  React.useImperativeHandle(ref, imperativeHandle);

  // EFFECTS
  const handleEffectHeightChange = effects.handleEffectHeightChange(props, state, dispatch);
  const handleEffectIsDisabledChange = effects.handleEffectIsDisabledChange(props, dispatch);
  const handleEffectIsPopOverOpen = effects.handleEffectIsPopOverOpen(state, dispatch);
  const handleEffectListBoxScrolled = effects.handleEffectListBoxScrolled(state);
  const handleEffectListBoxWidth = effects.handleEffectListBoxWidth(state, dispatch);
  const handleEffectChildren = effects.handleEffectChildren(props, state, dispatch);

  React.useEffect(handleEffectHeightChange, [props.height]);
  React.useEffect(handleEffectIsDisabledChange, [props.isDisabled]);
  React.useLayoutEffect(handleEffectIsPopOverOpen, [state.isPopoverOpen]);
  React.useEffect(handleEffectListBoxWidth, [state.refTriggerContainer.current]);
  React.useLayoutEffect(handleEffectListBoxScrolled, [state.activeOption]);
  React.useLayoutEffect(handleEffectChildren, [props.children]);

  const {
    children,
    filter,
    hasFilter,
    hasNotResultsMessage,
    height,
    isInline,
    isMulti,
    isPopoverEager,
    isPopoverOpen,
    onChange,
    onClickClear,
    onDeselected,
    onSelected,
    placeholder,
    renderCheckbox,
    renderTrigger,
    ...moreProps
  } = props;

  const ListBoxProps = {
    children,
    filter,
    hasNotResultsMessage,
    height,
    onClickClear,
    onDeselected,
    onSelected,
    placeholder,
    renderTrigger,
  };

  if (isInline) {
    return <ListBox {...ListBoxProps}>{children}</ListBox>;
  }

  return (
    <Popover {...moreProps} isEager={isPopoverEager}>
      <ListBox {...ListBoxProps}>{children}</ListBox>
    </Popover>
  );
});

ListBoxContainer.propTypes = propTypes;
ListBoxContainer.defaultProps = defaultProps;

export default ListBoxContainer;
