import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { Story } from "storybook/assets/styles/common.styles";
import ShowcaseStory from "./examples/Showcase";
import Tabs from "../src/Tabs";

storiesOf("Tabs", module)
  .addDecorator(withKnobs)
  .add("Showcase", ShowcaseStory)
  .add("Tab", () => (
    <Story>
      <Tabs>
        <Tabs.List>
          <Tabs.Tab label="Hello" />
          <Tabs.Tab isDisabled label="Disabled 1" />
          <Tabs.Tab label="World" />
          <Tabs.Tab isDisabled label="Disabled 2" />
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>
            Lorem ipsum dolor amet pop-up sartorial artisan keytar leggings bespoke chia swag flexitarian pabst yr
            godard williamsburg. Marfa lomo four loko hoodie. Hella gastropub irony bitters succulents truffaut godard
            tbh street art. Occupy bicycle rights fingerstache pinterest, af gluten-free health goth put a bird on it
            90s stumptownedison bulb pug hella. Small batch dreamcatcher mumblecore.
          </Tabs.Panel>
          <Tabs.Panel>isDisabled Content 1</Tabs.Panel>
          <Tabs.Panel>World</Tabs.Panel>
          <Tabs.Panel>isDisabled Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </Story>
  ))
  .add("Tab Links", () => (
    <Story>
      <Tabs>
        <Tabs.List>
          <Tabs.Tab label="Google" linkUrl="https://google.com" />
          <Tabs.Tab
            label="Galvanize new tab"
            linkUrl="https://wegalvanize.com"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Tabs.List>
      </Tabs>
    </Story>
  ));
