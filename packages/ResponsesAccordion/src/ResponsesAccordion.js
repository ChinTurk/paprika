import React from "react";
import PropTypes from "prop-types";
import Item from "./components/Item";
import Indicator from "./components/Indicator";
import Responses from "./components/Responses";
import Collapsible from "./components/Collapsible";
import accordionStyles from "./ResponsesAccordion.styles";

const propTypes = {
  activeIndex: PropTypes.number,
  activeStatus: PropTypes.node,
  children: PropTypes.node,
};

const defaultProps = {
  activeIndex: 0,
  activeStatus: null,
  children: null,
};

function filterChildren(children) {
  return React.Children.toArray(children).filter(
    child => child.type && child.type.displayName === "ResponsesAccordion.Item"
  );
}

const ResponsesAccordion = props => {
  const { activeIndex, activeStatus, children, ...moreProps } = props;

  const validChildren = filterChildren(children);

  const getLabel = (label, index) => {
    return activeIndex === index ? (
      <span>
        {label} - {activeStatus}
      </span>
    ) : (
      label
    );
  };

  return (
    <div css={accordionStyles} {...moreProps}>
      {validChildren.length > 0 &&
        validChildren.map((child, index) => {
          const { label, ...moreChildProps } = child.props;
          const isComplete = activeIndex > index;
          const isActive = activeIndex === index;

          return (
            <div
              css={`
                display: flex;
                padding: 8px 0;
                [data-pka-anchor="indicator"] {
                  margin-right: 8px;
                }
              `}
            >
              <Indicator isComplete={isComplete} isActive={isActive} />
              <Collapsible label={getLabel(label, index)} isComplete={isComplete} {...moreChildProps}>
                {child}
              </Collapsible>
            </div>
          );
        })}
    </div>
  );
};

ResponsesAccordion.displayName = "ResponsesAccordion";
ResponsesAccordion.propTypes = propTypes;
ResponsesAccordion.defaultProps = defaultProps;

ResponsesAccordion.Item = Item;
ResponsesAccordion.Indicator = Indicator;
ResponsesAccordion.Responses = Responses;

export default ResponsesAccordion;
