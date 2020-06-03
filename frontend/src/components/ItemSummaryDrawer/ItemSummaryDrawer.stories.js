import React, { useState } from "react";
import { withKnobs, text, select, object } from "@storybook/addon-knobs/react";
import { CssBaseline, Box } from "@material-ui/core";
import ItemSummaryDrawer from "./ItemSummaryDrawer";
import { BrowserRouter } from "react-router-dom";

const data = [
  { ndx: 1, display: "Item 1", group: "Group A", project: "Project A" },
  { ndx: 2, display: "Item 2", group: "Group A", project: "Project A" },
  { ndx: 3, display: "Item 3", group: "Group B", project: "Project B" },
  { ndx: 4, display: "Item 4", group: "Group B", project: "Project B" },
  { ndx: 5, display: "Item 5", group: "Group C", project: "Project C" },
  { ndx: 6, display: "Item 6", group: "Group C", project: "Project C" },
];

export default {
  title: "Components/ItemSummaryDrawer",
  parameters: {
    component: ItemSummaryDrawer,
    componentSubtitle:
      "Component for rendering a item summary drawer. An item summary drawer provides high level details about an item. Common use cases include data drilldown pages such as the Manage Water Slices sub pages.",
  },
  decorators: [
    (storyFn) => (
      <>
        <CssBaseline />
        <Box>{storyFn()}</Box>
      </>
    ),
    withKnobs,
  ],
};

export const Default = () => {
  const [activeItem, setActiveItem] = useState(data[3]);

  const handleChange = (event) => {
    const { value } = event.target;
    const newActiveItem = data.filter((d) => d.ndx === value)[0];
    setActiveItem(newActiveItem);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <ItemSummaryDrawer
          items={data}
          activeItem={activeItem}
          itemSelect={{
            valueField: "ndx",
            displayField: "display",
            label: "Items",
          }}
          columns={[
            { title: "Name", field: "display" },
            { title: "Project", field: "project" },
            { title: "Group", field: "group" },
          ]}
          previousPath="/"
          onChange={handleChange}
        />
      </BrowserRouter>
    </React.Fragment>
  );
};
