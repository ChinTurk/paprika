import React from "react";
import PropTypes from "prop-types";
import Popover from "@paprika/popover";
import { ContentInlineStyled } from "./Content.styles";
import { getDOMAttributesForListBoxContainer } from "../../helpers/DOMAttributes";
import handleKeyboardKeys from "../../helpers/handleKeyboardKeys";
import useListBox from "../../useListBox";

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

const handleBlur = (state, dispatch) => () => {
  const { refListBoxContainer } = state;

  if (state.isDisabled) {
    return;
  }

  // requestAnimationFrame give time to process
  // the element that has received the click event
  // via document.activeElement instead of returning
  // the body element automatically
  window.requestAnimationFrame(() => {
    // the trigger should handle the close and open not the onBlur event
    if (state.refTriggerContainer.current && state.refTriggerContainer.current.contains(document.activeElement)) {
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
      }
    }
  });
};

export default function Content(props) {
  const [state, dispatch] = useListBox();
  const { refListBoxContainer } = state;

  if (state.isInline) {
    return (
      <ContentInlineStyled
        {...getDOMAttributesForListBoxContainer()}
        onKeyDown={handleKeyboardKeys(state, dispatch)}
        ref={refListBoxContainer}
      >
        {props.children}
      </ContentInlineStyled>
    );
  }

  return (
    <Popover.Content
      onBlur={handleBlur(state, dispatch)}
      ref={refListBoxContainer}
      {...getDOMAttributesForListBoxContainer()}
      onKeyDown={handleKeyboardKeys(state, dispatch)}
    >
      {props.children}
    </Popover.Content>
  );
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;
