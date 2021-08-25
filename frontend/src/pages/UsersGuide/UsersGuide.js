import React from 'react';
import { Box, Container } from '@material-ui/core';
import Layout from '../../components/Layout';
import DataStudioEmbed from '../../components/DataStudioEmbed/DataStudioEmbed';

const UsersGuide = props => {
  return (
    <Layout>
      <Box marginTop={6} marginBottom={3} width="100%">
        <Container maxWidth="xl">
          <DataStudioEmbed
            title="Users' Guide"
            src="https://docs.google.com/presentation/d/1XxoBuix5VZEEscoE291VU8L6osEiyDj2PjSwBcc_pTc/embed?start=true&loop=false&delayms=60000"
            width="95%"
            height={750}
            frameBorder={0}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default UsersGuide;
