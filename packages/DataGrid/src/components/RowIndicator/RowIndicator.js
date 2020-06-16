import React from "react";
import PropTypes from "prop-types";
import * as sc from "./RowIndicator.styles";

const propTypes = {
  hasNumber: PropTypes.bool,
  isActiveCell: PropTypes.bool,
  isActiveRow: PropTypes.bool,
  onCheck: PropTypes.func,
  row: PropTypes.shape({}),
  rowIndex: PropTypes.number,
  isChecked: PropTypes.bool,
};

const defaultProps = {
  hasNumber: false,
  isActiveCell: false,
  isActiveRow: false,
  row: null,
  rowIndex: null,
  onCheck: () => {},
  isChecked: false,
};

function RowIndicator(props) {
  const { rowIndex, isChecked, onCheck, isActiveCell, isActiveRow, hasNumber } = props;

  function handleCheck() {
    onCheck({ rowIndex });
  }

  const indicator = hasNumber ? (
    <sc.RowIndexText hasFourDigitsOrMore={rowIndex > 999}>{rowIndex}</sc.RowIndexText>
  ) : null;

  return (
    <sc.RowContainer>
      {hasNumber && (isActiveCell || isActiveRow) ? (
        indicator
      ) : (
        <sc.Checkbox>
          <input type="checkbox" checked={isChecked} onKeyDown={handleCheck} />
        </sc.Checkbox>
      )}
    </sc.RowContainer>
  );
}

function areEqual(prev, next) {
  if (prev.isChecked !== next.isChecked) {
    return false;
  }

  return true;
}

export default React.memo(RowIndicator, areEqual);

RowIndicator.propTypes = propTypes;
RowIndicator.defaultProps = defaultProps;
