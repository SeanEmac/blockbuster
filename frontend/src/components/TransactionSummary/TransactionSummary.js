import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: '100%',
  },
  cell : {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(224, 224, 224, 1)',
  },
}));

const createInputOutputTable = (onClick, open, title, inputs) => {
  return <div>
    <ListItem button onClick={onClick}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography> 
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>

    <Collapse in={open} timeout="auto" unmountOnExit>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Bitcoin Amount</TableCell>
            <TableCell>Spent?</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {inputs.map(input => (
            <TableRow key={input.address}>
              <TableCell>{input.address}</TableCell>
              <TableCell>{toBTC(input.satoshis)}</TableCell>
              <TableCell>{input.spent? "Yes": "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Collapse>
  </div>
}

const getAvgDegree = (transaction, type) => {
  let sum = 0
  let counter = 0;

  sum += transaction[type].length

  transaction.inputs.forEach(inp => {
    counter++;
    sum += inp.transaction[type].length
  });

  transaction.outputs.forEach(out => {
    counter++
    if(out.spent) sum += out.transaction[type].length
  });

  let avg = sum / counter
  return avg
}

const getMessage = (fraudCode) => {
  switch(fraudCode) {
    case 1:
      return <Alert severity="error">
          This transaction was present in the Elliptic dataset and is known to be Fraudulent
        </Alert>
    case 2:
      return <Alert severity="success">
          This transaction was present in the Elliptic dataset and is known to be safe
        </Alert>
    case 3:
      return <Alert severity="warning">
          This transaction was present in the Elliptic dataset and was classified as Fraudulent
        </Alert>
    case 4:
      return <Alert severity="success">
          This transaction was present in the Elliptic dataset and was classified as safe
        </Alert>
    default:
      return <Alert severity="info">
          This transaction was not present in the Elliptic data set, no extra info can be gathered
        </Alert>
  }
}

const toBTC = (satoshi) => {
  let sat = Math.round((satoshi + Number.EPSILON) * 100) / 100
  return sat / 100000000 + " BTC" 
}

const TransactionSummary = (props)  => {
  const classes = useStyles()
  const [transaction, setTransaction] = useState();
  const [inputOpen, setInputOpen] = React.useState(false);
  const [outputOpen, setOutputOpen] = React.useState(false);
  
  useEffect(() => {
    fetchData(props.transactionID);
  }, [props.transactionID]);

  async function fetchData(trans) {
    if (trans !== "") {
      const res = await fetch('http://127.0.0.1:8000/api/transaction/' + trans)
      // setTransaction(dummy.transaction)
      // props.propegateGraphData(dummy)
      res
        .json()
        .then(res => {
          console.log(res)
          // Set the json response
          setTransaction(res.transaction)
          // Send the data to the Chart component
          props.propegateGraphData(res)
      })
    }
  }

  const handleInputClick = () => {
    setInputOpen(!inputOpen);
  };

  const handleOutputClick = () => {
    setOutputOpen(!outputOpen);
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Transaction details:
      </Typography>
      {/* This will only render when we have gotten a response */}
      { transaction && transaction.hash &&
        <React.Fragment>
          {/* <Typography component="p" variant="body1" color="textPrimary" align="left" paragraph>
              {getMessage(transaction.fraud)}
          </Typography> */}
          {getMessage(transaction.fraud)}
          <Table className={classes.table} size="small">
            <TableBody>
                <TableRow>
                  <TableCell>Hash</TableCell>
                  <TableCell colSpan={5}>{transaction.hash}</TableCell>

                  <TableCell className={classes.cell}>Date</TableCell>
                  <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Block Height</TableCell>
                  <TableCell>{transaction.block_height}</TableCell>

                  <TableCell className={classes.cell}>Total BTC in</TableCell>
                  <TableCell>{toBTC(transaction.totalIn)}</TableCell>

                  <TableCell className={classes.cell}>In Degree</TableCell>
                  <TableCell>{transaction.inputs.length}</TableCell>

                  <TableCell className={classes.cell}>Avg In Degree</TableCell>
                  <TableCell>{getAvgDegree(transaction, 'inputs')}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>Fee</TableCell>
                  <TableCell>{toBTC(transaction.fees)}</TableCell>

                  <TableCell className={classes.cell}>Total BTC out</TableCell>
                  <TableCell>{toBTC(transaction.totalOut)}</TableCell>

                  <TableCell className={classes.cell}>Out Degree</TableCell>
                  <TableCell>{transaction.outputs.length}</TableCell>

                  <TableCell className={classes.cell}>Avg Out Degree</TableCell>
                  <TableCell>{getAvgDegree(transaction, 'outputs')}</TableCell>
                </TableRow>
            </TableBody>
          </Table>

          {createInputOutputTable(handleInputClick, inputOpen, 'Inputs', transaction.inputs)}
          {createInputOutputTable(handleOutputClick, outputOpen, 'Outputs', transaction.outputs)}
        </React.Fragment>
      }
   </React.Fragment>
  )
}

export default TransactionSummary;
