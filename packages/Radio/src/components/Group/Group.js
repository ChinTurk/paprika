import React from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import { ShirtSizes } from "@paprika/helpers/lib/customPropTypes";

const propTypes = {
  /** aria-labelledby prop on the containing group element */
  a11yText: PropTypes.string,

  /** Can deselect any radio */
  canDeselect: PropTypes.bool,

  /** The individual radio items. */
  children: PropTypes.node,

  /** Are all radios disabled */
  isDisabled: PropTypes.bool,

  /** On change of radio selection. */
  onChange: PropTypes.func.isRequired,

  /** The size for all radio components. */
  size: PropTypes.oneOf(ShirtSizes.DEFAULT),
};

const defaultProps = {
  a11yText: "",
  canDeselect: false,
  children: null,
  isDisabled: false,
  size: ShirtSizes.MEDIUM,
};

function Group(props) {
  const { a11yText, canDeselect, children, onChange, ...moreGroupProps } = props;
  const defaultCheckedIndex = React.Children.toArray(children).findIndex(child => child.props.defaultIsSelected);
  const selectedIndex = React.Children.toArray(children).findIndex(child => child.props.isSelected);

  const defaultIndex = () => {
    if (defaultCheckedIndex !== -1) {
      return defaultCheckedIndex;
    }

    return false;
  };

  const [checkedIndex, setCheckedIndex] = React.useState(defaultIndex());
  if (selectedIndex !== -1 && selectedIndex !== checkedIndex) {
    setCheckedIndex(selectedIndex);
  }

  const deselectableIndex = index => (checkedIndex === index ? null : index);
  const name = nanoid();
  const handleRadioClick = index => {
    onChange(index);
    setCheckedIndex(canDeselect ? deselectableIndex(index) : index);
  };

  return (
    <div role="radiogroup" aria-labelledby={a11yText} data-pka-anchor="radio.group">
      {children.map((child, index) => {
        if (child && child.type && child.type.displayName === "Radio") {
          const childKey = { key: `Radio${index}` };
          return React.cloneElement(child, {
            onClick: () => handleRadioClick(index),
            isChecked: checkedIndex === index,
            canDeselect,
            name,
            ...childKey,
            ...moreGroupProps,
          });
        }
        return child;
      })}
    </div>
  );
}

Group.displayName = "Radio.Group";
Group.propTypes = propTypes;
Group.defaultProps = defaultProps;

export default Group;
