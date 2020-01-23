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
    maxWidth: 450,
  },
  cell : {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(224, 224, 224, 1)',
  },
}));

const TransactionSummary = (props)  => {
  const classes = useStyles()
  const [transactionObj, setTransactionObj] = useState({ data: null });
  const [inputOpen, setInputOpen] = React.useState(false);
  const [outputOpen, setOutputOpen] = React.useState(false);
  
  useEffect(() => {
    fetchData(props.transactionID);
  }, [props.transactionID]);

  async function fetchData(trans) {
    if (trans !== "") {
      // https://blockchain.info/rawtx/b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da
      const res = await fetch('https://blockchain.info/rawtx/' + trans + '?&cors=true')
      res
        .json()
        .then(res => {
          setTransactionObj({ data: res })
          props.passData(res)
        })
    }
  }

  const handleInputClick = () => {
    setInputOpen(!inputOpen);
  };

  const handleOutputClick = () => {
    setOutputOpen(!outputOpen);
  };
  // prev_out.spent
  const toBTC = (satoshi) => {
    return satoshi / 100000000 + " BTC" 
  }

  return (
    <React.Fragment>
      <Title > Transaction details: </Title>
      {/* This will only render when we have gotten a response */}
      { transactionObj && transactionObj.data && <div>
        <Table className={classes.table} size="small">
          <TableBody>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>{new Date(transactionObj.data.time * 1000).toLocaleString()}</TableCell>
                <TableCell className={classes.cell}>Fees</TableCell>
                <TableCell>{toBTC((transactionObj.data.inputs.reduce((a, b) => a + b.prev_out.value, 0) - 
                            transactionObj.data.out.reduce((a, b) => a + b.value, 0)))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total in</TableCell>
                <TableCell>{toBTC(transactionObj.data.inputs.reduce((a, b) => a + b.prev_out.value, 0))}</TableCell>
                <TableCell className={classes.cell}>Total out</TableCell>
                <TableCell>{toBTC(transactionObj.data.out.reduce((a, b) => a + b.value, 0))}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      
      <ListItem button onClick={handleInputClick}>
        <Title > Inputs </Title>
        {inputOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={inputOpen} timeout="auto" unmountOnExit>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Bitcoin Amount</TableCell>
              <TableCell>Spent?</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactionObj.data.inputs.map(input => (
              <TableRow key={input.prev_out.addr}>
                <TableCell>{input.prev_out.addr}</TableCell>
                <TableCell>{toBTC(input.prev_out.value)}</TableCell>
                <TableCell>{input.prev_out.spent? 'Yes': 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>

      <ListItem button onClick={handleOutputClick}>
        <Title > Outputs </Title>
        {outputOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={outputOpen} timeout="auto" unmountOnExit>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Bitcoin Amount</TableCell>
              <TableCell>Spent?</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactionObj.data.out.map(output => (
              <TableRow key={output.addr}>
                <TableCell>{output.addr}</TableCell>
                <TableCell>{toBTC(output.value)}</TableCell>
                <TableCell>{output.spent? 'Yes': 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>
      </div>
      }
   </React.Fragment>
  )
}

export default TransactionSummary;