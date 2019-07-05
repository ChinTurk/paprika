import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { Story } from "storybook/assets/styles/common.styles";
import * as helpers from "./Sortable.stories.helpers";

import Showcase from "./examples/Showcase";
import Sortable from "./examples/Functional";
import BasicExample from "./examples/Basic";
import ServerErrorExample from "./examples/ServerError";
import ScreenerExample from "./examples/Screener";

storiesOf("Sortable", module)
  .addDecorator(withKnobs)
  .add("Showcase", Showcase);

storiesOf("Sortable/Examples", module)
  .add("Basic", () => <BasicExample />)
  .add("Functional", () => (
    <Story css={helpers.storyStyles}>
      <Sortable>{helpers.basicChildren(8)}</Sortable>
    </Story>
  ))
  .add("Fake Server Error", () => <ServerErrorExample />);

storiesOf("Sortable/Automation Tests", module)
  .add("Screener", () => <ScreenerExample />)
  .add("Cypress", () => (
    <Story css={helpers.storyStyles}>
      <Sortable>{helpers.basicChildren(4)}</Sortable>
    </Story>
  ));
