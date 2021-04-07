import React from "react";
import { getStoryName } from "storybook/storyTree";
import { Story } from "storybook/assets/styles/common.styles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Toast from "../../Toast/src";

import Card from "../../Card/src";

import TextEditorUncontrolled from "./examples/uncontrolled";
import TextEditorControlled from "./examples/controlled";
import TextEditorIsDisabled from "./examples/isDisabled";
import TextEditorExtendingInit from "./examples/extendingInit";

export default {
  title: getStoryName("TextEditor"),
};

export const Uncontrolled = () => {
  return (
    <Story>
      <Card style={{ padding: "8px" }}>
        <TextEditorUncontrolled />
      </Card>
      <SyntaxHighlighter language="javascript">
        {`const API_KEY = "tiny-mce-highbond-api-key";
return <TextEditor defaultValue={'<p>This is a text editor</p>'} apiKey={API_KEY} />;`}
      </SyntaxHighlighter>
    </Story>
  );
};

export const Controlled = () => {
  return (
    <Story>
      <Card style={{ padding: "8px", minWidth: "220px" }}>
        <TextEditorControlled />
      </Card>

      <SyntaxHighlighter language="javascript">
        {`const API_KEY = "tiny-mce-highbond-api-key";
const [value, setValue] = React.useState("Type something...");

function handleChange(nextValue) {
  setValue(nextValue);
}

return <TextEditor onChange={handleChange} value={value} apiKey={API_KEY} />;`}
      </SyntaxHighlighter>
    </Story>
  );
};

export const IsDisabled = () => {
  return (
    <Story>
      <Card style={{ padding: "8px" }}>
        <TextEditorIsDisabled />
      </Card>
      <SyntaxHighlighter language="javascript">
        {`const API_KEY = "tiny-mce-highbond-api-key";
return <TextEditor isDisabled defaultValue={'<p>This is a text editor</p>'} apiKey={API_KEY} />;`}
      </SyntaxHighlighter>
    </Story>
  );
};

export const ExtendingInit = () => {
  return (
    <Story>
      <Card style={{ padding: "8px" }}>
        <Toast hasCloseButton={false}>
          TextEditor.Tiny let you to extend the init object within the TinyMCE Editor
        </Toast>
        <TextEditorExtendingInit />
      </Card>
      <SyntaxHighlighter language="javascript">
        {`const API_KEY = "tiny-mce-highbond-api-key";

return (
  <TextEditor isDisabled defaultValue={'<p>This is a text editor</p>'} apiKey={API_KEY}>
    <TextEditor.Tiny init={{ menubar: true }} />
  </TextEditor>
);`}
      </SyntaxHighlighter>
    </Story>
  );
};
