import React from "react";
import PropTypes from "prop-types";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Box } from "@material-ui/core";
import { Flex } from "../Flex";
import { schemeDark2 } from "d3-scale-chromatic";

const Sunburst = ({ data, width = "100%", height = 275, ...other }) => {
  return (
    <div>
      <Box width={width} height={height} marginBottom={2}>
        <ResponsiveSunburst
          data={data}
          margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
          identity="name"
          value="value"
          cornerRadius={0}
          borderWidth={1.5}
          borderColor="white"
          colors={{ scheme: "dark2" }}
          childColor={{ from: "color" }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
          {...other}
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
   * Optional width for the chart
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Optional height for the chart
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Sunburst;
