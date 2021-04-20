import React from "react";
import PropTypes from "prop-types";
import Popover from "@paprika/popover";
import Spinner from "@paprika/spinner";
import ExclamationCircle from "@paprika/icon/lib/ExclamationCircle";
import Check from "@paprika/icon/lib/Check";
import extractChildren from "@paprika/helpers/lib/extractChildren";
import * as sc from "./Editor.styles";
import { status as statusTypes } from "../types";

const Tooltip = ({ Icon = null, message = "" }) => {
  return (
    <Popover isEager isDark>
      <Popover.Trigger>
        {(handler, a11yAttributes) => {
          return Icon ? (
            <Icon
              onMouseOver={handler}
              onMouseOut={handler}
              onFocus={handler}
              onBlur={handler}
              tabIndex={0}
              aria-label="info"
              role="img"
              {...a11yAttributes}
            />
          ) : null;
        }}
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Card>{message}</Popover.Card>
      </Popover.Content>
      <Popover.Tip />
    </Popover>
  );
};

const Editor = React.forwardRef((props, ref) => {
  const { isEditing, onClick, status } = props;
  const { "Editor.Value": editorValue, "Editor.Edit": edit } = extractChildren(props.children, [
    "Editor.Value",
    "Editor.Edit",
  ]);

  function handleClick(event) {
    onClick(event);
  }

  return isEditing ? (
    edit.props.children
  ) : (
    <sc.Value status={status} data-pka-anchor="inline-editing.raw-button" ref={ref} onClick={handleClick}>
      {editorValue.props.children}

      {status === statusTypes.LOADING ? <Spinner size={Spinner.types.size.SMALL} /> : null}
      {status === statusTypes.SUCCEED ? (
        <sc.Success>
          <Check />
        </sc.Success>
      ) : null}
      {status === statusTypes.ERROR ? (
        <sc.Error>
          <Tooltip Icon={ExclamationCircle} message="theres has been an error" />
        </sc.Error>
      ) : null}
    </sc.Value>
  );
});

Editor.Value = () => {
  return <></>;
};
Editor.Value.displayName = "Editor.Value";

Editor.Edit = () => {
  return <></>;
};

Editor.Edit.displayName = "Editor.Edit";
Editor.types = { status: statusTypes };

const propTypes = {
  status: PropTypes.oneOf([
    Editor.types.status.ERROR,
    Editor.types.status.IDLE,
    Editor.types.status.LOADING,
    Editor.types.status.SUCCESS,
  ]),
  children: PropTypes.node.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => {},
  status: Editor.types.status.IDLE,
};

Editor.propTypes = propTypes;
Editor.defaultProps = defaultProps;

export default Editor;
