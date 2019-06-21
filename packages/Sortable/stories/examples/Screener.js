import React from "react";
import { Story, Rule } from "storybook/assets/styles/common.styles";
import * as helpers from "../Sortable.stories.helpers";
import Sortable from "../../src";

const Example = () => {
  return (
    <Story css={helpers.storyStyles}>
      <Sortable onChange={() => {}} onRemove={() => {}}>
        {helpers.basicChildren(4)}
      </Sortable>
      <Rule />
      <Sortable onChange={() => {}} onRemove={() => {}}>
        <div>Zero</div>
        <Sortable.Item>One</Sortable.Item>
        <Sortable.Item>Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two</Sortable.Item>
        <Sortable.Item>
          Three Three Three Three Three Three Three Three Three Three Three Three Three Three Three
        </Sortable.Item>
        <Sortable.Item>
          Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four
          Four Four Four Four Four Four
        </Sortable.Item>
      </Sortable>
      <Rule />
      <Sortable onChange={() => {}} onRemove={() => {}}>
        {helpers.inputChildren(4)}
      </Sortable>
      <Rule />
      <Sortable onChange={() => {}}>{helpers.inputChildren(4)}</Sortable>
      <Rule />
      <Sortable onChange={() => {}} hasNumbers={false}>
        {helpers.inputChildren(4)}
      </Sortable>
    </Story>
  );
};

export default Example;
