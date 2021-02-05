import React from "react";
import PropTypes from "prop-types";
import Input from "@paprika/input";
import * as sc from "./Text.styles";

const propTypes = {
  value: PropTypes.string.isRequired,
  columnWidth: PropTypes.number,
  status: PropTypes.string.isRequired,
  statusTypes: PropTypes.shape({}),
};

const defaultProps = {
  columnWidth: null,
  statusTypes: {},
};

export default function Text(props) {
  const { value: valueProps, columnWidth, status, statusTypes: on } = props;
  const [value, setValue] = React.useState(valueProps);
  const refInput = React.useRef(null);

  function handleChange(event) {
    setValue(event.target.value);
  }

  React.useEffect(() => {
    if (status === on.EDITING) {
      refInput.current.focus();
    }
  }, [status, on]);

  if (status === on.EDITING) {
    return <Input ref={refInput} onChange={handleChange} value={value} />;
  }

  return (
    <sc.Text maxColumnWidth={columnWidth}>
      <sc.Ellipsis>{value}</sc.Ellipsis>
    </sc.Text>
  );
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;
