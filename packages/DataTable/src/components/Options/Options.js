import React from "react";
import PropTypes from "prop-types";
import DropdownMenu from "@paprika/dropdown-menu";
import ArrowDown from "@paprika/icon/lib/ArrowDown";
import SortOption from "./SortOption";
import { useDispatch, useDataTableState } from "../../context";

const propTypes = {
  columnId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default function Options(props) {
  const { columnId } = props;
  const dispatch = useDispatch();
  const { sortDirections, momentParsingFormat, canHide } = useDataTableState().columns[columnId];

  // TODO: Checking if need to show options icon, later we need to check filtering rules..
  const hasOptions = canHide || (sortDirections && sortDirections.length > 0);
  if (!hasOptions) return null;

  function handleClickAddFilter() {
    dispatch({ type: "ADD_FILTER", payload: columnId });
  }

  function handleToggleColumn() {
    dispatch({ type: "TOGGLE_COLUMN", payload: columnId });
  }

  return (
    <DropdownMenu
      align="bottom"
      data-pka-anchor="datatable-dropdown"
      renderTrigger={({ isOpen, handleOpenMenu }) => (
        <DropdownMenu.Trigger
          isOpen={isOpen}
          onOpenMenu={handleOpenMenu}
          icon={<ArrowDown />}
          kind="minor"
          size="small"
        />
      )}
    >
      {sortDirections
        ? sortDirections.map(direction => (
            <SortOption
              key={direction}
              columnId={columnId}
              direction={direction}
              momentParsingFormat={momentParsingFormat}
            />
          ))
        : null}
      {canHide ? <DropdownMenu.Item onClick={handleToggleColumn}>Hide this column</DropdownMenu.Item> : null}
      <DropdownMenu.Item onClick={handleClickAddFilter}>Add filter for this column</DropdownMenu.Item>
    </DropdownMenu>
  );
}

Options.propTypes = propTypes;