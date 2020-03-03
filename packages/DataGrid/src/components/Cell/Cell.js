import React from "react";
import PropTypes from "prop-types";
import * as sc from "../../DataGrid.styles";

const propTypes = {
  a11yText: PropTypes.string.isRequired,
  column: PropTypes.shape({ cellProps: PropTypes.func, cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func]) })
    .isRequired,
  columnIndex: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  gridId: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
};

const Cell = React.forwardRef((props, ref) => {
  const { style, gridId, columnIndex, rowIndex, column, data, a11yText } = props;
  const [isActiveCell, setIsActiveCell] = React.useState(false);
  const [isActiveRow, setIsRowActive] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    setIsActiveCell: isActive => {
      setIsActiveCell(isActive);
    },
    highlightRow: _rowIndex => {
      setIsRowActive(() => {
        return Number.parseInt(_rowIndex, 10) === rowIndex;
      });
    },
    deemphasizeRow: _rowIndex => {
      setIsRowActive(() => {
        return !Number.parseInt(_rowIndex, 10) === rowIndex;
      });
    },
    getIndexes: () => {
      return { rowIndex, columnIndex };
    },
  }));

  const options = {
    row: data[rowIndex],
    rowIndex,
    columnIndex,
    isActiveCell,
    isActiveRow,
    attrs: {
      "data-row-index": rowIndex,
      "data-column-index": columnIndex,
    },
  };

  const cellProps = typeof column.cellProps === "function" ? column.cellProps(options) : {};

  return (
    <sc.Cell ref={ref} tabIndex={-1} style={style} data-cell={`${gridId}.${columnIndex}.${rowIndex}`}>
      <sc.GridCell role="gridcell">{a11yText}</sc.GridCell>
      <sc.InnerCell hasActiveRowShadow={isActiveRow} {...cellProps} aria-hidden="true" {...options.attrs}>
        {typeof column.cell === "function" ? column.cell(options) : data[rowIndex][column.cell]}
      </sc.InnerCell>
    </sc.Cell>
  );
});

Cell.propTypes = propTypes;

export default Cell;