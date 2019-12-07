/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import ColumnDefinition from "./components/ColumnDefinition";
import ColumnRowIndicator from "./components/ColumnRowIndicator";
import Navigation from "./components/Navigation";
import VirtualizedTable from "./components/VirtualizedTable";
import LoadMoreButton from "./components/LoadMoreButton";
import { extractChildren } from "./helpers";
import { sortDirections, columnTypes } from "./constants";
import { TableProvider } from "./context";

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  height: PropTypes.number,
  width: PropTypes.number,
  rowHeight: PropTypes.number,
  reducers: PropTypes.arrayOf(PropTypes.func),
  isLoading: PropTypes.bool,
  onExpandedRow: PropTypes.func,
  onKeyDownArrow: PropTypes.func,
  onClickCell: PropTypes.func,
};

const defaultProps = {
  data: [],
  height: 600,
  width: 640,
  rowHeight: 32,
  reducers: [],
  isLoading: false,
  onExpandedRow: () => {},
  onKeyDownArrow: () => {},
  onClickCell: () => {},
};

export default function DataTable(props) {
  const dataTableID = React.useRef(`DT${nanoid()}DTCELL`).current;
  const {
    children: childrenProps,
    data,
    height,
    isLoading,
    keygen,
    onKeyDownArrow,
    onClickCell,
    onExpandedRow,
    reducers,
    rowHeight,
    width,
  } = props;

  const {
    "DataTable.ColumnDefinition": ColumnsDefinition,
    "DataTable.Navigation": Navigation,
    "DataTable.LoadMoreButton": LoadMoreButton,
    "DataTable.ColumnRowIndicator": ColumnRowIndicator,
  } = extractChildren(childrenProps, [
    "DataTable.ColumnDefinition",
    "DataTable.Navigation",
    "DataTable.LoadMoreButton",
    "DataTable.ColumnRowIndicator",
  ]);

  let columns = ColumnsDefinition.map(Column => Column.props);

  if (ColumnRowIndicator) {
    const columnRowIndicator = ColumnRowIndicator.type.getCellProps(ColumnRowIndicator.props);
    columns = [columnRowIndicator].concat(columns);
  }

  let navigationReducers = [];
  if (Navigation && Navigation.props) {
    navigationReducers = React.Children.map(Navigation.props.children, child => child.type.reducer).filter(
      chunk => chunk
    );
  }

  return (
    <TableProvider data={data} keygen={keygen} reducers={navigationReducers.concat(reducers)} columns={columns}>
      <div>{isLoading ? "Loading..." : null}</div>
      {Navigation}
      <VirtualizedTable
        dataTableID={dataTableID}
        onExpandedRow={onExpandedRow}
        columns={columns}
        height={height}
        rowHeight={rowHeight}
        width={width}
        LoadMoreButton={LoadMoreButton}
        onKeyDownArrow={onKeyDownArrow}
        onClickCell={onClickCell}
      />
    </TableProvider>
  );
}

DataTable.prpoTypes = propTypes;
DataTable.defaultProps = defaultProps;
DataTable.ColumnDefinition = ColumnDefinition;
DataTable.ColumnRowIndicator = ColumnRowIndicator;
DataTable.SortDirections = { ...sortDirections };
DataTable.Navigation = Navigation;
DataTable.ColumnTypes = columnTypes;
DataTable.LoadMoreButton = LoadMoreButton;
