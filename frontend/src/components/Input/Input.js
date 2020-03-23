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
          defaultValue = "4ce18f49ba153a51bcda9bb80d7f978e3de6e81b5fc326f00465464530c052f4"
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