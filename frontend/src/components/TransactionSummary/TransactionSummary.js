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

let dummy = {
  "transaction": {
    "fees": 0,
    "block_height": "154598",
    "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
    "inputs": [
      {
        "address": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
        "fraud": false,
        "hash": "9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201",
        "satoshis": 100000000,
        "spent": true,
        "transaction": {
          "fees": 50000,
          "hash": "9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201",
          "inputs": [
            {
              "address": "1ExY9836X5RB5GA28KCtegh5iVenzp4pch",
              "fraud": false,
              "hash": "ebd18ad0c4217aa615803aa37dfcda65c5f7c62a7282a0a9ac84bdbd01d8b89a",
              "satoshis": 4074805464,
              "spent": true
            }
          ],
          "outputs": [
            {
              "address": "1N6WBEcCdCPpDCWCryb2r8mPUhr2XrukTu",
              "fraud": false,
              "hash": "8557e590db7a7e892b41b61319cf0975f17c112e2e3d0b015ef90424fe13807c",
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1Pq4mXRXeicnPqSWRe2XaYqbpNJcRHRh2k",
              "fraud": false,
              "hash": "00ce0483c6ed0287798db1a368e5f6ab0e3dbcb5496ad749e178c85d62479be8",
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
              "fraud": false,
              "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "1HgRqL79u71wRwrRt9ZesDngvtHwU4UJrq",
              "fraud": false,
              "hash": "388a330654b9531c304da45e087d5ec8d755815309a32b10158d5385d8fcb491",
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "1PBRnU4NNmLF4qtWBM41rPP2HTmG5DuLwp",
              "fraud": false,
              "hash": "3446e5d2405fefbcd4bda94deaafabdb84ec885ccc38ca03e917cf9573cad3c3",
              "satoshis": 20000000,
              "spent": true
            },
            {
              "address": "1N2hME6rag7EUhzwQDvSvvfPAU98Kzgk9Q",
              "fraud": false,
              "hash": "c609a706a6f0cb0172cf6f12d739fa2b8141b7c853624e2928d12cd25a94a4f9",
              "satoshis": 200000000,
              "spent": true
            },
            {
              "address": "1Mc46Fe2wq7NXLG7dj2HwVSmBq83C6rWsT",
              "fraud": false,
              "hash": "eda384daa0860efecf95eea848358388a42aa4c5049f440a724136fe2103e80f",
              "satoshis": 3354755464,
              "spent": true
            },
            {
              "address": "1GYeEYRyjbLecAuMuxvuqdvzuyDwacfPNe",
              "fraud": false,
              "hash": "184b84e9599277adec636337cd51953fed6a4f29f2f1c65dd9d3a1c94ac10c76",
              "satoshis": 50000000,
              "spent": true
            },
            {
              "address": "1HginDTMzrhTfVLvXVDctwNvgUdBG4dFyz",
              "fraud": false,
              "hash": "b04a85c631f3b7307a636395e4c96a56e440687df348f6c391966504542ab3b6",
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "1EZv24A6GVzcPNTckFyWZwU7kMRuffcf7v",
              "fraud": false,
              "hash": "6fe6e38c03cae6449f04b0c5de96f7be99683ffd04822b52bd52b965d8428878",
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "17oNVhTZAtwvHuH4Dccf8xdYFU6YGLDNcj",
              "fraud": false,
              "hash": "9e2022d592a9593ad2e80daa64406ebb79c525893ca9dd988bd0dca377a114a2",
              "satoshis": 100000000,
              "spent": true
            },
            {
              "address": "1J6GNYnHdUokmkAiuy3gT37Jd55fSCud7h",
              "fraud": false,
              "hash": "61f6d9871b008f1771030c302584a028081b8938f48355d75a2c8e32702d21c4",
              "satoshis": 10000000,
              "spent": true
            },
            {
              "address": "18Jzi4xXLsATdBCYg117EVpn1pLJLumeki",
              "fraud": false,
              "hash": "5bb4001137380fe7ef8cbceec2c44f8f803c0dbbe90be3d9ec5c8da8ede4dc03",
              "satoshis": 10000000,
              "spent": true
            }
          ],
          "timestamp": "Thu, 24 Nov 2011 04:07:21 GMT",
          "totalIn": 4074755464,
          "totalOut": 4074705464
        }
      }
    ],
    "outputs": [
      {
        "address": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
        "fraud": false,
        "hash": "df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c",
        "satoshis": 98000000,
        "spent": true,
        "transaction": {
          "fees": 0,
          "hash": "df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c",
          "inputs": [
            {
              "address": "1KoRbPbuA5HPNAGgA59x7NuS6y3faD7dwv",
              "fraud": false,
              "hash": "a05e0d8179f8b8ac61aba52cdc04d7526eab32d006c320f9e50e06b2d39e9728",
              "satoshis": 8951000000,
              "spent": true
            },
            {
              "address": "1DV4RzhCc4L6WdXVaHnknsJ8rh9wqTse3W",
              "fraud": false,
              "hash": "3b94c71a376fc2179f264eaa69205e87a64c7879fcdc922b8240cb061c9b6162",
              "satoshis": 56049959,
              "spent": true
            },
            {
              "address": "16Uu3uzN9ZbAgUEfevjYGPQTgCtRYkv3R2",
              "fraud": false,
              "hash": "a1402065928e46c7ba635afda48d1af9b9d5da1eac97177820fcaf174c5e89ae",
              "satoshis": 1083501995,
              "spent": true
            },
            {
              "address": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
              "fraud": false,
              "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
              "satoshis": 98000000,
              "spent": true
            }
          ],
          "outputs": [
            {
              "address": "1KaVS5cuGQ4pJksMjr1nKVZ5dQ4HPjCxqG",
              "fraud": false,
              "hash": "d41f4d35a0cf42c2c97a055ebe0f430b307f594aa0c2da77a6e51780004b57b8",
              "satoshis": 3976000000,
              "spent": true
            },
            {
              "address": "1LbwZNZgC5KFB3V8jtjV7Q5g5mJw5swSJ1",
              "fraud": false,
              "hash": "60a649d64b05ddac8c4e69f013931b3bcdc709f45be25591ec61d016e8154418",
              "satoshis": 6212551954,
              "spent": true
            }
          ],
          "timestamp": "Thu, 24 Nov 2011 23:27:03 GMT",
          "totalIn": 10188551954,
          "totalOut": 10188551954
        }
      },
      {
        "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
        "fraud": false,
        "hash": "0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8",
        "satoshis": 2000000,
        "spent": true,
        "transaction": {
          "fees": 0,
          "hash": "0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8",
          "inputs": [
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "601254d176048fc43674366abee475d238d504c2e5bb668492a82373a5fb9e13",
              "satoshis": 2000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "3ada3030aba9871740b24c511cdc06cedbd433612bd4fab9d624ab90093e68eb",
              "satoshis": 7000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "ee6f2f97ba59ae9174f89410aeee330237e96f3b3a1321b1b1da9bdf7c54478f",
              "satoshis": 2000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "4447d5cded3636a328611b455a0bfdd54734f32475bf239f817c4b2412058f66",
              "satoshis": 2000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "5238828e10aecad4f0dbc63a71931404dfd28cfce4a0383327e477ed51a32ad5",
              "satoshis": 4000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
              "satoshis": 2000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "595489548aa631454e089f2d57056f5ddf0ee2f4c48ca31fa900c45e2099a601",
              "satoshis": 5000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "c6b86387eaf5a8a8e5fb336a62278d4d8d22ad7f1f4d3d4c671fee2f1439442e",
              "satoshis": 6000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "8c3efe55e6b640c77fe0933cfe6fc370ee7840e8353b625b014250bbecdcc8cf",
              "satoshis": 4000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "1cd1ba92af5f99b7d49631845982ac57f9a5c49440d8e707f1c6d977beddd10e",
              "satoshis": 5000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "f54e3d8416aca7ac028bdb1c205f17abb2669d939fe2734b91e9593ee65776f7",
              "satoshis": 6000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "0df0f6235bbb28e082d754f495d159fcbb6c770bdf2ee0bf82afd72d08c58873",
              "satoshis": 6000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "eab8b77522728eda9da4eb6932c406fcc44954041cfc27d2441b9b77ba9ac502",
              "satoshis": 4000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "01a4d15336dd81709be56d112a406d54a01795cdbedd35a0fb6d682e04df8e83",
              "satoshis": 4000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "ec1a2fbf4eae7f3b971ae0de351bd4a637774548fb86eb47dbd4c34f1271e490",
              "satoshis": 5000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "8fd6e97bf8e76c520360aabef2df6a969d8d780bf7cd1966ace2c0fbe311f8ea",
              "satoshis": 3000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "b3a1d3c6224c6bac764cf7b71de2258089f505417a4e3806945c7d741044d7d3",
              "satoshis": 3000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "871455c040a2e14e98ab5f09a2a848fa48264bbac083c85e8e789bc7c588df32",
              "satoshis": 3000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "61f67f5124f50c7bcfad1efb94d187f46e4223243c2abcd9f55b4b7678531b46",
              "satoshis": 3000000,
              "spent": true
            },
            {
              "address": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
              "fraud": false,
              "hash": "ae4de3c402efd88804a20d8a03f911fadc7b69546a8ff2c975a938e8dcb0ce26",
              "satoshis": 2000000,
              "spent": true
            }
          ],
          "outputs": [
            {
              "address": "1NQYRsxVYwmKFHLANwtc2khPcwFmhB6Giv",
              "fraud": false,
              "hash": "67dbfaa3352d014d0f3433fcf1667ee3a2082f995b8cf64eb3158473b77aed38",
              "satoshis": 400000000,
              "spent": true
            },
            {
              "address": "1F3b3w16Aeb7apKLA6XbnXH9fKt6qynAk4",
              "fraud": false,
              "hash": "b4e9210fa59a6a0eb45eeb71ea278ba007a53361045e5fd922c9295b7df2f564",
              "satoshis": 1000000,
              "spent": true
            }
          ],
          "timestamp": "Thu, 24 Nov 2011 21:34:38 GMT",
          "totalIn": 401000000,
          "totalOut": 401000000
        }
      }
    ],
    "timestamp": "Thu, 24 Nov 2011 11:45:54 GMT",
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
      const res = await fetch('http://127.0.0.1:8000/blockbuster/api/transaction/' + trans)
      // setTransaction(dummy.transaction)
      // // Send the data to the Chart component
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

  const getAvgDegree = (transaction, type) => {
    let sum = 0
    let counter = 1;

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

  return (
    <React.Fragment>
      <Title > Transaction details: </Title>

      {/* This will only render when we have gotten a response */}
      { transaction && transaction.hash && 
        <React.Fragment>
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
