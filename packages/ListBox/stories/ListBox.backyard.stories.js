import React from "react";
import { getStoryName } from "storybook/storyTree";
import { exampleStoryParameters } from "storybook/assets/storyParameters";
import ExampleStory from "storybook/components/ExampleStory";
import DirectoryExample from "./sandbox/Directory/Directory";
import FilterSelectExample from "./sandbox/FilterSelect/FilterSelect";
import Lazy from "./sandbox/LazyListBox/Lazy";
import ListBox from "../src";

const storyName = getStoryName("ListBox");

export default {
  title: `${storyName}/Backyard/Sandbox`,
  component: ListBox,
};

export const FilterSelectStory = () => (
  <ExampleStory storyName="Filter Select" component="ListBox" fileName="sandbox/FilterSelect.js">
    <FilterSelectExample />
  </ExampleStory>
);

FilterSelectStory.story = {
  name: "Filter Select",
  parameters: {
    ...exampleStoryParameters,
  },
};

export const ListBoxDirectoryStory = () => (
  <ExampleStory storyName="Directory" component="ListBox" fileName="sandbox/Directory.js">
    <DirectoryExample />
  </ExampleStory>
);

ListBoxDirectoryStory.story = {
  name: "Directory",
  parameters: {
    ...exampleStoryParameters,
  },
};

export const LazyStory = () => (
  <ExampleStory component="ListBox" storyName="Lazy ListBox" fileName="examples/Lazy.js">
    <Lazy />
  </ExampleStory>
);

LazyStory.story = {
  name: "Lazy Load API",
  parameters: {
    ...exampleStoryParameters,
  },
};