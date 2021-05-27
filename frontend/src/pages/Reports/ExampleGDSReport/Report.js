import React from 'react';
import { Box, Container } from '@material-ui/core';
import Layout from '../../../components/Layout';
import DataStudioEmbed from '../../../components/DataStudioEmbed/DataStudioEmbed';

const ExampleGDSReport = props => {
  return (
    <Layout>
      <Box marginTop={6} marginBottom={3} width="100%">
        <Container maxWidth="xl">
          <DataStudioEmbed
            title="GDS Test Report"
            src="https://datastudio.google.com/embed/reporting/0faad57b-bd1d-463d-9dcb-1cb308acf050/page/aws5B"
            width="100%"
            height={1250}
            frameBorder={0}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default ExampleGDSReport;
