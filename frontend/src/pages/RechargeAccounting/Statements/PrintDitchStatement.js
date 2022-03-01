import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, TableCell as MuiTableCell, TableContainer } from '@material-ui/core';

import logoCcwcd from '../../../images/ccwcd_logo.png';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { ordinal_suffix_of } from '../../../util';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  marginBottom: {
    marginBottom: '7px',
  },
  signature: {
    border: 0,
    borderBottom: '2px solid #000',
    width: '450px',
  },
  smallLineHeight: {
    lineHeight: 1.3,
  },
}));

const TableCell = styled(MuiTableCell)`
  font-size: 0.75rem;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const PrintDitchStatement = forwardRef(({ data, statementType }, ref) => {
  const classes = useStyles();

  // Accepts the array and key
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, Object.create(null)); // empty array is the initial value for result object
  };

  const Centered = ({ children }) => {
    return <div style={{ textAlign: 'center' }}>{children}</div>;
  };

  const monthLookup = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  let index = 0;
  return (
    <div ref={ref} style={{ pageBreakAfter: 'always' }}>
      {Object.entries(data).map(obj => {
        const item = groupBy(obj[1], 'op_quarter_mo');
        // console.log(item);
        index++;
        return (
          <Paper key={index} style={{ marginBottom: '20px', padding: '32px', pageBreakAfter: 'always' }}>
            <Centered>
              <Grid container justify={'space-between'} alignItems="center" className={classes.marginBottom}>
                <Grid item xs={2} style={{ textAlign: 'left' }}>
                  <img src={logoCcwcd} width="200" alt="CCWCD" />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5" style={{ fontWeight: 600 }}>
                    Central Colorado Water <br />
                    Conservancy District
                  </Typography>
                  <Typography variant="body2">Recharge Accretions Statement</Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                  {/*<img src={logoCcwcd} width="120" alt="LRE" />*/}
                </Grid>
              </Grid>
            </Centered>

            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="body2" className={classes.smallLineHeight}>
                  Statement Quarter:
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" className={classes.smallLineHeight}>
                  <strong>{ordinal_suffix_of(item[null][0].op_quarter)}</strong>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" className={classes.smallLineHeight}>
                  Statement Date:
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" className={classes.smallLineHeight}>
                  {moment().format('M/D/YYYY')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  CCWCD Pumping Season
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>
                    {item[null][0].op_year}-{+item[null][0].op_year + 1}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  Owner:
                </Typography>
              </Grid>
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <Typography variant="body2" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>{item[null][0].owner}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              <strong>Diversions</strong>
            </Typography>
            <Grid item className={classes.marginBottom}>
              <TableContainer component={Paper}>
                <Table aria-label="Roll over credits" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '60%' }} colSpan={3} align="center">
                        Month
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[1][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[2][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[3][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        (1) ‐ Total From River (Ac‐Ft)
                        <br />
                        Formula in (1) = (2) + (3)
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[1][0].total_from_river ? item[1][0].total_from_river.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[2][0].total_from_river ? item[2][0].total_from_river.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[3][0].total_from_river ? item[3][0].total_from_river.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        <strong>
                          {item[null][0].total_from_river ? item[null][0].total_from_river.toFixed(2) : 0}
                        </strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        (2) ‐ In‐Ditch (Ac‐Ft)
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[1][0].in_ditch_diversions ? item[1][0].in_ditch_diversions.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[2][0].in_ditch_diversions ? item[2][0].in_ditch_diversions.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[3][0].in_ditch_diversions ? item[3][0].in_ditch_diversions.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        <strong>
                          {item[null][0].in_ditch_diversions ? item[null][0].in_ditch_diversions.toFixed(2) : 0}
                        </strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        (3) ‐ Off‐Ditch (Ac‐Ft)
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[1][0].off_ditch_diversions ? item[1][0].off_ditch_diversions.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[2][0].off_ditch_diversions ? item[2][0].off_ditch_diversions.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[3][0].off_ditch_diversions ? item[3][0].off_ditch_diversions.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        <strong>
                          {item[null][0].off_ditch_diversions ? item[null][0].off_ditch_diversions.toFixed(2) : 0}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              <strong>Ditch Company's Off-Ditch Recharge Credits (Total for the Current Quarter)</strong>
            </Typography>
            <Grid item>
              <TableContainer component={Paper}>
                <Table aria-label="Roll over credits" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} style={{ width: '60%' }} align="center">
                        Month
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[1][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[2][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[3][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={1} colSpan={3} align="left">
                        (4) ‐ Ditch Company's Portion of Off‐Ditch Recharge
                        <br />
                        Credits Earned (Ac‐Ft)
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        {item[1][0].off_ditch_recharge_credits ? item[1][0].off_ditch_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        {item[2][0].off_ditch_recharge_credits ? item[2][0].off_ditch_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        {item[3][0].off_ditch_recharge_credits ? item[3][0].off_ditch_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        <strong>
                          {' '}
                          {item[null][0].off_ditch_recharge_credits
                            ? item[null][0].off_ditch_recharge_credits.toFixed(2)
                            : 0}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Typography
              variant="subtitle2"
              style={{ textAlign: 'center', fontWeight: 400 }}
              className={classes.marginBottom}
            >
              Ditch Company's Percentage of Pond Accretions Under the Ditch:{' '}
              <strong>{item[null][0].ownr_pct ? item[null][0].ownr_pct.toFixed(2) * 100 : 0}%</strong>
            </Typography>

            <Typography variant="body1" style={{ textAlign: 'center' }}>
              <strong>Ditch Company's In‐Ditch Recharge Credits (Totals for the Current Quarter)</strong>
            </Typography>
            <Grid item>
              <TableContainer component={Paper}>
                <Table aria-label="Roll over credits" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} style={{ width: '60%' }} align="center">
                        Month
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[1][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[2][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[3][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={1} colSpan={3} align="left">
                        (5) ‐ Ditch Company's Portion of In‐Ditch Recharge
                        <br />
                        Credits Earned (Ac‐Ft)
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        {item[1][0].in_ditch_recharge_credits ? item[1][0].in_ditch_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        {item[2][0].in_ditch_recharge_credits ? item[2][0].in_ditch_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        {item[3][0].in_ditch_recharge_credits ? item[3][0].in_ditch_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell rowSpan={2} colSpan={3} align="center">
                        <strong>
                          {' '}
                          {item[null][0].in_ditch_recharge_credits
                            ? item[null][0].in_ditch_recharge_credits.toFixed(2)
                            : 0}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Typography
              variant="subtitle2"
              style={{ textAlign: 'center', fontWeight: 400 }}
              className={classes.marginBottom}
            >
              Ditch Company's Percentage of In‐Ditch Accretions:{' '}
              <strong>{item[null][0].dtch_pct ? item[null][0].dtch_pct.toFixed(2) * 100 : 0}%</strong>
            </Typography>

            <Typography variant="body1" style={{ textAlign: 'center' }}>
              <strong>Total Recharge Credit (Totals for the Current Quarter)</strong>
            </Typography>
            <Grid item className={classes.marginBottom}>
              <TableContainer component={Paper}>
                <Table aria-label="Roll over credits" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} style={{ width: '60%' }} align="center">
                        Month
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[1][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[2][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {monthLookup[item[3][0].r_month]}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={1} colSpan={3} align="left">
                        (6) ‐ Ditch Company's Net Amount of Recharge from
                        <br />
                        Ponds and In‐Ditch Operations Under the Ditch [(6) =<br />
                        (5) + (4)] (Ac‐Ft)
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[1][0].total_recharge_credits ? item[1][0].total_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[2][0].total_recharge_credits ? item[2][0].total_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        {item[3][0].total_recharge_credits ? item[3][0].total_recharge_credits.toFixed(2) : 0}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        <strong>
                          {' '}
                          {item[null][0].total_recharge_credits ? item[null][0].total_recharge_credits.toFixed(2) : 0}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid container alignItems="center" style={{ color: 'red' }}>
              <Grid item xs={12} className={classes.marginBottom}>
                <Typography display="inline" variant="caption">
                  Pursuant to our agreement, you have the following options for your recharge credits:
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                  1. Consumptive use allowed for irrigation wells under your ditch:
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography display="inline" variant="body1">
                  <strong> {item[null][0].cu_allowed ? item[null][0].cu_allowed.toFixed(2) : 0}</strong>{' '}
                </Typography>
                <Typography display="inline" variant="caption">
                  acre-feet
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                  2. Value of credits Central will purchase from you ($40/AF):
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="body1">
                  <strong> ${item[null][0].credit_value_usd ? item[null][0].credit_value_usd.toFixed(2) : 0}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
              <Typography display="inline" variant="caption" className={classes.smallLineHeight}>
                The Ditch's selection needs to be communicated to Central within <strong>30</strong> days of receiving
                this form. Please keep the white copy for yourself and return the blue copy to Central with your Option
                circled below. If no response is received within the 30 days, all accretions credits accounted for in
                this statement will revert to Central.
              </Typography>
            </Grid>

            <Grid container alignItems="center">
              <Grid item xs={1}>
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                  Option:
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>1</strong>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>2</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={2}>
                {' '}
              </Grid>
              <Grid item xs={2} className={classes.marginBottom} style={{ display: 'flex', justifyContent: 'end' }}>
                <Typography variant="caption">Signature:</Typography>
              </Grid>
              <Grid item xs={8} className={classes.marginBottom}>
                <input type="text" className={classes.signature} />
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={2}>
                {' '}
              </Grid>
              <Grid item xs={2} className={classes.marginBottom} style={{ display: 'flex', justifyContent: 'end' }}>
                <Typography variant="caption">Title:</Typography>
              </Grid>
              <Grid item xs={8} className={classes.marginBottom}>
                <input type="text" className={classes.signature} />
              </Grid>
            </Grid>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Typography variant="caption">
                If you have any questions or concerns, please contact Ruthanne Schafer or Lynn Kramer at 970-330-4540
              </Typography>
            </div>
          </Paper>
        );
      })}
    </div>
  );
});

export default PrintDitchStatement;
