import React from "react";
import styled, { css } from "styled-components";
import Input from "@paprika/input";
import { Table } from "../../src";
import dataMock from "./mock";

const TextCell = styled.div(() => {
  return css`
    align-items: center;
    border: 1px solid rebeccapurple;
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
  `;
});

const Text = {
  Input({ value, onChange, finish, cancel, isHover, boundingClientRect }) {
    const refInput = React.useRef(null);
    const [inputValue, setInputValue] = React.useState(value);

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        onChange({ nextValue: refInput.current.value, finish, cancel });
      }
    }

    function handleBlur() {
      cancel();
    }

    function handleChange(event) {
      event.stopPropagation();
      setInputValue(event.target.value);
    }

    React.useEffect(() => {
      refInput.current.focus();
    }, []);

    return (
      <Input ref={refInput} onBlur={handleBlur} onKeyDown={handleKeyDown} onChange={handleChange} value={inputValue} />
    );
  },
  Output({ children }) {
    return <TextCell>{children}</TextCell>;
  },
};

export default function() {
  const [data, setData] = React.useState(dataMock);

  return (
    <Table data={data} hasZebraStripes>
      <Table.ColumnDefinition
        header="identifier"
        width="40"
        cell={({ row }) => <Text.Output>{row.id}</Text.Output>}
        getValue={({ row }) => row.id}
        onEditing={Text.Input}
        onChange={({ row, rowIndex, columnIndex, nextData, nextValue, update, finish }) => {
          debugger;
        }}
      />
      <Table.ColumnDefinition header="author" width="180" cell={({ row }) => <Text.Output>{row.author}</Text.Output>} />
      <Table.ColumnDefinition header="title" width="180" cell={({ row }) => <Text.Output>{row.book}</Text.Output>} />
      <Table.ColumnDefinition header="cover" cell={({ row }) => <img height={74} src={row.cover} alt="cover book" />} />
      <Table.ColumnDefinition header="tags" width="340" cell={({ row }) => row.tags.map(tag => <Tag>{tag}</Tag>)} />
      <Table.ColumnDefinition header="description" cell={({ row }) => <TextEllipsis>{row.description}</TextEllipsis>} />
    </Table>
  );
}

const TextEllipsis = styled.div(() => {
  return css`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden; /* number of lines to show */
    text-overflow: ellipsis;
  `;
});

const Tag = styled.span(() => {
  return css`
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #111;
    display: inline-block;
    margin: 2px 2px;
    padding: 2px;
  `;
});
