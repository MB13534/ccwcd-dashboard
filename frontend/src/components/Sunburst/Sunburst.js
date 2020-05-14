import React from "react";
import PropTypes from "prop-types";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { Flex } from "../Flex";
import { schemeDark2 } from "d3-scale-chromatic";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Sunburst = ({ data, categoryField, valueField }) => {
  const classes = useStyles();

  return (
    <div>
      <Box width="100%" height={275} marginBottom={2}>
        <ResponsiveSunburst
          data={data}
          margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
          identity={categoryField}
          value={valueField}
          cornerRadius={0}
          borderWidth={1.5}
          borderColor="white"
          colors={{ scheme: "dark2" }}
          childColor={{ from: "color" }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
        />
      </Box>

      {data.length !== 0 && data.children.length > 0 && (
        <Flex justifyContent="center">
          {data.children.map((d, i) => (
            <Flex key={d.name}>
              <Box
                bgcolor={schemeDark2[i]}
                width={25}
                height={10}
                borderRadius={4}
                marginRight={1}
              ></Box>
              <Box marginRight={2}>{d.name}</Box>
            </Flex>
          ))}
        </Flex>
      )}
    </div>
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
