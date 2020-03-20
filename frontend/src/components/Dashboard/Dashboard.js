import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../Chart/Chart';
import TransactionSummary from '../TransactionSummary/TransactionSummary';
import Input from '../Input/Input';
import Examples from '../Examples/Examples';


const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 160,
  },
  bigHeight: {
    height: 440,
  },
  graph: {
    padding: 0,
    height: '90vh',
  },

}));

export default function Dashboard() {
  const classes = useStyles();
  console.log(classes)
  const [transactionID, setTransactionID] = React.useState('');
  const [transactionData, setTransactionData] = React.useState('');
  const [loaded, setLoaded] = React.useState(false);
  const [graphLoaded, setGraphLoaded] = React.useState(false);

  const getTransactionID = (e, transID) => {
    e.preventDefault();
    setTransactionID(transID);
    setLoaded(true);
  }

  const propegateGraphData = (data) => {
    setTransactionData(data);
    setGraphLoaded(true);
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const bigHeightPaper = clsx(classes.paper, classes.bigHeight);
  const graph = clsx(classes.paper, classes.graph);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>

          {/* Input */}
          <Grid item xs={12} md={7} lg={7}>
            <Paper className={fixedHeightPaper}>
              <Input getTransactionID={getTransactionID} />
            </Paper>
          </Grid>

          {/* Examples */}
          <Grid item xs={12} md={5} lg={5}>
            <Paper className={fixedHeightPaper}>
              <Examples getTransactionID={getTransactionID}/>
            </Paper>
          </Grid>

          { loaded && // Info
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={bigHeightPaper}>
                <TransactionSummary transactionID={transactionID} propegateGraphData={propegateGraphData} />
              </Paper>
            </Grid>
          }

          { graphLoaded && // Chart
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={graph}>
                <Chart transaction={transactionData.transaction}/>
              </Paper>
            </Grid>
          }

        </Grid>
      </Container>
    </main>
  );
}