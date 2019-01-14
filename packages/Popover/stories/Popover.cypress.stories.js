import React from "react";
import { storiesOf } from "@storybook/react";
import Popover from "../Popover";
import windowHandles, { Input } from "../../../.storybook/stories/windowHandles";

storiesOf("Popover/Automation Tests/Cypress", module)
  .addDecorator(
    windowHandles({
      align: new Input(),
      isEager: new Input(),
    })
  )
  .add("Basic Popover Test", () => (
    <Popover>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Content>
        <Popover.Tip />
        <Popover.Card>Popover content.</Popover.Card>
      </Popover.Content>
    </Popover>
  ));
