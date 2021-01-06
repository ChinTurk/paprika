import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { getStoryName } from "storybook/storyTree";
import { showcaseStoryParameters } from "storybook/assets/storyParameters";
import ExampleStory from "storybook/components/ExampleStory";
import FakeAppWithContext from "./examples/FakeAppWithContext";
import L10n from "../src";

const storyName = getStoryName("L10n");

export default {
  title: storyName,
  component: L10n,
};

export const ShowcaseStory = () => (
  <ExampleStory storyName="Popover" tagline={ExampleStory.defaultTaglines.showcase}>
    <FakeAppWithContext locale={select("locale", ["en", "de", "fr", "es", "pt", "ja", "zh"], "de")} />
  </ExampleStory>
);

ShowcaseStory.story = {
  name: "Showcase",
  decorators: [withKnobs],
  parameters: showcaseStoryParameters,
};
