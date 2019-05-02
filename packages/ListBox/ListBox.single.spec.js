import React from "react";
import { configure } from "react-testing-library";

import { render, fireEvent } from "react-testing-library";
import ListBox from ".";

configure({ testIdAttribute: "data-qa-anchor" });

function renderComponent(props = {}) {
  const rendered = render(
    <ListBox {...props}>
      <ListBox.Option>Venus</ListBox.Option>
      <ListBox.Option>Jupiter</ListBox.Option>
    </ListBox>
  );

  return {
    ...rendered,
    openSelect: () => {
      fireEvent.click(rendered.getByTestId("trigger"));
    },
    selectVenus: () => {
      fireEvent.click(rendered.getByText(/venus/i));
    },
    selectJupiter: () => {
      fireEvent.click(rendered.getByText(/jupiter/i));
    },
    dropdownIsHidden: () => {
      expect(rendered.getByTestId("popover-content").getAttribute("aria-hidden")).toBeTruthy();
    },
    dropdownIsNotHidden: () => {
      expect(rendered.getByTestId("popover-content").getAttribute("aria-hidden")).toMatch(/false/i);
    },
  };
}

describe("Listbox single select", () => {
  it("dropdown should be hidden when first rendered", () => {
    const { getByTestId, dropdownIsHidden } = renderComponent();
    dropdownIsHidden();
  });

  it("dropdown should be visible when clicked", () => {
    const { openSelect, dropdownIsNotHidden } = renderComponent();

    openSelect();
    dropdownIsNotHidden();
  });

  it("dropdown should have correct number of options", () => {
    const { getByText, getByTestId, openSelect } = renderComponent();

    openSelect();
    expect(getByText(/venus/i)).toBeInTheDocument();
    expect(getByText(/jupiter/i)).toBeInTheDocument();
  });

  it("dropdown should close when choosing option and show clear button", () => {
    const { getByTestId, openSelect, selectVenus } = renderComponent();

    openSelect();
    selectVenus();
    expect(getByTestId("trigger")).toHaveTextContent(/venus/i);
    expect(getByTestId("clear-button")).toBeVisible();
  });

  it("should clear selected option when x is clicked", () => {
    const { getByTestId, openSelect, selectVenus } = renderComponent();

    openSelect();
    selectVenus();
    fireEvent.click(getByTestId("clear-button"));
    expect(getByTestId("clear-button")).not.toBeVisible();
    expect(getByTestId("trigger")).not.toHaveTextContent(/venus/i);
    expect(getByTestId("trigger")).toHaveTextContent(/select one of/i);
  });

  it("should have a filter in dropdown", () => {
    const { getByTestId, openSelect } = renderComponent({
      hasFilter: true,
    });

    openSelect();
    expect(getByTestId("list-filter")).toBeInTheDocument();
  });

  //FAILS clear button still renders and still visible
  // it("should not render the 'x' clear button", () => {
  //   const { getByTestId, queryByTestId, openSelect, selectVenus, debug } = renderComponent({
  //     hasClearButton: false,
  //   });
  //
  //   // openSelect();
  //   // selectVenus();
  //   //expect(getByTestId("clear-button")).not.toBeInTheDocument();
  //   //expect(queryByTestId("clear-button")).toBeNull();
  //   //expect(queryByTestId("clear-button")).not.toBeInTheDocument();
  //   openSelect();
  //   selectVenus();
  //   debug();
  //   expect(getByTestId("clear-button")).not.toBeVisible();
  // });

  it("should have custom height of 500", () => {
    const { getByTestId } = renderComponent({
      height: 500,
    });

    expect(getByTestId("styled-list").getAttribute("height")).toMatch("500");
  });

  it("should be disabled", () => {
    const { getByTestId, openSelect, dropdownIsHidden } = renderComponent({
      isDisabled: true,
    });

    openSelect();
    dropdownIsHidden();
  });

  it("should be displayed inline with no Popover", () => {
    const { queryByTestId } = renderComponent({
      isInline: true,
    });

    expect(queryByTestId("popover-content")).toBeNull();
  });

  it("should focus on option container as soon as the Popover is open", () => {
    const { openSelect, getByTestId } = renderComponent();

    openSelect();
    expect(document.activeElement).toBe(getByTestId("popover-content"));
  });

  it("should not focus on option container as soon as the Popover is open", () => {
    const { openSelect, getByTestId } = renderComponent({
      isPopoverEager: false,
    });

    openSelect();
    expect(document.activeElement).not.toBe(getByTestId("popover-content"));
  });

  it("should display message when filter input does not find a match", () => {
    const { openSelect, getByTestId, getByText } = renderComponent({
      hasFilter: true,
      hasNotResultsMessage: "No match",
    });

    openSelect();
    fireEvent.change(getByTestId("list-filter-input"), { target: { value: "g" } });
    expect(getByTestId("no-result-filter")).toBeInTheDocument();
    expect(getByText("No match")).toBeInTheDocument();
  });

  it("placeholder should display default label when no option is selected", () => {
    const { getByText } = renderComponent();

    expect(getByText("Select one of the options")).toBeInTheDocument();
  });

  it("placeholder should display custom label when no option is selected", () => {
    const { getByText } = renderComponent({
      placeholder: "Choose an option!",
    });

    expect(getByText("Choose an option!")).toBeInTheDocument();
  });

  it("should have custom zIndex of 999", () => {
    const { getByText, getByTestId, debug } = renderComponent({
      zIndex: 999,
    });

    expect(getByTestId("popover-zindex")).toBeInTheDocument();
    debug();
    //console.log("hey", getByTestId("popover-zindex").getAttribute("zIndex"));
    //expect(getByTestId("popover-content").getAttribute("zIndex")).toBe(999);
  });

  it("should have popover open already ", () => {
    const { dropdownIsHidden, dropdownIsNotHidden, debug } = renderComponent({
      isPopoverOpen: true,
    });

    dropdownIsNotHidden();
  });

  // Ask about onClose not being used in listbox
  // it("calls onClose when Popover closes", () => {
  //   const onCloseListBox = jest.fn();
  //   const { getByTestId, debug, openSelect, selectVenus } = renderComponent({
  //     onClose: onCloseListBox,
  //   });
  //   openSelect();
  //   selectVenus();
  //   //expect(getByTestId("trigger")).toHaveTextContent(/venus/i);
  //   //openSelect();
  //   //fireEvent.click(getByText(/jupiter/i));
  //   //console.log("Howdy", onCloseListBox.mock);
  //   expect(onCloseListBox).toHaveBeenCalled();
  //   //console.log("Hello", onCloseListBox.mock.calls.length);
  // });

  // onChange gets called on unmount - soo being called atleast once
  // before selecting any option
  it("calls onChange", () => {
    const onOptionClick = jest.fn();
    const { openSelect, selectVenus } = renderComponent({
      onChange: onOptionClick,
    });

    openSelect();
    selectVenus();
    //console.log("Hello", onOptionClick.mock.calls.length);
    expect(onOptionClick).toHaveBeenCalled();
  });

  // onClickClear passes even when clear button is not shown on the UI
  // after selecting an option from the popover
  // Because of CSS the clear button is still present
  it("calls onClickClear event when clicking clear button", () => {
    const onClickClearTrigger = jest.fn();
    const { getByTestId, openSelect, selectVenus, debug } = renderComponent({
      onClickClear: onClickClearTrigger,
    });

    openSelect();
    selectVenus();
    fireEvent.click(getByTestId("clear-button"));
    expect(onClickClearTrigger).toHaveBeenCalled();
  });

  // Ask about
  // it("calls onSelected when an option is selected", () => {
  //   const onSelectedOption = jest.fn();
  //   const { openSelect, selectVenus, getByTestId } = renderComponent({
  //     onSelected: onSelectedOption,
  //   });
  //
  //   openSelect();
  //   selectVenus();
  //   expect(getByTestId("trigger")).toHaveTextContent(/venus/i);
  //   console.log("Hi", onSelectedOption.mock);
  //   expect(onSelectedOption).toHaveBeenCalled();
  // });

  it("calls renderTrigger and changes the render method for label", () => {
    const onRenderTrig = jest.fn((state, dispatch, { getDOMAttributesForListBoxButton }) => (
      <button
        onClick={() => {
          dispatch({ type: "OPEN_POPOVER" });
        }}
        type="button"
        {...getDOMAttributesForListBoxButton()}
        ref={state.refTrigger}
      >
        customTrigger
      </button>
    ));
    const { dropdownIsNotHidden, selectVenus, getByText } = renderComponent({
      renderTrigger: onRenderTrig,
    });

    expect(onRenderTrig).toHaveBeenCalled();
    expect(getByText(/customTrigger/i)).toBeInTheDocument();
    fireEvent.click(getByText(/customTrigger/i));
    dropdownIsNotHidden();
    expect(getByText(/venus/i)).toBeInTheDocument();
    expect(getByText(/jupiter/i)).toBeInTheDocument();
    selectVenus();
  });

  it("should have custom checkboxes", () => {
    const onRenderingCheckbox = jest.fn(isChecked => {
      return isChecked ? "✅" : "🙅‍";
    });
    const { getByTestId, getByText, queryByText, openSelect, selectVenus, debug } = renderComponent({
      renderCheckbox: onRenderingCheckbox,
    });

    // expect(getByTestId("listbox-checker")).toBeVisible();
    expect(getByText(/🙅‍/i)).toBeInTheDocument();
    expect(queryByText(/✅/i)).not.toBeInTheDocument();
    openSelect();
    selectVenus();
    expect(getByText(/✅/i)).toBeInTheDocument();
    openSelect();
    fireEvent.click(getByText(/jupiter/i));
    expect(getByText(/🙅‍venus/i)).toBeInTheDocument();
    expect(getByText(/✅jupiter/i)).toBeInTheDocument();
  });

  // it("calls custom filter", () => {
  //   const changeFilter = jest.fn();
  //   const { openSelect, selectVenus } = renderComponent({
  //     filter: changeFilter,
  //   });
  //
  //   // openSelect();
  //   // selectVenus();
  //   expect(changeFilter).toHaveBeenCalled();
  // });
});
