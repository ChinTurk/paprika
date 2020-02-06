import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import Showcase from "./examples/Showcase";
import LayoutExamples from "./examples/LayoutExamples";

storiesOf("ExternalLink", module)
  .addDecorator(withKnobs)
  .add("Showcase", Showcase)
  .add("Layout Examples", LayoutExamples);