import React from "react";
import PropTypes from "prop-types";
import { VariableSizeGrid as Grid } from "react-window";
import debounce from "lodash.debounce";
import handleArrowKeys, { arrowKeys } from "../../helpers/handleArrowKeys";
import "@paprika/helpers/lib/dom/elementScrollToPolyfill";
// import CheckBox from "../CheckBox";
import Cell from "../Cell";
import Options from "../Options";
import { CellHeader } from "../Cell/Cell.styles";
import * as styled from "./VirtualizedTable.styles";
import { useDataTableState } from "../../context";

const propTypes = {
  dataTableID: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  // LoadMoreButton: PropTypes.node,
  onClickCell: PropTypes.func,
  // onExpandedRow: PropTypes.func,
  onKeyDownArrow: PropTypes.func,
  rowHeight: PropTypes.number.isRequired,
  width: PropTypes.number,
};

const defaultProps = {
  // LoadMoreButton: null,
  onClickCell: () => {},
  onKeyDownArrow: () => {},
  // onExpandedRow: () => {},
  width: 640,
};

function getColumnByCellIndex({ columnIndex, columnsOrder, columns }) {
  const columnKey = columnsOrder[columnIndex];
  const column = columns[columnKey];
  return column;
}

function getVisibleColumns(columns) {
  const visibleColumns = Object.keys(columns).filter(key => {
    return !columns[key].isHidden;
  });

  return visibleColumns;
}

export default function VirtualizedTable(props) {
  const {
    height,
    rowHeight,
    width,
    /* onExpandedRow, */
    onKeyDownArrow,
    onClickCell,
    /* LoadMoreButton, */
    dataTableID,
  } = props;

  const [activeCell, setActiveCell] = React.useState({ index: null });
  const refData = React.useRef(null);
  const refGrid = React.useRef(null);
  const { data, sortedOrder, keygen, rowHeight: stateRowHeigth, columns, columnsOrder } = useDataTableState();
  refData.current = data;

  const delayedKeyDown = React.useRef(debounce((...args) => handleArrowKeys(...args), 15)).current;

  // this will inject 20 rows below the visible table to helps with the navigation and scrolling flickering

  const dataForRendering = sortedOrder
    ? sortedOrder.map(keygenValue => data.find(item => item[keygen] === keygenValue))
    : data;

  const rowHeightValue = (stateRowHeigth && stateRowHeigth.value) || rowHeight;
  const visibleColumns = getVisibleColumns(columns);

  function handleKeyDown(event) {
    if (arrowKeys.includes(event.key)) {
      event.preventDefault();
      event.persist();
      delayedKeyDown({
        activeCell,
        columnsLength: visibleColumns.length,
        dataTableID,
        event,
        onKeyDownArrow,
        refData,
        rowHeight: rowHeightValue,
        setActiveCell,
      });
    }
  }

  // const handleRowExpand = row => () => {
  //   onExpandedRow(row);
  // };

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/no-noninteractive-tabindex  */

  const totalRows = dataForRendering.length + 1;

  const visibleColumnsInCorrectOrder = React.useMemo(() => {
    return columnsOrder.reduce((accumulator, item) => {
      return visibleColumns.includes(item) ? [...accumulator, item] : accumulator;
    }, []);
  }, [columnsOrder, visibleColumns]);

  return (
    <div style={{ width: `${width}px` }} onKeyDown={handleKeyDown} tabIndex="0">
      <Grid
        columnCount={visibleColumns.length}
        columnWidth={columnIndex => {
          const { width } = getColumnByCellIndex({ columnIndex, columnsOrder, columns });
          return Number.parseInt(width, 10) || 160;
        }}
        height={height}
        rowCount={totalRows}
        rowHeight={() => rowHeightValue}
        width={width}
        className="virtualize-rows-root"
        overscanRowCount={20}
        ref={refGrid}
      >
        {propsReactWindow => {
          const { columnIndex, rowIndex, style } = propsReactWindow;
          const column = columns[visibleColumnsInCorrectOrder[columnIndex]];
          const { id, cell, header, hideGreyBorder = false } = column;
          const index = `${dataTableID}${rowIndex}_${columnIndex}`;

          if (rowIndex === 0) {
            return (
              <CellHeader key={`cell_${index}`} style={style}>
                {typeof header === "function" ? header(column) : header}
                <Options columnId={id} />
              </CellHeader>
            );
          }

          // dataForRendering[rowIndex - 1] we need to remove 1 because we added the header
          return (
            <Cell
              key={`cell_${index}`}
              cellIndex={index}
              activeCellIndex={activeCell.index}
              setActiveCell={setActiveCell}
              onClickCell={onClickCell}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              style={style}
              refData={refData}
              data-pka-cell-index={`${rowIndex - 1}_${columnIndex}`}
              hideGreyBorder={hideGreyBorder}
            >
              <styled.InnerCell>
                {typeof cell === "function"
                  ? cell(dataForRendering[rowIndex - 1], rowIndex)
                  : dataForRendering[rowIndex - 1][cell]}
              </styled.InnerCell>
            </Cell>
          );
        }}
      </Grid>
    </div>
  );
}
/* eslint-enable react/no-array-index-key */

VirtualizedTable.propTypes = propTypes;
VirtualizedTable.defaultProps = defaultProps;
