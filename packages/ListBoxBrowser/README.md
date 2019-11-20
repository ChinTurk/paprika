# ListBoxBrowser

A two column layout that allows users to select one or multiple options. It is similar to the experience of browsing a file manager in any operating system.

## Installation

```sh
$ npm install @paprika/listbox-browser
```

or

```sh
$ yarn add @paprika/listbox-browser
```

## Props

```
browserTitle
children
data
defaultSelectedOptions
defaultSelectedView
hasBreadcrumb
hasError
height
isMulti
isParentSelectable
onChange
rootTitle
```

## Usage

The `<ListBoxBrowser />` is primarily an uncontrolled component which receives a `data` prop which allows the consumer to set the initial state.

It has two functions to set defaults. One for selected options and another for a default selected view for the browser column.

The `onChange` prop receives a parameter with an array of the selected options.

### Data prop

The most important prop for the `<ListBoxBrowser />` is the `data` prop, which initializes the state for the component.

The `data` prop is an array of objects where each object requires to have at least a `label` attribute on it and at least one of those items should include an `options` property.

### Data prop shape

```js
{
	label: "require attribute",
	options: [{}{}{}], // more object with the same shape
}
```

The **object** can have an options attribute, which is an array of the same kind of objects.

A data prop with **options** looks like:

```js
const data = [
   {
        label: "NBA",
        options: [{ label: "Toronto Raptors"}, {...}]
   },
   {
        label: "NHL",
        options: [{ label: "Vancouver Canucks"}, {...}]
   },
   {
        label: "MLS",
        options: [{ label: "Vancouver Whitecaps"}, {...}]
   },
]
```

Recursively the component runs over all the options on the array and assembles the UI for the user.

**NOTE** You can add extra properties to the objects; those are and pass to you back on the `onChange` function or when using `defaultSelectedOptions`, `defaultSelectedView` functions.

---

#### Basic example

```jsx
import ListBoxBrowser from "@paprika/listbox-browser";

export default function App() {
   const data = [{...}...{...}]; // your data;
   return <ListBoxBrowser data={data} />
}
```

---

#### ListBoxBrowser.SelectedOptions

By default, the `<ListBoxBrowser />` does not display a list of the selected options.  
But you can activate this feature to display multiple options using the `<ListBoxBrowser.SelectedOptions />` subcomponent.

```jsx
<ListboxBrowser data={data}>
   <ListBoxBrowser.SelectedOptions />
</ListBoxBrowser>
```

#### defaultSelectedOptions

The `defaultSelectedOptions` receives a function to be executed to determine if an option should start as selected or not. This function is called as options are passed down on the data prop.

Ex.

```jsx
const data = [
	{ key: 1, label: "one", options: [{...}]},
	{ key: 2, label: "two", options: [{...}]},
	...
]

<ListBoxBrowser
	data={data}
	defaultSelectedView={(option) =>  (option.key === 1)}  />

/**
  The previous result on option with `key 1` to be selected */
```

#### defaultSelectedView

This prop works exactly like the `defaultSelectedOptions`. It receives a function which you can use to compare and decide what option should be the one as initial view.

**Note**: Be sure to select an `option` property with `options`. Otherwise, this function doesn't work and falls back to the default behaviour, which selects the first option with options.

### Lazy loading

This component provides a way to load async options. To achieve this, you can declare the `options` array property empty `[]`. This indicates to the component to fire the `onFetch={option => ()}` prop when the user interacts with it.

#### Lazy loading example

To help you to sync your data with the newest options, the ListBoxBrowser provides you with some tools to make it easier:

A Subcomponent `<ListBoxBrowser.Browser isLoading />` which lets you set the right column into a pending state.
A `ListBoxBrowser.findOption(data, fn)` which helps you in finding an option in your data so you can modify it.

```js
export default function App(props) {
  const [isBrowserLoading, setIsBrowserLoading] = React.useState(false);
  const [data, setData] = React.useState(props.defaultData);

  async function handleFetch(option) {
    setIsBrowserLoading(() => true);
    const key = option.key;
    const response = await fakeFetch({ key });

    setData(data => {
      const cloneData = data.splice(0);
      const o = ListBoxBrowser.findOption(cloneData, option => option.key === key);
      o.options = response;

      return cloneData;
    });
    setIsBrowserLoading(() => false);
  }

  return (
    <ListBoxBrowser onFetch={handleFetch} data={data} rootTitle="Universes" browserTitle="Heroes">
      <ListBoxBrowser.Browser isLoading={isBrowserLoading} />
      <ListBoxBrowser.OptionsSelected />
    </ListBoxBrowser>
  );
}
```