import React, { useState, useEffect } from "react";
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

const Deposits = (props)  => {
  const classes = useStyles()
  const [hasError, setErrors] = useState(false);
  const [transactionObj, setTransactionObj] = useState({
    hash: '',
    inputsAddr: '',
    inputAmt: '',
    outputsAddr: '',
    outputsAmt: ''
  });
  
  async function fetchData(trans) {
    if(trans != "") {
      const res = await fetch('https://blockchain.info/rawtx/' + trans + '?&cors=true')
      res
        .json()
        .then(res => setTransactionObj({
          hash: res.hash,
          inputsAddr: res.inputs[0].prev_out.addr,
          inputAmt: res.inputs[0].prev_out.value/100000000,
          outputsAddr: res.out[0].addr,
          outputsAmt: res.out[0].value/100000000,
        }))
        .catch(err => setErrors(err));
    }
  }
  
  useEffect(() => {
    fetchData(props.transID);
  }, [props]);

  return (
    <React.Fragment>
     <Title>Transaction:</Title>
     <div>Hash: {transactionObj.hash}</div>

     <div>Input: {transactionObj.inputsAddr}</div>
     <div>In Amount: {transactionObj.inputAmt}</div>

     <div>Output: {transactionObj.outputsAddr}</div>
     <div>Out Amount: {transactionObj.outputsAmt}</div>
   </React.Fragment>
  )
}

export default Deposits;