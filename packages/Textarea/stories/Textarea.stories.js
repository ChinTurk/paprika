import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { getStoryName } from "storybook/storyTree";
import { showcaseStoryParameters, variationsStoryParameters } from "storybook/assets/storyParameters";
import { TextareaStory } from "./Textarea.stories.styles";
import Showcase from "./examples/Showcase";
import Variations from "./examples/Variations";
// import Uncontrolled from "./examples/Uncontrolled";
// import Sizes from "./examples/Sizes";
// import ScreenerStory from "./examples/test/Screener";

const storyName = getStoryName("Textarea");

export default {
  title: storyName,
};

export const showcase = () => (
  <TextareaStory storyName="Textarea" tagline={TextareaStory.defaultTaglines.showcase}>
    <Showcase />
  </TextareaStory>
);
showcase.story = {
  name: "Showcase",
  decorators: [withKnobs],
  parameters: showcaseStoryParameters,
};

export const variations = () => (
  <TextareaStory
    storyName="Textarea"
    tagline={TextareaStory.defaultTaglines.variations}
    component="Textarea"
    fileName="examples/Variations.js"
  >
    <Variations />
  </TextareaStory>
);
variations.story = {
  name: "Variations",
  parameters: variationsStoryParameters,
};

// storiesOf(`${storyName}/Examples`, module)
//   .add("Uncontrolled", Uncontrolled)
//   .add("Sizes", () => <Sizes />);

// storiesOf(`${storyName}/Backyard/Tests`, module)
//   .add("Screener", () => <ScreenerStory />)
