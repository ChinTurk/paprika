import React from "react";
import PropTypes from "prop-types";
import * as styled from "./TopNavigation.styles";

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

export default function TopNavigation(props) {
  const { children } = props;
  return <styled.Navigation>{children}</styled.Navigation>;
}

TopNavigation.propTypes = propTypes;
TopNavigation.defaultProps = defaultProps;
TopNavigation.displayName = "DataTable.TopNavigation";
