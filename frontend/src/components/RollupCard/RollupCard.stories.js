import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select, object } from "@storybook/addon-knobs/react";
import RollupCard from "./RollupCard";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, Box } from "@material-ui/core";
import BasicIllustration from "../../images/undraw_personal_settings_kihd.svg";
import ErrorIllustration from "../../images/undraw_alert_mc7b.svg";

export default {
  title: "Components/RollupCard",
  parameters: {
    component: RollupCard,
    componentSubtitle:
      "Component for rendering a dashboard rollup card. A dashboard rollup card is intended to provide high level system information. Common use cases include alerts, a description with links to a site section prominently, or to display basic metrics.",
  },
  decorators: [
    (storyFn) => (
      <Box bgcolor="#f1f1f1" width="100%" padding={4}>
        {storyFn()}
      </Box>
    ),
    withKnobs,
  ],
};

const stateOptions = {
  default: "default",
  success: "success",
  error: "error",
};

const links = [
  { title: "Manage Water Slices", path: "/recharge-accounting/water-slices" },
];

const actions = [
  {
    title: "Preview Water Slices",
    onClick: action("Preview Water Slices click"),
  },
];

export const Default = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard
        title="Accounting Rollup"
        message="Some filler text about accounting"
        state="default"
        links={links}
        style={{ width: 600 }}
      />
    </BrowserRouter>
  </React.Fragment>
);

export const Actions = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard
        title="Accounting Rollup"
        message="Some filler text about accounting"
        state="default"
        actions={object("actions", actions)}
        style={{ width: 600 }}
      />
    </BrowserRouter>
  </React.Fragment>
);

export const Illustration = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard
        title={text("title", "Accounting Rollup")}
        message={text("message", "Some filler text about accounting")}
        state="default"
        links={[]}
        illustration={BasicIllustration}
        style={{ width: 600 }}
      />
    </BrowserRouter>
  </React.Fragment>
);

export const Success = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard
        title={text("title", "Woohoo!")}
        message={text("message", "We could not find any accounting errors.")}
        state="success"
        links={[]}
        style={{ width: 600 }}
      />
    </BrowserRouter>
  </React.Fragment>
);

export const Error = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard
        title={text("title", "Heads up!")}
        message={text(
          "message",
          "We noticed a couple of flags related to your recharge accounting."
        )}
        state="error"
        links={[
          {
            title: "Fix URF Issues",
            link: "/recharge-accounting/water-slices/urfs",
          },
          {
            title: "Fix Splits Issues",
            link: "/recharge-accounting/water-slices/splits",
          },
          { title: "Fix Data Issues", link: "/recharge-accounting/data" },
        ]}
        illustration={ErrorIllustration}
        style={{ width: 700 }}
      />
    </BrowserRouter>
  </React.Fragment>
);

export const Playground = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard
        title={text("title", "Accounting Rollup")}
        message={text("message", "Some filler text about accounting")}
        state={select("state", stateOptions, "default")}
        links={object("links", links)}
        actions={object("actions", actions)}
        style={{ width: 600 }}
      />
    </BrowserRouter>
  </React.Fragment>
);

Playground.story = {
  parameters: {
    docs: {
      storyDescription:
        "You can explore the different props available to the RollupCard component by selecting the Playground story and selecting the Canvas tab.",
    },
  },
};
