import React from "react";
import uuidv4 from "uuid/v4";
import ListBox from "../ListBox";

function createOption({ index, child, title = null, isOptionActionGroup = false }) {
  const { children, idPrefix, label, value } = child.props;

  return {
    content: child.props.children,
    groupTitle: title,
    hasLabel: label,
    id: `${idPrefix}__${uuidv4()}`,
    index,
    isOptionActionGroup,
    isHidden: child.props.isHidden,
    label: label || child.props.children,
    value: value || children,
  };
}

export function getDataOptions(children, groups) {
  const options = {};
  let index = 0;

  if (groups.length) {
    groups.forEach(group => {
      options[index] = createOption({
        index,
        child: <ListBox.Option>{group}</ListBox.Option>,
        isOptionActionGroup: true,
      });
      index += 1;
    });
  }

  React.Children.toArray(children).forEach(child => {
    if (child.type.componentType === "ListBox.Group") {
      const title = child.props.title;
      React.Children.toArray(child.props.children).forEach(_child => {
        options[index] = createOption({ index, child: _child, title });
        index += 1;
      });
    } else {
      options[index] = createOption({ index, child });
      index += 1;
    }
  });

  // if (!isMulti) {
  //   options[0] = {
  //     id: `$empty__${uuidv4()}`,
  //     index: 0,
  //     hasLabel: true,
  //     label: "__paprika__empty__void__option__",
  //     content: <span>&nbsp;</span>,
  //     value: "",
  //   };
  // }

  return options;
}

export function getDataGroups(children) {
  const groups = [];
  React.Children.toArray(children).forEach(child => {
    if (child.type.componentType === "ListBox.Group") {
      groups.push(child.props.title);
    }
  });
  return groups;
}
