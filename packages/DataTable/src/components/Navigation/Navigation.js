import React from "react";
import PropTypes from "prop-types";
import * as styled from "./Navigation.styles";

const propTypes = {
  children: PropTypes.node.isRequired,
  ColumnsDefinition: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.object.isRequired,
      type: PropTypes.func.isRequired,
    })
  ),
};

const defaultProps = {
  ColumnsDefinition: [],
};

export default function Navigation(props) {
  const { children, ColumnsDefinition } = props;
  return (
    <styled.Navigation>
      {React.Children.map(children, child => React.cloneElement(child, { ColumnsDefinition }))}
    </styled.Navigation>
  );
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
Navigation.displayName = "DataTable.Navigation";