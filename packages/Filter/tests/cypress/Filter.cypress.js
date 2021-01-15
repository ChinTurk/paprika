import { getStoryUrlPrefix } from "../../../../.storybook/storyTree";

function clickListBoxTrigger(container) {
  container.within(() => {
    cy.getByTestId("list-box-trigger").click();
  });
}

describe("Filter", () => {
  it("Should display the different filtering options", () => {
    cy.visitStorybook(`${getStoryUrlPrefix("Filter")}--showcase`);
    cy.getByText("1 filtered").click();

    clickListBoxTrigger(cy.getByTestId("filter.item.columnSelector"));
    cy.findByText("Goals").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.columnSelector"));
    cy.findByText("Status").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.columnSelector"));
    cy.findByText("Country").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.columnSelector"));
    cy.findByText("Joined by").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.columnSelector"));
    cy.findByText("Shareable").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.columnSelector"));
    cy.findByText("Position").click();

    clickListBoxTrigger(cy.getByTestId("filter.item.ruleSelector"));
    cy.findByText("is not").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.ruleSelector"));
    cy.findByText("is not blank").click();
    clickListBoxTrigger(cy.getByTestId("filter.item.ruleSelector"));
    cy.findByText("is").click();

    clickListBoxTrigger(cy.getByTestId("filter.item.valueInput"));
    cy.findByText("midfielder").click();
  });

  it("should add filter and delete filter", () => {
    cy.visitStorybook(`${getStoryUrlPrefix("Filter")}--showcase`);
    cy.getByText("1 filtered").click();
    cy.getByText("Add filter").click();
    cy.getByTestId("filter.item").should("have.length", 2);

    cy.getByTestId("filter.deleteFilterButton")
      .eq(0)
      .click();
    cy.getByTestId("filter.item").should("have.length", 1);
  });

  it("Should switch between and or", () => {
    cy.visitStorybook(`${getStoryUrlPrefix("Filter")}--showcase`);
    cy.getByText("1 filtered").click();
    cy.getByText("Add filter").click();
    cy.getAllByRole("radio")
      .eq(0)
      .should("be.checked");
    cy.getByTestId("filter.item")
      .eq(1)
      .within(() => {
        cy.getByTestId("filter.item.valueInput").type("1");
      });
    cy.getByText("Apply").click();

    cy.getAllByRole("row").should("have.length", 1);
    cy.getByText("2 filtered").click();
    cy.getByText("Or").click();
    cy.getAllByRole("radio")
      .eq(1)
      .should("be.checked");
    cy.getByText("Apply").click();
    cy.getAllByRole("row").should("have.length", 2);
  });

  it("Should cache changes", () => {
    cy.getByText("2 filtered").click();
    cy.getByText("Add filter").click();
    cy.getByText("Cancel").click();

    cy.getByText("2 filtered").click();
    cy.getByTestId("filter.item").should("have.length", 3);
  });

  it("Should clear", () => {
    cy.getByText("Clear").click();
    cy.getAllByRole("row").should("have.length", 4);
    cy.getByText("No filters applied to this view");
  });
});
