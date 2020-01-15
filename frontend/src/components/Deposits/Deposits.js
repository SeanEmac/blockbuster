import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Transaction Amount</Title>

      <Typography component="p" variant="h4">
        B 1.456
      </Typography>

      <Typography color="textSecondary" className={classes.depositContext}>
        Date: 15 March, 2019
      </Typography>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          This is a link
        </Link>
      </div>

    </React.Fragment>
  );
}