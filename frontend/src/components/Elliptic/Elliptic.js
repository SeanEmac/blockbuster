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
              What is blockbuster
            </Typography>

            <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              Blockbuster is...
            </Typography>

            </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
            
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              How does it work

            </Typography>

            <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              Press this button
              <BubbleChartIcon />
            </Typography>

            </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
            
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
              What is the Elliptic Data set
            </Typography>

            <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              This is a description of the Elliptic Dataset
              
              <br></br><br></br>

              <a href="https://www.elliptic.co/">Elliptic</a>
            </Typography>

            </Paper>
        </Grid>

        </Grid>
      </Container>
    </main>
  );
}