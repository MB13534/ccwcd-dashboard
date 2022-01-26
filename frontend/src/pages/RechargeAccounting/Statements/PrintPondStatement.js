import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider, Avatar, TableCell, TableContainer } from '@material-ui/core';

import logoCcwcd from '../../../images/ccwcd_logo.png';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginLeft: '20px',
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 17,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    display: 'flex',
  },
  avatarSelection: {
    marginLeft: '20px',
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 17,
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `3px solid ${theme.palette.primary.main}`,
    marginRight: theme.spacing(1),
    display: 'flex',
    fontWeight: 'bold',
  },
  marginBottom: {
    marginBottom: '13px',
  },
  signature: {
    border: 0,
    borderBottom: '2px solid #000',
    width: '250px',
  },
  tableFont: {
    fontSize: '10px',
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
                  <img src={logoCcwcd} width="120" alt="CCWCD" />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">Central Colorado Water Conservancy District</Typography>
                  <Typography variant="h6">Recharge Accretions Statement</Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                  <img src={logoCcwcd} width="120" alt="LRE" />
                </Grid>
              </Grid>
            </Centered>
            <Divider />
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="subtitle1">Statement Quarter</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">{item.op_quarter}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Statement Date</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">{moment().format('MM/D/YYYY')}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">CCWCD Pumping Season</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {item.op_year}-{+item.op_year + 1}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Owner</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">{item.owner}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center">
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1">Owner's Percentage of Accretions (Set from Agreement)</Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">{item.ownr_pct ? item.ownr_pct.toFixed(2) * 100 : 0}%</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1">Gross Diversions to Pond (Current Quarter)</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle2">
                  {item.quarterly_gross_diversions ? item.quarterly_gross_diversions.toFixed(2) : 0} AF
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1">YTD Gross Diversions to Pond (Through Current Month)</Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  {item.ytd_gross_diversions ? item.ytd_gross_diversions.toFixed(2) : 0} AF
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle1">Owner's Net Amount to Recharge (Current Quarter)</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle2">
                  {item.quarterly_ownr_net_recharge ? item.quarterly_ownr_net_recharge.toFixed(2) : 0} AF
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1">YTD Owner's Net Amount to Recharge </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  {item.ytd_ownr_net_recharge ? item.ytd_ownr_net_recharge.toFixed(2) : 0} AF
                </Typography>
              </Grid>
            </Grid>
            <Typography display="inline" variant="h6">
              Options{' '}
            </Typography>
            <Typography display="inline" variant="caption">
              <em>Pursuant to our agreement, you have the following options for your recharge credits.</em>
            </Typography>
            <Divider style={{ marginBottom: '4px' }} />
            <Grid container alignItems="center">
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatar}>1</Avatar> Value of credits Central will purchase from you
                  ($40/AF):
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  ${item.credit_value_usd ? item.credit_value_usd.toFixed(2) : 0}
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatar}>2</Avatar> Additional pumping allowed, current quota season:
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  {item.quarterly_ownr_net_recharge ? item.quarterly_ownr_net_recharge.toFixed(2) : 0} AF
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom} style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar className={classes.avatar}>3</Avatar>
                <Typography variant="subtitle1" style={{ lineHeight: '1.3' }}>
                  Assign or sell credits to another Central member per recharge agreement within{' '}
                  <strong>30 days</strong>
                  (must fill out a recharge trading card <br /> and be approved by Central). Tradeable Consumptive Use:
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  {item.quarterly_ownr_net_recharge ? item.quarterly_ownr_net_recharge.toFixed(2) : 0} AF
                </Typography>
              </Grid>

              <Grid item xs={8} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', lineHeight: '1.3' }}>
                  <Avatar className={classes.avatar}>4</Avatar>
                  Roll over credits to the following quota season according to Recharge Policy
                </Typography>
              </Grid>
              <Grid item xs={4} className={classes.marginBottom}>
                {' '}
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                {' '}
              </Grid>
              <Grid item className={classes.marginBottom}>
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
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatar}>5</Avatar> Request to use credits in an external supply plan{' '}
                </Typography>
              </Grid>
            </Grid>

            <Typography display="inline" variant="h6">
              Acknowledgement{' '}
            </Typography>
            <Typography display="inline" variant="caption">
              <em>
                The Owner's selection needs to be communicated to Central within 30 days of receiving this form. If no
                response is received within the <strong>30 days</strong>, all accretions credits accounted for in this
                statement will revert to Central.
              </em>
            </Typography>
            <Divider style={{ marginBottom: '4px' }} />
            <Grid container alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  Select an Option
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatarSelection}>1</Avatar>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatarSelection}>2</Avatar>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatarSelection}>3</Avatar>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatarSelection}>4</Avatar>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatarSelection}>5</Avatar>
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: '10px' }}>
              <Grid item xs={6} className={classes.marginBottom}>
                <Typography display="inline" variant="subtitle1">
                  Signature <input type="text" className={classes.signature} />
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.marginBottom}>
                <Typography display="inline" variant="subtitle1">
                  Date <input type="text" className={classes.signature} />
                </Typography>
              </Grid>
            </Grid>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Typography variant="caption">
                ** If you have any questions or concerns, please contact Billy Mihelich or Lynn Kramer at 970-330-4540
                **
              </Typography>
            </div>
          </Paper>
        );
      })}
    </div>
  );
});

export default PrintPondStatement;
