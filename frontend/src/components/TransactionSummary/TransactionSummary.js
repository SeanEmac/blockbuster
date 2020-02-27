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

let dummy = {
  "transaction": {
    "fees": 0,
    "id": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
    "inputs": [
      {
        "address": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
        "fraud": false,
        "parent": {
          "fees": 100000,
          "id": "30e0d04b10e5ec1fd14288e2fafffc5f60f38ff127317a214273c05ddd280250",
          "inputs": [
            {
              "address": "1H538UzDx1gdgtYgEdiGQK9FtxybA3mgzd",
              "fraud": false,
              "satoshis": 218909173,
              "spent": true
            },
            {
              "address": "1FTZGYtMPJ3bb2BAieynCXQRePipfGBqsk",
              "fraud": true,
              "satoshis": 1488420737,
              "spent": true
            }
          ],
          "outputs": [
            {
              "address": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
              "fraud": false,
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "1MUwxSvgkEmeWZVvYR2kWafWyEXX5Rv8Bs",
              "fraud": false,
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "16Gg7JUQRXYeGNVVLen27GQjQwHrs3k8CM",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1JnMrqCjmQDtMzLAnXZoqAakaaQnQ86hio",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1A8iZLe3CicUzWC7yfphyg9mVoRPzG9PtB",
              "fraud": false,
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "1GD51HHeWRDuDGGd9jUU5zqA6N9D2Gkgmh",
              "fraud": false,
              "satoshis": 200000000,
              "spent": true
            },
            {
              "address": "1Mfu72vhTWq4WCbwaupTG4iPvRsFWcS71R",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1Jp9KFDfhVNExrycnKpuqPq3RpDvvKrkfa",
              "fraud": false,
              "satoshis": 20000000,
              "spent": true
            },
            {
              "address": "13tPxnba6GeZEM1c7494nYtHwSHd3HzfMB",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1M692BdQkZCUaepYaVphAQNc1C8T6sDpAV",
              "fraud": true,
              "satoshis": 50000000,
              "spent": true
            },
            {
              "address": "1EdK3pLnWTLZ9LXRpZ5nnfcoCMTXWaPabf",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "178zEafyE5QhR6U25kBNRGpvR4n9HPvSXw",
              "fraud": false,
              "satoshis": 50000000,
              "spent": true
            },
            {
              "address": "1EJooH1sks6zUunXvDNyftLs3hAw4WNbSv",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "19Lk4Ri6E4KeCAC4HCvAFdzz2V7ftv1NSQ",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1PPtyhinQ6MHVNRtzP17kxX89SCsz3jXEc",
              "fraud": false,
              "satoshis": 67229910,
              "spent": true
            },
            {
              "address": "1Du32h3gm65xWYBPzhvH276zJSfZcgxziY",
              "fraud": false,
              "satoshis": 500000000,
              "spent": true
            },
            {
              "address": "1CQHhDEfTQAxSAv1UwiLWR8anMxpBeZEYo",
              "fraud": false,
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "1ryHj79aD4T2KjikFCYkmcm6JPT6YkCSa",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1G94TkEBoDP6JaWzBAuwSXtXvaE1vCrE7w",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1Ln5yagrg1ejNhxCe6MnwzYqYLVMkLxo2N",
              "fraud": false,
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "189bbfvu8UYede15NKgPsv8owEXYPzWLqK",
              "fraud": false,
              "satoshis": 50000000,
              "spent": true
            },
            {
              "address": "1MSP5hnLtJRE65YBDz1ZfFq9tFsfVCBmMp",
              "fraud": false,
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "12KuWYQZrzrB8vJ1UZGhcNd1vMrEBW7pZJ",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "19XJYgbGcMjmAhXxDZxBN8TiHD5MwSGuvw",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "179CPDshcySwmpZMZ5vsNR7DPD7LrYsLL4",
              "fraud": false,
              "satoshis": 50000000,
              "spent": true
            },
            {
              "address": "1A2Cz7S923fEbAdJQF2hJadJs59A4J7iob",
              "fraud": false,
              "satoshis": 10000000,
              "spent": true
            }
          ],
          "timestamp": 1382347140,
          "totalIn": 1707329910,
          "totalOut": 1707229910
        },
        "satoshis": 100000000,
        "spent": true
      }
    ],
    "outputs": [
      {
        "address": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
        "child": {
          "fees": 0,
          "id": "df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c",
          "inputs": [
            {
              "address": "1KoRbPbuA5HPNAGgA59x7NuS6y3faD7dwv",
              "fraud": false,
              "satoshis": 8951000000,
              "spent": true
            },
            {
              "address": "1DV4RzhCc4L6WdXVaHnknsJ8rh9wqTse3W",
              "fraud": false,
              "satoshis": 56049959,
              "spent": true
            },
            {
              "address": "16Uu3uzN9ZbAgUEfevjYGPQTgCtRYkv3R2",
              "fraud": false,
              "satoshis": 1083501995,
              "spent": true
            },
            {
              "address": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
              "fraud": false,
              "satoshis": 98000000,
              "spent": true
            }
          ],
          "outputs": [
            {
              "address": "1KaVS5cuGQ4pJksMjr1nKVZ5dQ4HPjCxqG",
              "fraud": false,
              "satoshis": 3976000000,
              "spent": true
            },
            {
              "address": "1LbwZNZgC5KFB3V8jtjV7Q5g5mJw5swSJ1",
              "fraud": false,
              "satoshis": 6212551954,
              "spent": true
            }
          ],
          "timestamp": 1322177223,
          "totalIn": 10188551954,
          "totalOut": 10188551954
        },
        "fraud": false,
        "satoshis": 98000000,
        "spent": true
      },
      {
        "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
        "child": {
          "fees": 0,
          "id": "fdcebd6f87e3ccb0078ff4ffceb186257bf86399c11a0523f63e17a689a7c509",
          "inputs": [
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "satoshis": 1000000,
              "spent": true
            },
            {
              "address": "13THMesDS5Hfvvzbq8uytNA8yafbFq7gcw",
              "fraud": false,
              "satoshis": 2000000,
              "spent": true
            },
            {
              "address": "1F2o1EEREuUpjK12ifRtah6SyQK29eff7y",
              "fraud": false,
              "satoshis": 6000000,
              "spent": true
            }
          ],
          "outputs": [
            {
              "address": "1NQYRsxVYwmKFHLANwtc2khPcwFmhB6Giv",
              "fraud": false,
              "satoshis": 9000000,
              "spent": true
            }
          ],
          "timestamp": 1322516903,
          "totalIn": 9000000,
          "totalOut": 9000000
        },
        "fraud": false,
        "satoshis": 2000000,
        "spent": true
      }
    ],
    "timestamp": 1322135154,
    "totalIn": 100000000,
    "totalOut": 100000000
  }
}

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
              <TableCell>{input.spent? "Yes": "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Collapse>
  </div>
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
      // https://blockchain.info/rawtx/b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da
      // const res = await fetch('https://blockchain.info/rawtx/' + trans + '?&cors=true')
      // const res = await fetch('http://127.0.0.1:5000/blockbuster/api/transaction/' + trans)
      setTransaction(dummy.transaction)
      // Send the data to the Chart component
      props.propegateGraphData(dummy)
      // res
      //   .json()
      //   .then(res => {
      //     console.log(res)
      //     // Set the json response
      //     setTransaction(res.transaction)
      //     // Send the data to the Chart component
      //     props.propegateGraphData(res)
      //   })
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
