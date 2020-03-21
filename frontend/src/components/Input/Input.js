import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Input = (props)  => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Search for a transaction:
      </Typography>
      <form onSubmit={e => props.getTransactionID(e, e.target.transactionID.value)}>
        <TextField
          id = "filled-full-width"
          label = "Transaction ID"
          name = "transactionID"
          style = {{ margin: 8 }}
          defaultValue = "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da"
          helperText = "Enter a Bitcoin transaction ID"
          fullWidth
          margin = "normal"
          InputLabelProps = {{
            hrink: "true",
          }}
        />
      </form>
    </React.Fragment>
  )
}

export default Input;