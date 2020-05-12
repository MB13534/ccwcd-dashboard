import React from "react";
import { addDecorator } from "@storybook/react";
import { Box, Paper } from "@material-ui/core";

addDecorator((storyFn) => (
  <Box padding="20px" maxWidth="100%">
    {storyFn()}
  </Box>
));
