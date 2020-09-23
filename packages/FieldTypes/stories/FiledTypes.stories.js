import React from "react";
import Table from "@paprika/table";
import DataGrid from "@paprika/data-grid";
import L10n from "@paprika/l10n";

import { getStoryName } from "storybook/storyTree";
import FieldTypes from "../src";

export default {
  title: getStoryName("FieldTypes"),
};

const data = [
  { name: "Abbeline Doe", income: 153234.87, taxes: 32300.34 },
  { name: "Alivia Smith", income: 85720.92, taxes: 17300.43 },
  { name: "Aniya Johanson", income: 45328.54, taxes: 14302.23 },
];

export const Numeric = () => {
  return (
    <div style={{ padding: "32px" }}>
      <h2>Table</h2>
      <h3>US locale</h3>
      <Table data={data}>
        <Table.ColumnDefinition header="Project" cell="name" />
        <Table.ColumnDefinition header="Income" cell={({ row }) => <FieldTypes.Numeric cell={row.income} />} />
        <Table.ColumnDefinition header="Taxes" cell={({ row }) => <FieldTypes.Numeric cell={row.taxes} />} />
        <Table.ColumnDefinition
          header="Revenue"
          cell={({ row }) => <FieldTypes.Numeric cell={Number(row.income - row.taxes)} />}
        />
      </Table>
      <h2>DataGrid</h2>
      <L10n locale="fr">
        <h3>French locale</h3>
        <DataGrid data={data}>
          <DataGrid.ColumnDefinition header="Project" cell="name" />
          <DataGrid.ColumnDefinition header="Income" cell={({ row }) => <FieldTypes.Numeric cell={row.income} />} />
          <DataGrid.ColumnDefinition header="Taxes" cell={({ row }) => <FieldTypes.Numeric cell={row.taxes} />} />
          <DataGrid.ColumnDefinition
            header="Revenue"
            cell={({ row }) => <FieldTypes.Numeric cell={Number(row.income - row.taxes)} />}
          />
        </DataGrid>
      </L10n>
      <L10n locale="de">
        <h3>German locale</h3>
        <DataGrid data={data}>
          <DataGrid.ColumnDefinition header="Project" cell="name" />
          <DataGrid.ColumnDefinition header="Income" cell={({ row }) => <FieldTypes.Numeric cell={row.income} />} />
          <DataGrid.ColumnDefinition header="Taxes" cell={({ row }) => <FieldTypes.Numeric cell={row.taxes} />} />
          <DataGrid.ColumnDefinition
            header="Revenue"
            cell={({ row }) => (
              <>
                <FieldTypes.Numeric cell={Number(row.income - row.taxes)} />
              </>
            )}
          />
        </DataGrid>
      </L10n>
    </div>
  );
};

export const Currency = () => {
  return (
    <div style={{ padding: "32px" }}>
      <h2>Table</h2>
      <h3>US locale</h3>
      <Table data={data}>
        <Table.ColumnDefinition header="Project" cell="name" />
        <Table.ColumnDefinition
          header="Income"
          cell={({ row }) => <FieldTypes.Numeric currency="USD" cell={row.income} />}
        />
        <Table.ColumnDefinition
          header="Taxes"
          cell={({ row }) => <FieldTypes.Numeric currency="USD" cell={row.taxes} />}
        />
        <Table.ColumnDefinition
          header="Revenue"
          cell={({ row }) => <FieldTypes.Numeric currency="USD" cell={Number(row.income - row.taxes)} />}
        />
      </Table>
      <h2>DataGrid</h2>
      <L10n locale="ja">
        <h3>Japanese locale</h3>
        <DataGrid data={data}>
          <DataGrid.ColumnDefinition header="Project" cell="name" />
          <DataGrid.ColumnDefinition
            header="Income"
            cell={({ row }) => <FieldTypes.Numeric currency="JPY" cell={row.income} />}
          />
          <DataGrid.ColumnDefinition
            header="Taxes"
            cell={({ row }) => <FieldTypes.Numeric currency="JPY" cell={row.taxes} />}
          />
          <DataGrid.ColumnDefinition
            header="Revenue"
            cell={({ row }) => (
              <>
                <FieldTypes.Numeric currency="JPY" cell={Number(row.income - row.taxes)} />
              </>
            )}
          />
        </DataGrid>
      </L10n>
      <L10n locale="de">
        <h3>German locale</h3>
        <DataGrid data={data}>
          <DataGrid.ColumnDefinition header="Project" cell="name" />
          <DataGrid.ColumnDefinition
            header="Income"
            cell={({ row }) => <FieldTypes.Numeric currency="EUR" cell={row.income} />}
          />
          <DataGrid.ColumnDefinition
            header="Taxes"
            cell={({ row }) => <FieldTypes.Numeric currency="EUR" cell={row.taxes} />}
          />
          <DataGrid.ColumnDefinition
            header="Revenue"
            cell={({ row }) => (
              <>
                <FieldTypes.Numeric currency="EUR" cell={Number(row.income - row.taxes)} />
              </>
            )}
          />
        </DataGrid>
      </L10n>
    </div>
  );
};
