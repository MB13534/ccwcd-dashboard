import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs/react";
import TopNav from "./TopNav";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { select } from "@storybook/addon-knobs";

export default {
  title: "Components | TopNav",
  parameters: {
    component: TopNav,
    componentSubtitle: "Component for rendering a top navigation bar",
  },
  decorators: [
    // (storyFn) => <Paper style={{ padding: 20 }}>{storyFn()}</Paper>,
    withKnobs,
  ],
};

const MenuItems = [
  { id: 1, title: "Item 1", path: "/item-1" },
  { id: 2, title: "Item 2", path: "/item-2" },
  { id: 3, title: "Item 3", path: "/item-3" },
];

const backgroundColorOptions = {
  default: "default",
  inherit: "inherit",
  primary: "primary",
  secondary: "secondary",
  transparent: "transparent",
};

export const Default = () => (
  <div>
    <CssBaseline />
    <BrowserRouter>
      <TopNav
        title={text("title", "CCWCD Dashboard")}
        menuItems={object("menuItems", MenuItems)}
      />
    </BrowserRouter>
  </div>
);
