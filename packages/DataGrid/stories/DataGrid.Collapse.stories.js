import React from "react";
import { storiesOf } from "@storybook/react";
import * as Sbook from "storybook/assets/styles/common.styles";
import ArrowRight from "wasabicons/lib/ArrowRight";
import ArrowDown from "wasabicons/lib/ArrowDown";
import MissionControl from "wasabicons/lib/MissionControl";
import initialData from "./helpers/data.collapse";
import DataGrid from "../src";

import SignOffStatus from "./SignOffStatus";

const Arrow = React.memo(({ hasRows, isExpand }) => {
  if (!hasRows) return null;

  if (hasRows && !isExpand) {
    return <ArrowRight style={{ marginRight: "8px", marginTop: "2px" }} />;
  }

  return <ArrowDown style={{ marginRight: "8px", marginTop: "2px" }} />;
});

const insert = (arr, index, newItems) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];

const remove = ({ data, start, end }) => [...data.slice(0, start), ...data.slice(end + 1, data.length)];

function getNumberOfRowsToRemove({ expandedRows, rowIndex, data }) {
  const visitedRoots = [];
  function add({ row }) {
    return row.rows
      .map(r => {
        if ("rows" in r && r.rows.length && expandedRows.includes(r.id)) {
          visitedRoots.push(r.id);
          return add({ row: r });
        }
        return r.id;
      })
      .flat();
  }

  if ("rows" in data[rowIndex] && data[rowIndex].rows.length && expandedRows.includes(data[rowIndex].id)) {
    const openNodes = add({ row: data[rowIndex] });
    return { end: openNodes.length + visitedRoots.length, visitedRoots };
  }

  return { end: 0, visitedRoots };
}

export function App() {
  const [data, setData] = React.useState(initialData);
  const [expandedRows, setExpanedRows] = React.useState([]);
  const refDataGrid = React.useRef(null);

  const toggleExpand = ({ row, rowIndex }) => {
    if (expandedRows.includes(row.id)) {
      const { end, visitedRoots } = getNumberOfRowsToRemove({ expandedRows, data, rowIndex });
      setData(data => {
        return remove({ data, start: rowIndex + 1, end: rowIndex + end });
      });

      visitedRoots.push(row.id);
      setExpanedRows(expandedRows => expandedRows.filter(r => !visitedRoots.includes(r)));
      return;
    }

    setData(data => {
      if (row.rows && row.rows.length) {
        return insert(data, rowIndex + 1, row.rows);
      }
      return data;
    });
    if (row.id) {
      setExpanedRows(expandedRows => [...new Set([...expandedRows, row.id])]);
    }
  };

  React.useEffect(() => {
    console.log(expandedRows);
  }, [expandedRows]);

  const leftCellStyle = React.useCallback(indent => {
    return { style: { display: "flex", alignItems: "center", textIndent: `${indent * 24}px` } };
  }, []);

  const cellStyle = React.useCallback(() => {
    return { style: { display: "flex", justifyContent: "center", alignItems: "center" } };
  }, []);

  const headerStyle = React.useCallback(() => {
    return { style: { display: "flex", justifyContent: "center", alignItems: "center", height: "32px" } };
  }, []);

  const cellA11yText = React.useCallback(key => {
    return ({ row }) => {
      if (row[key][0] === row[key][1]) {
        return `All tasks has been checked`;
      }
      if (row[key][0] === 0) {
        return `idle: ${row[key][0]} of ${row[key][1]} tasks`;
      }

      return `in progres: ${row[key][0]} of ${row[key][1]} tasks`;
    };
  }, []);

  return (
    <Sbook.Story>
      <DataGrid
        ref={refDataGrid}
        data={data}
        keygen="id"
        height={576}
        onPressEnter={toggleExpand}
        hasFooter={false}
        rowHeight={48}
      >
        <DataGrid.ColumnDefinition
          width={365}
          header="Objective"
          headerProps={headerStyle}
          cell={({ row }) => {
            return (
              <span>
                <Arrow hasRows={"rows" in row && row.rows.length} isExpand={expandedRows.includes(row.id)} />
                {row.link ? (
                  <React.Fragment>
                    <MissionControl style={{ position: "absolute", left: "8px" }} />
                    <a href={row.link}>{row.objective}</a>
                  </React.Fragment>
                ) : (
                  row.objective
                )}
              </span>
            );
          }}
          cellA11yText={({ row }) => row.objective}
          cellProps={({ row }) => leftCellStyle(row.indent)}
          onClick={toggleExpand}
        />
        <DataGrid.ColumnDefinition
          width={156}
          header="Preparer review"
          headerProps={headerStyle}
          cellA11yText={cellA11yText("preparer")}
          cell={({ row }) => {
            return <SignOffStatus numberOfSignOffs={row.preparer[0]} maxSignedOffs={row.preparer[1]} />;
          }}
          cellProps={cellStyle}
        />
        <DataGrid.ColumnDefinition
          width={156}
          header="Detail review"
          headerProps={headerStyle}
          cellA11yText={cellA11yText("detail")}
          cell={({ row }) => <SignOffStatus numberOfSignOffs={row.detail[0]} maxSignedOffs={row.detail[1]} />}
          cellProps={cellStyle}
        />
        <DataGrid.ColumnDefinition
          width={156}
          header="General review"
          headerProps={headerStyle}
          cellA11yText={cellA11yText("general")}
          cell={({ row }) => <SignOffStatus numberOfSignOffs={row.general[0]} maxSignedOffs={row.general[1]} />}
          cellProps={cellStyle}
        />
      </DataGrid>
    </Sbook.Story>
  );
}

storiesOf("DataGrid / Lazy", module).add("Collapse", () => <App />);
