import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box, Chip } from '@material-ui/core';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import NoSelectionsIllustrations from '../../../images/undraw_setup_wizard_r6mr.svg';
import { Flex } from '../../../components/Flex';

import FormSnackbar from '../../../components/FormSnackbar';

import SearchableList from '../../../components/SearchableList';

import AssociationControls from '../../DatabaseManagement/StructuresMeasurementsAssoc/AssociationControls';
import ContractsListForExternalPlansManagementTable from './ContractsListForExternalPlansManagementTable';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

const ContractsExternalPlansAssoc = () => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const { getTokenSilently } = useAuth0();
  const [ExternalPlans] = useFetchData('members-management/external-plans/list-external-aug-plans', [refreshSwitch]);
  const [Contracts] = useFetchData(
    `members-management/external-plans/contracts-list-for-external-plans-management`,
    []
  );
  const [Associations] = useFetchData(`members-management/external-plans/assoc-external-plans-to-contracts`, [
    refreshSwitch,
  ]);

  const currentYear = new Date().getFullYear();

  const FilteredAssociations = useMemo(() => {
    return Associations.filter(item => item.op_year === currentYear && !item.invalid);
  }, [Associations, currentYear]);

  const [activeExternalPlan, setActiveExternalPlan] = useState({});
  const [associatedContracts, setAssociatedContracts] = useState([]);
  const { setWaitingState, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();

  /**
   * Logic used to pre-populate the structure association checkboxes
   * with the existing associations for the active user
   * Logic runs whenever the associations data updates or whenever
   * the active user changes
   */
  useEffect(() => {
    const activeAssociations = FilteredAssociations.filter(d => activeExternalPlan.plan_index === d.plan_index).map(
      d => d.contract_index
    );
    if (activeAssociations.length > 0 && activeAssociations[0] !== null) {
      setAssociatedContracts(activeAssociations);
    } else {
      setAssociatedContracts([]);
    }
  }, [FilteredAssociations, activeExternalPlan, refreshSwitch]);

  const handleRefresh = () => {
    setRefreshSwitch(state => !state);
  };

  /**
   * Event handler for selecting a user from the users list
   * @param {object} externalPlan selected user
   */
  const handleExternalPlansSelect = externalPlan => {
    setAssociatedContracts([]);
    setActiveExternalPlan(externalPlan);
  };

  /**
   * Event handler for when the user checks a structure on/off
   * from the structure associations component
   */
  const handleContractSelect = (rowData, row) => {
    const value = row.contract_index;
    const checked = row.tableData.checked;
    setAssociatedContracts(prevState => {
      let newValues = [...prevState];
      if (checked) {
        newValues.push(+value);
      } else {
        const index = newValues.indexOf(+value);
        newValues.splice(index, 1);
      }
      return newValues;
    });
  };

  /**
   * Event handle for de-selecting all structures
   */
  const handleSelectNone = () => setAssociatedContracts([]);

  /**
   * Event handler for selecting all structures
   */
  const handleSelectAll = () => setAssociatedContracts(Contracts.map(d => d.contract_index));

  /**
   * Utility function used to merge the active user
   * with the associated structures
   * Used to prep the data and return an object in the required
   * format for the API to update/insert associations
   */
  //

  const prepareValues = () => {
    const currentFilteredAssociations = Associations.filter(
      fa => fa.plan_index === activeExternalPlan.plan_index && fa.op_year === currentYear
    ).map(item => item.contract_index);

    const currentRecords = currentFilteredAssociations.filter(item => associatedContracts.includes(item));

    const newRecords = associatedContracts.filter(item => !currentFilteredAssociations.includes(item));

    return {
      //records that currently exist that will be updated
      currentRecords: currentRecords,
      //updates that do not yet exist that will be created
      newRecords: newRecords.map(record => {
        return {
          plan_index: activeExternalPlan.plan_index,
          op_year: currentYear,
          contract_index: record,
          invalid: false,
        };
      }),
    };
  };

  /**
   * Event handler for saving user/structure associations
   * to the database
   */
  const handleSubmit = () => {
    // Set up a cancellation source
    let didCancel = false;
    setWaitingState('in progress');
    async function writeData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { Authorization: `Bearer ${token}` };

        await axios.put(
          `${process.env.REACT_APP_ENDPOINT}/api/members-management/external-plans/assoc-external-plans-to-contracts/${currentYear}/${activeExternalPlan.plan_index}`,
          prepareValues(),
          { headers }
        );
        if (!didCancel) {
          // Ignore if we started fetching something else
          console.log('success');
          setWaitingState('complete', 'no error');
          handleRefresh();
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
          setWaitingState('complete', 'error');
        }
        didCancel = true;
      }
    }
    writeData();
  };

  return (
    <div className={classes.content}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5}>
          <SearchableList
            title=""
            data={ExternalPlans}
            valueField="plan_index"
            displayField="plan_name"
            active={activeExternalPlan}
            onClick={handleExternalPlansSelect}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box marginTop={2} width="100%">
            <Flex>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Manage Contracts Associations:
              </Typography>

              {activeExternalPlan.plan_name && (
                <Box marginTop={2} marginBottom={2} marginLeft={2}>
                  <Chip label={activeExternalPlan.plan_name} />
                </Box>
              )}
            </Flex>

            {activeExternalPlan.plan_name && (
              <AssociationControls
                handleSave={handleSubmit}
                handleSelectAll={handleSelectAll}
                handleSelectNone={handleSelectNone}
              />
            )}

            {activeExternalPlan.plan_name ? (
              <ContractsListForExternalPlansManagementTable
                selections={associatedContracts}
                onCheck={handleContractSelect}
                refreshSwitch={refreshSwitch}
              />
            ) : (
              <>
                <Typography variant="body1" paragraph>
                  Please select an external plan from the external plans list to associate them with contracts.
                </Typography>
                <Box maxWidth={300} marginLeft="auto" marginRight="auto" marginTop={4}>
                  <img src={NoSelectionsIllustrations} alt="No Selections" style={{ maxWidth: '100%' }} />
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Associations successfully saved."
        errorMessage="Associations could not be saved."
      />
    </div>
  );
};

export default ContractsExternalPlansAssoc;
