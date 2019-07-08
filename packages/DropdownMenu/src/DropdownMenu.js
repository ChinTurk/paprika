import React from "react";
// import classNames from "classnames";
import PropTypes from "prop-types";
import Popover from "../../Popover";
import ContentContainerStyled from "./ContentContainer.styles";
import Confirmation from "./Confirmation/Confirmation";
import Item from "./Item/Item";

const { alignTypes, oneOf, node, string, func } = PropTypes;

const propTypes = {
  /** Alignment of the dropdown menu */
  align: oneOf(alignTypes),

  /** Children should consist of <Dropdown.Item /> */
  children: node.isRequired,

  /** Optional custom classes */
  className: string,

  /** Render prop for rendering the trigger element that toggles the dropdown */
  renderTrigger: func.isRequired,
};

const defaultProps = {
  align: "bottom",
  className: "",
};

const DropDownMenu = props => {
  const { align, children, className } = props;
  const [isOpen, setIsOpen] = React.useState();
  const [isConfirming, setIsConfirming] = React.useState();
  const [renderConfirmation, setRenderConfirmation] = React.useState();

  const handleToggleMenu = openState => {
    setIsOpen(openState);
    setIsConfirming(false);
    setRenderConfirmation(null);
  };

  const handleShowConfirmation = renderConfirmation => () => {
    setIsConfirming(prevIsConfirmingState => !prevIsConfirmingState);
    setRenderConfirmation(prevIsConfirmingState => (prevIsConfirmingState ? null : renderConfirmation));
  };

  const getTriggerStateAndHelpers = () => {
    return {
      isOpen,
      onToggleMenu: () => handleToggleMenu(true),
    };
  };

  const renderContent = () => {
    if (isConfirming) {
      return renderConfirmation(handleToggleMenu);
    }

    return (
      <ContentContainerStyled isOpen={isOpen}>
        {React.Children.toArray(children).map(child => {
          if (child.type.componentType === "DropDownMenu.Item") {
            if (child.props.renderConfirmation) {
              return React.cloneElement(child, {
                onShowConfirmation: handleShowConfirmation(child.props.renderConfirmation),
              });
            }
            return React.cloneElement(child, {
              onClose: () => {
                handleToggleMenu(false);
              },
            });
          }

          return child;
        })}
      </ContentContainerStyled>
    );
  };

  return (
    <Popover
      align={align}
      className={className}
      offset={4}
      role={!isConfirming ? "menu" : null}
      isOpen={isOpen}
      onClose={() => {
        if (!isConfirming) {
          handleToggleMenu(false);
        }
      }}
    >
      <Popover.Trigger>{props.renderTrigger(getTriggerStateAndHelpers())}</Popover.Trigger>
      <Popover.Content>{renderContent()}</Popover.Content>
    </Popover>
  );
};

DropDownMenu.displayName = "DropDownMenu";
DropDownMenu.Item = Item;
DropDownMenu.Confirmation = Confirmation;
DropDownMenu.propTypes = propTypes;
DropDownMenu.defaultProps = defaultProps;

export default DropDownMenu;
