import React from "react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { CssBaseline, Box } from "@material-ui/core";
import Sunburst from "./Sunburst";

export default {
  title: "Components/Sunburst",
  parameters: {
    component: Sunburst,
    componentSubtitle:
      "Component for rendering a basic sunburst chart. The chart is based off of the Nivo Sunburst (https://nivo.rocks/sunburst/) and all props that are valid for the Nivo chart are valid for this component as well.",
  },
  decorators: [
    (storyFn) => (
      <Box width="100%" padding={4}>
        {storyFn()}
      </Box>
    ),
    withKnobs,
  ],
};

const DummyData = [
  {
    id: 1,
    split: "WAS",
    project: "Proj1",
    structure: "Struct1",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "WAS",
    project: "Proj2",
    structure: "Struct2",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "WAS",
    project: "Proj3",
    structure: "Struct3",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "GMS",
    project: "Proj1",
    structure: "Struct1",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "GMS",
    project: "Proj2",
    structure: "Struct2",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "GMS",
    project: "Proj3",
    structure: "Struct3",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "Ditch",
    project: "Proj1",
    structure: "Struct1",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "Ditch",
    project: "Proj2",
    structure: "Struct2",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "Ditch",
    project: "Proj3",
    structure: "Struct3",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "Owner",
    project: "Proj1",
    structure: "Struct1",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "Owner",
    project: "Proj2",
    structure: "Struct2",
    value: Math.random() * 555,
  },
  {
    id: 1,
    split: "Owner",
    project: "Proj3",
    structure: "Struct3",
    value: Math.random() * 555,
  },
];

function formatSunburstData(data, splits) {
  return {
    name: "CCWCD",
    children: splits.map((split) => ({
      name: split,
      children: data
        .filter((d) => d.split === split)
        .map((d) => ({
          name: d.project,
          children: data
            .filter((dd) => dd.split === split && dd.project === d.project)
            .map((dd) => ({
              name: dd.structure,
              value: dd.value,
            })),
        })),
    })),
  };
}

const splits = ["GMS", "WAS", "Ditch", "Owner"];

export const Default = () => (
  <React.Fragment>
    <CssBaseline />
    <Sunburst data={formatSunburstData(DummyData, splits)} />
  </React.Fragment>
);
