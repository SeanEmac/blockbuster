import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Title from '../Title/Title';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 650,
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
      <Title>{title}</Title>
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
              <TableCell>Spent</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Collapse>
  </div>
}

const toBTC = (satoshi) => {
  return satoshi / 100000000 + " BTC" 
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
      // https://blockchain.info/rawtx/b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da
      // const res = await fetch('https://blockchain.info/rawtx/' + trans + '?&cors=true')
      const res = await fetch('http://127.0.0.1:5000/blockbuster/api/transaction/' + trans)
      res
        .json()
        .then(res => {
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
      <Title > Transaction details: </Title>

      {/* This will only render when we have gotten a response */}
      { transaction && transaction.id && 
        <React.Fragment>
          <Table className={classes.table} size="small">
            <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell colSpan={5}>{transaction.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>

                  <TableCell className={classes.cell}>Total in</TableCell>
                  <TableCell>{toBTC(transaction.totalIn)}</TableCell>

                  <TableCell className={classes.cell}>In Degree</TableCell>
                  <TableCell>{transaction.inputs.length}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>Fees</TableCell>
                  <TableCell>{toBTC(transaction.fees)}</TableCell>

                  <TableCell className={classes.cell}>Total out</TableCell>
                  <TableCell>{toBTC(transaction.totalOut)}</TableCell>

                  <TableCell className={classes.cell}>Out Degree</TableCell>
                  <TableCell>{transaction.outputs.length}</TableCell>
                </TableRow>
            </TableBody>
          </Table>

          {createInputOutputTable(handleInputClick, inputOpen, 'Inputs', transaction.inputs)}
          {createInputOutputTable(handleOutputClick, outputOpen, 'Outputs',transaction.outputs)}
        </React.Fragment>
      }
   </React.Fragment>
  )
}

export default TransactionSummary;