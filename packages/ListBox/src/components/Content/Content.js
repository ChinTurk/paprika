import React from "react";
import PropTypes from "prop-types";
import Popover from "@paprika/popover";
import { getDOMAttributesForListBoxContainer } from "../../helpers/DOMAttributes";
import { handleKeyUpKeyboardKeys, handleKeyDownKeyboardKeys } from "../../helpers/handleKeyboardKeys";
import useListBox from "../../useListBox";
import { OnChangeContext } from "../../store/OnChangeProvider";
import { PropsContext } from "../../store/PropsProvider";
import * as sc from "./Content.styles";

const handleBlur = (state, dispatch, onCancelFooter) => () => {
  const { refListBoxContainer } = state;

  // requestAnimationFrame give time to process
  // the element that has received the click event
  // via document.activeElement instead of returning
  // the body element automatically
  window.requestAnimationFrame(() => {
    if (state.refTriggerContainer.current && state.refTriggerContainer.current.contains(document.activeElement)) {
      // close the popover if the target is the trigger, this make easier to handle tab events
      dispatch({ type: useListBox.types.closePopover });
      return;
    }

    if (
      refListBoxContainer &&
      refListBoxContainer.current &&
      !refListBoxContainer.current.contains(document.activeElement)
    ) {
      dispatch({ type: useListBox.types.closePopover });

      if (state.hasFooter) {
        dispatch({ type: useListBox.types.cancel });
        if (onCancelFooter) onCancelFooter();
      }
    }
  });
};

const handleContentFocusChange = (hasFocus, dispatch) =>
  dispatch({ type: useListBox.types.setListBoxHasFocus, payload: { hasFocus } });

export default function Content(props) {
  const { children, hasOptions } = props;
  const onChangeContext = React.useContext(OnChangeContext);
  const [state, dispatch] = useListBox();
  const { refListBoxContainer } = state;
  const providedProps = React.useContext(PropsContext);
  const { isDisabled, isInline } = providedProps;

  if (isInline) {
    return (
      <sc.Content
        {...getDOMAttributesForListBoxContainer({ isInline: true })}
        onFocus={() => {
          if (!isDisabled) handleContentFocusChange(true, dispatch);
        }}
        onBlur={() => {
          if (!isDisabled) handleContentFocusChange(false, dispatch);
        }}
        onKeyDown={handleKeyDownKeyboardKeys({ providedProps, state, dispatch, onChangeContext })}
        onKeyUp={handleKeyUpKeyboardKeys({ providedProps, state, dispatch, onChangeContext })}
        ref={refListBoxContainer}
        data-pka-anchor="list-box-content-inline"
        hasOptions={hasOptions}
      >
        {children}
      </sc.Content>
    );
  }

  return (
    <Popover.Content
      {...getDOMAttributesForListBoxContainer()}
      onBlur={handleBlur(state, dispatch, props.onCancelFooter)}
      ref={refListBoxContainer}
      onKeyDown={handleKeyDownKeyboardKeys({ providedProps, state, dispatch, onChangeContext })}
      onKeyUp={handleKeyUpKeyboardKeys({ providedProps, state, dispatch, onChangeContext })}
    >
      {props.children}
    </Popover.Content>
  );
}

Content.propTypes = {
  /** Body content of the content. */
  children: PropTypes.node.isRequired,
  onCancelFooter: PropTypes.func,
  hasOptions: PropTypes.bool.isRequired,
};

Content.defaultProps = {
  onCancelFooter: null,
};
