import React from "react";
import { Story } from "storybook/assets/styles/common.styles";
import { storiesOf } from "@storybook/react";
import ListBoxBrowser from "../src";
import dataMultiple from "../test/fixtures/multiple";
import dataMultipleFirstOptionNoOptions from "../test/fixtures/multiple.firstOptionNoOptions";

storiesOf("ListBoxBrowser", module)
  .add("Multi / basic", () => (
    <Story>
      <ListBoxBrowser
        data={dataMultiple}
        rootTitle="Universes"
        browserTitle="Heroes"
        onChange={selectedOptions => {
          console.log("selected options:", selectedOptions);
        }}
      />
    </Story>
  ))
  .add("Multi / Allowing select parent", () => (
    <Story>
      <ListBoxBrowser
        data={dataMultiple}
        isParentSelectable
        rootTitle="Universes"
        browserTitle="Heroes"
        onChange={selectedOptions => {
          console.log("selected options:", selectedOptions);
        }}
      />
    </Story>
  ))
  .add("Multi / With OptionSelected component", () => (
    <Story>
      <ListBoxBrowser
        data={dataMultiple}
        isParentSelectable
        rootTitle="Universes"
        browserTitle="Heroes"
        onChange={selectedOptions => {
          console.log("selected options:", selectedOptions);
        }}
      >
        <ListBoxBrowser.OptionsSelected />
      </ListBoxBrowser>
    </Story>
  ))
  .add("Multi / With first Option without Options", () => (
    <Story>
      <ListBoxBrowser
        data={dataMultipleFirstOptionNoOptions}
        rootTitle="Universes"
        browserTitle="Heroes"
        onChange={selectedOptions => {
          console.log("selected options:", selectedOptions);
        }}
      >
        <ListBoxBrowser.OptionsSelected />
      </ListBoxBrowser>
    </Story>
  ));
