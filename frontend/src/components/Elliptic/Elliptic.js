import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

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
    height: '100%',
  },
}));


export default function Elliptic() {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          
          
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              What is Blockbuster?
            </Typography>

            <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              Blockbuster is a tool to help security analysts investigate Bitcoin transactions.
              The Bitcoin blockchain is open source and everything contained within it is available to the public.
              The aim of Blockbuster is to extract and display meaningful information from the blockchain.
              <br></br><br></br>

              This app uses third party APIs and datasets to construct a network around the given input.
              The network is drawn and machine learning predictions are made using random forest decision trees.

            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              How does it work?
            </Typography>
            
            <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              To get started, head to the Dashboard page by clicking the <BubbleChartIcon /> button on the left navbar.
              <br></br><br></br>

              Search for your own transaction, or choose one of the examples provided.
              <br></br><br></br>
              When the search has been completed, you will be presented with some details about the transaction such as:
              <ul>
                <li>If the transaction is in our database</li>
                <li>If the transaction is predicted to be Fraudulent or Licit.</li>
                <li>Amount of Bitcoin spent in the transaction</li>
                <li>Fees paid by the sender</li>
                <li>Input and output Addresses</li>
              </ul>

              You can interact with the graph by clicking & scrolling.
              <br></br><br></br>

              Fraud transactions appear in red, Licit in green and Unknown in grey.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              What is the Elliptic Data set?
            </Typography>

            <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              The dataset used in this project is taken from a Cyber Security company called <a href="https://www.elliptic.co/">Elliptic.</a>
              <br></br><br></br>
              The dataset contains 200,000 partially labelled Bitcoin transactions with over 150 features.
              Due to intellectual property issues, the features have been anonymised, but we can still use
              the data set to make general predictions.
            </Typography>

          </Paper>
        </Grid>

        </Grid>
      </Container>
    </main>
  );
}