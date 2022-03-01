import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, TableCell, TableContainer } from '@material-ui/core';

import logoCcwcd from '../../../images/ccwcd_logo.png';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { ordinal_suffix_of } from '../../../util';

const useStyles = makeStyles(theme => ({
  marginBottom: {
    marginBottom: '13px',
  },
  signature: {
    border: 0,
    borderBottom: '2px solid #000',
    width: '525px',
  },
  tableFont: {
    fontSize: '10px',
  },
  smallLineHeight: {
    lineHeight: 1.3,
  },
}));

const PrintPondStatement = forwardRef(({ data, statementType }, ref) => {
  const classes = useStyles();

  const Centered = ({ children }) => {
    return <div style={{ textAlign: 'center' }}>{children}</div>;
  };

  return (
    <div ref={ref} style={{ pageBreakAfter: 'always' }}>
      {data.map((item, index) => {
        return (
          <Paper key={index} style={{ marginBottom: '20px', padding: '32px', pageBreakAfter: 'always' }}>
            <Centered>
              <Grid container justify={'space-between'} alignItems="center">
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
            <br />
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  Statement Quarter
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  <strong>{ordinal_suffix_of(item.op_quarter)}</strong>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  Statement Date:
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  {moment().format('M/D/YYYY')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  CCWCD Pumping Season:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>
                    {item.op_year}-{+item.op_year + 1}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  Owner:
                </Typography>
              </Grid>
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>{item.owner}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  Owner's Percentage of Accretions (Set from Agreement)=
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>{item.ownr_pct ? item.ownr_pct.toFixed(2) * 100 : 0}%</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  Gross Diversions to Pond (Current Quarter)=
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  <strong>{item.quarterly_gross_diversions ? item.quarterly_gross_diversions.toFixed(2) : 0}</strong>{' '}
                  acre feet
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  YTD Gross Diversions to Pond (Through Current Month)=
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong> {item.ytd_gross_diversions ? item.ytd_gross_diversions.toFixed(2) : 0}</strong> acre feet
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  Owner's Net Amount to Recharge (Current Quarter)=
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={classes.smallLineHeight}>
                  <strong> {item.quarterly_ownr_net_recharge ? item.quarterly_ownr_net_recharge.toFixed(2) : 0}</strong>{' '}
                  acre feet
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  YTD Owner's Net Amount to Recharge{' '}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong> {item.ytd_ownr_net_recharge ? item.ytd_ownr_net_recharge.toFixed(2) : 0}</strong> acre feet
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  display="inline"
                  variant="subtitle1"
                  className={`${classes.smallLineHeight} ${classes.marginBottom}`}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <em>Pursuant to our agreement, you have the following options for your recharge credits:</em>
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <Typography
                  variant="subtitle1"
                  className={`${classes.smallLineHeight} ${classes.marginBottom}`}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  1. Value of credits Central will purchase from you ($40/AF)=
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>${item.credit_value_usd ? item.credit_value_usd.toFixed(2) : 0}</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="subtitle1"
                  className={`${classes.smallLineHeight} ${classes.marginBottom}`}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  2. Additional pumping allowed, current quota season
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>{item.quarterly_ownr_net_recharge ? item.quarterly_ownr_net_recharge.toFixed(2) : 0}</strong>{' '}
                  acre feet
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  3. Assign or sell credits to another Central member per recharge agreement within{' '}
                  <strong>30 days</strong> <br /> (must fill out a recharge trading card and be approved by Central).
                </Typography>
              </Grid>
              <Grid
                item
                xs={9}
                className={classes.smallLineHeight}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  Tradeable Consumptive Use:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                  <strong>{item.quarterly_ownr_net_recharge ? item.quarterly_ownr_net_recharge.toFixed(2) : 0}</strong>{' '}
                  acre feet
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  4. Roll over credits to the following quota season according to Recharge Policy
                </Typography>
              </Grid>
              <Grid item xs={3}>
                {' '}
              </Grid>
              <Grid item className={`${classes.smallLineHeight} ${classes.marginBottom}`}>
                <TableContainer component={Paper} className={classes.tableFont}>
                  <Table aria-label="Roll over credits" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" style={{ fontSize: '13px' }}>
                          Quarter
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '13px' }}>
                          Rollover Percentage
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" style={{ fontSize: '12px' }}>
                          1 (April ‐ June)
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '12px' }}>
                          0%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" style={{ fontSize: '12px' }}>
                          2 (July ‐ Sept)
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '12px' }}>
                          20%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" style={{ fontSize: '12px' }}>
                          3 (Oct ‐ Dec)
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '12px' }}>
                          40%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" style={{ fontSize: '12px' }}>
                          4 (Jan ‐ March)
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: '12px' }}>
                          60%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="subtitle1"
                  style={{ display: 'flex', alignItems: 'center' }}
                  className={`${classes.smallLineHeight} ${classes.marginBottom}`}
                >
                  5. Request to use credits in an external supply plan.
                </Typography>
              </Grid>
            </Grid>

            <Typography
              display="inline"
              variant="subtitle1"
              className={`${classes.smallLineHeight} ${classes.marginBottom}`}
            >
              The Owner's selection needs to be communicated to Central within 30 days of receiving this form. If no
              response is received within the <strong>30 days</strong>, all accretions credits accounted for in this
              statement will revert to Central.
            </Typography>
            <Grid container alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  Option:
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>1</strong>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>2</strong>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>3</strong>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>4</strong>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>5</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography display="inline" variant="subtitle1">
                  Signature:
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <input type="text" className={classes.signature} />
              </Grid>
            </Grid>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Typography variant="body2">
                If you have any questions or concerns, please contact Ruthanne Schafer or Lynn Kramer at 970-330-4540
              </Typography>
            </div>
          </Paper>
        );
      })}
    </div>
  );
});

export default PrintPondStatement;
