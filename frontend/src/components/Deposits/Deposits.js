import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Title from '../Title/Title';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Deposits = (props)  => {
  const classes = useStyles()
  const [hasError, setErrors] = useState(false);
  const [transactionObj, setTransactionObj] = useState({ data: null });
  const [inputOpen, setInputOpen] = React.useState(false);
  const [outputOpen, setOutputOpen] = React.useState(false);

  const handleInputClick = () => {
    setInputOpen(!inputOpen);
  };

  const handleOutputClick = () => {
    setOutputOpen(!outputOpen);
  };
  
  async function fetchData(trans) {
    if (trans !== "") {
      const res = await fetch('https://blockchain.info/rawtx/' + trans + '?&cors=true')
      res
        .json()
        .then(res => setTransactionObj({ data: res }))
        .catch(err => setErrors(err));
    }
  }
  
  const createInputs = (()=> {
    let inputs = transactionObj.data.inputs
    let collapse = []
    
    inputs.forEach(input => {
      let buttonText = input.prev_out.addr + ' : ' + input.prev_out.value / 100000000 + ' BTC'
      collapse.push(
        <Collapse in={inputOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary={buttonText} />
            </ListItem>
          </List>
        </Collapse>
      );   
    });

    return collapse
  });

  const createOutputs = (()=> {
    let outputs = transactionObj.data.out
    let collapse = []
    
    outputs.forEach(output => {
      let buttonText = output.addr + ' : ' + output.value / 100000000 + ' BTC'
      collapse.push(
        <Collapse in={outputOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary={buttonText} />
            </ListItem>
          </List>
        </Collapse>
      );
    });

    return collapse
  });
  
  useEffect(() => {
    fetchData(props.transID);
  }, [props]);

  return (
    <React.Fragment>
     <Title>Transaction:</Title>

      {/* This will only render when we have gotten a response */}
      { transactionObj && transactionObj.data &&
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <ListItem button onClick={handleInputClick}>
            <ListItemText primary="Inputs" />
            {inputOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {createInputs()}

          <ListItem button onClick={handleOutputClick}>
            <ListItemText primary="Outputs" />
            {outputOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {createOutputs()}

        </List>
      }
   </React.Fragment>
  )
}

export default Deposits;