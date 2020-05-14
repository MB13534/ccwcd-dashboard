import React from "react";
import PropTypes from "prop-types";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Sunburst = ({ data, categoryField, valueField }) => {
  const classes = useStyles();

  return (
    <Box width="100%" height={400}>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        identity={categoryField}
        value={valueField}
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors={{ scheme: "dark2" }}
        childColor={{ from: "color" }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
      />
    </Box>
  );
};

Sunburst.propTypes = {
  /**
   * Data in the required format for a nivo sunburst chart.
   * See https://nivo.rocks/sunburst
   */
  data: PropTypes.object.isRequired,
  /**
   * Name of the field that contains the sunburst slice category
   */
  categoryField: PropTypes.string.isRequired,
  /**
   * Name of the field that contains teh sunburst slice value
   */
  valueField: PropTypes.string.isRequired,
};

export default Sunburst;
