import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider, Avatar, TableCell, TableContainer } from '@material-ui/core';

// import logoCcwcd from '../../../images/ccwcd_logo.png';
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
  title: {
    border: 0,
    borderBottom: '2px solid #000',
    width: '630px',
  },
}));

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
              <Grid container justify={'space-between'} alignItems="center">
                <Grid item xs={2} style={{ textAlign: 'left' }}>
                  {/*<img src={logoCcwcd} width="120" alt="CCWCD" />*/}
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">Central Colorado Water Conservancy District</Typography>
                  <Typography variant="h6">Recharge Accretions Statement</Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                  {/*<img src={logoCcwcd} width="120" alt="LRE" />*/}
                </Grid>
              </Grid>
            </Centered>
            <Divider />
            <Grid item className={classes.marginBottom}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Statement Quarter</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle2">{item[null][0].op_quarter}</Typography>
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
                    {item[null][0].op_year}-{+item[null][0].op_year + 1}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Owner</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2">{item[null][0].owner}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Typography display="inline" variant="h6">
              Diversions
            </Typography>
            <Grid item className={classes.marginBottom}>
              <TableContainer component={Paper}>
                <Table aria-label="Roll over credits" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '60%' }} colSpan={3} align="left">
                        {''}
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
                        In-Ditch AF
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
                        Off-Ditch AF
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
                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        Total From River AF
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Typography display="inline" variant="h6">
              Ditch Company's Recharge Credits
            </Typography>
            <Grid item className={classes.marginBottom}>
              <TableContainer component={Paper}>
                <Table aria-label="Roll over credits" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} style={{ width: '60%' }} align="left">
                        {''}
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
                        Ditch's Portion of In-Ditch Recharge Credits Earned AF
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
                    <TableRow>
                      <TableCell rowSpan={1} colSpan={2} align="left">
                        Ditch's Percentage of In-Ditch Accretions:
                      </TableCell>
                      <TableCell rowSpan={1} colSpan={1} align="center">
                        <strong>{item[null][0].dtch_pct ? item[null][0].dtch_pct.toFixed(2) * 100 : 0}%</strong>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell rowSpan={1} colSpan={3} align="left">
                        Ditch's Portion of Off-Ditch Recharge Credits Earned AF
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
                    <TableRow>
                      <TableCell rowSpan={1} colSpan={2} align="left">
                        Ditch's Percentage of Pond Accretions Under the Ditch:
                      </TableCell>
                      <TableCell rowSpan={1} colSpan={1} align="center">
                        <strong>{item[null][0].ownr_pct ? item[null][0].ownr_pct.toFixed(2) * 100 : 0}%</strong>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        Ditch's Net Amount of Total Recharge Credits from Ponds and In-Ditch Operations Under the Ditch
                        AF
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
                  <Avatar className={classes.avatar}>1</Avatar> Consumptive use allowed for irrigation wells under your
                  ditch:
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  {item[null][0].cu_allowed ? item[null][0].cu_allowed.toFixed(2) : 0}
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.marginBottom}>
                <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatar}>2</Avatar> Value of credits Central will purchase from you
                  ($40/AF):
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.marginBottom}>
                <Typography variant="subtitle2">
                  ${item[null][0].credit_value_usd ? item[null][0].credit_value_usd.toFixed(2) : 0}
                </Typography>
              </Grid>
            </Grid>

            <Typography display="inline" variant="h6">
              Acknowledgement{' '}
            </Typography>
            <Typography display="inline" variant="caption">
              <em>
                The Ditch's selection needs to be communicated to Central within 30 days of receiving this form. If no
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
              <Grid item xs={12} className={classes.marginBottom}>
                <Typography display="inline" variant="subtitle1">
                  Title <input type="text" className={classes.title} />
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

export default PrintDitchStatement;
