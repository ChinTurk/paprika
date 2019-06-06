import React from "react";
import { Story } from "storybook/assets/styles/common.styles";
import Select from "./SelectWithState";

export const Basic = () => {
  return (
    <Story>
      <Select placeholder="Select an option">
        <option value="Coke">Pepsi</option>
        <option value="Pepsi">Coke</option>
      </Select>
    </Story>
  );
};

export const WithSelectedOption = () => {
  return (
    <Story>
      <Select placeholder="Select an option">
        <option value="Coke" selected>
          Pepsi
        </option>
        <option value="Pepsi">Coke</option>
      </Select>
    </Story>
  );
};

export const DisableSelect = () => {
  return (
    <Story>
      <Select placeholder="Select an option" isDisabled>
        <option value="Coke">Pepsi</option>
        <option value="Pepsi">Coke</option>
      </Select>
    </Story>
  );
};

export const ReadOnlySelect = () => {
  return (
    <Story>
      <Select placeholder="Select an option" isReadOnly hasError>
        <option value="Coke">Pepsi</option>
        <option value="Pepsi">Coke</option>
      </Select>
    </Story>
  );
};
