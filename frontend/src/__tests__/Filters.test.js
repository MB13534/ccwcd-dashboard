import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import FilterBar from "../components/Filters/FilterBar";
import SwitchFilter from "../components/Filters/SwitchFilter";
import MultiSelectFilter from "../components/Filters/MultiSelectFilter";

afterEach(() => {
  cleanup();
  onSubmit.mockClear();
  onChange.mockClear();
});

const onSubmit = jest.fn();
const onChange = jest.fn();

test("<FilterBar /> with required props", () => {
  const { getByTestId, getByText } = render(
    <FilterBar onSubmit={onSubmit}>
      <h1>Renders children</h1>
    </FilterBar>
  );

  fireEvent.submit(getByTestId("filter-form"));
  expect(onSubmit).toHaveBeenCalled();
  expect(getByText("Renders children")).toBeTruthy;
});

test("<SwitchFilter /> with required props", () => {
  const checkState = true;
  const { getByText } = render(
    <SwitchFilter
      name="test"
      label={checkState ? "Active" : "Inactive"}
      checked={checkState}
      value="Test"
      onChange={onChange}
    />
  );
  expect(getByText("Active")).toBeTruthy();
});

test("<MultiSelectFilter /> with required props", async () => {
  const data = [
    { value: 1, display: "option 1" },
    { value: 2, display: "option 2" },
    { value: 3, display: "option 3" },
  ];
  const selected = [];

  const { getByTestId, getByText, getByRole, container } = render(
    <MultiSelectFilter
      name="test"
      label="Multi Select Test"
      valueField="value"
      displayField="display"
      data={data}
      selected={selected}
      onChange={onChange}
    />
  );

  const selectNode = getByTestId("multi-select");
  const selectButton = getByRole("button");
  expect(selectButton).not.toBeNull();
  expect(selectNode).not.toBeNull();

  UserEvent.click(selectButton);
  await waitForElement(() => getByText("option 1"), { container });
  const ul = getByRole("listbox");
  const itemClickable = getByText("option 1");
  UserEvent.click(itemClickable);
  expect(onChange).toHaveBeenCalled();
  expect(ul.querySelectorAll("li").length).toBe(3);
});
