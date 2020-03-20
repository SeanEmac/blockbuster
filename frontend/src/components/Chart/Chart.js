import React, { useEffect, createRef }from 'react';
import ReactDOMServer from "react-dom/server";
import { DataSet, Network } from 'vis';

export const ChartMethods = () => {
  const toBTC = (satoshi) => {
    let sat = Math.round((satoshi / 100000000 + Number.EPSILON) * 100) / 100
    return sat + " BTC" 
  }

  const makeNode = (id, label, group, value, timestamp, color) => {
    return {
      id: id,
      label: label,
      group: group,
      title: makeTooltip(id, group, timestamp, value),
      value: value,
      color: {
        background: color,
      }
    }
  }

  const makeTooltip = (id, group, timestamp, value) => {
    // Was returning a react element which vis couldnt render
    return (ReactDOMServer.renderToString(
      <div>
        <b>ID: </b>{id}
        <br></br>
        <b>Type: </b>{group}
        <br></br>
        <b>Amount: </b>{toBTC(value)}
        <br></br>
        <b>Date: </b>{timestamp}
      </div>
    ))
  }

  const check_node_id = (nodes, id) => {
    let duplicate = false
    nodes.forEach(node => {
      if (node.id === id) {
        duplicate = true
      }
    })
    return duplicate
  }

  const remove_duplicate_nodes = (nodes) => {
    let newNodes = []
    nodes.forEach(node => {
      if (check_node_id(newNodes, node.id) === false) {
        newNodes.push(node)
      }
    })
    return newNodes
  }

  const draw_transaction = (transaction) => {
    let nodes = []
    let edges = []
    let blue = '#4da6ff' // All addresses are blue

    let grey = '#808080' // Grey if it it not known
    let darkRed = '#e80000' // Dark red for confirmed Fraud
    let lightRed = '#ff7373' // Light red for predicted Fraud
    let darkGreen = '#0bb50b' // Dark Green for known licit
    let lightGreen = '#77c777' // Light green for predicted ilicit

    let transactionColor;
    switch(transaction.fraud) {
      case 1:
        transactionColor = darkRed
        break;
      case 2:
        transactionColor = darkGreen
        break;
      case 3:
        transactionColor = lightRed
        break;
      case 4:
        transactionColor = lightGreen
        break;
      default:
        transactionColor = grey
    }
    
    let hash = transaction.hash
    nodes.push(makeNode(transaction.hash, 'Transaction\n' + toBTC(transaction.totalIn) ,
     'Transaction', transaction.totalIn, transaction.timestamp, transactionColor))

    transaction.inputs.forEach(input => {
      nodes.push(makeNode(input.address, 'Address\n' + toBTC(input.satoshis), 'Address',
       input.satoshis, "N/A", blue))
      edges.push({from: input.address, to: hash})
    })

    transaction.outputs.forEach(output => {
      nodes.push(makeNode(output.address, 'Address\n' + toBTC(output.satoshis), 'Address',
       output.satoshis, "N/A", blue))
      edges.push({from: hash, to: output.address})
    })

    // This can be destructured... let [n, e] = draw_transaction()
    return [nodes, edges]
  }

  return {
    toBTC,
    makeNode,
    remove_duplicate_nodes,
    check_node_id,
    draw_transaction,
  };
}

const Chart = (props)  => {
  let option = 0

  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 100,
        nodeSpacing: 50,
        treeSpacing: 100,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: "LR", // UD, DU, LR, RL
        sortMethod: "directed", // hubsize
      }
    },
    physics: {
      barnesHut: {
        springConstant: 0,
        avoidOverlap: 10
      }
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
        }
      }
    },
    groups: {
      Transaction: {
        shape: "box",
      },
      Address: {
        shape: "circle",
      }
    }
  }

  let transaction = props.transaction

  const appRef = createRef();
  let nodes = []
  let edges = []

  let [n, e] = ChartMethods().draw_transaction(transaction)
  nodes.push(n)
  edges.push(e)

  // just go one step back and forward
  transaction.inputs.forEach(input => {
    [n, e] = ChartMethods().draw_transaction(input.transaction)
    nodes.push(n)
    edges.push(e)
  })
  transaction.outputs.forEach(output => {
    if(output.spent){
      [n, e] = ChartMethods().draw_transaction(output.transaction)
      nodes.push(n)
      edges.push(e)
    }
  })
  nodes = nodes.flat()
  edges = edges.flat()

  nodes = ChartMethods().remove_duplicate_nodes(nodes)

  delete nodes[0].group
  let background = nodes[0].color.background
  nodes[0].color = {
    background: background,
    border: "#FFDF00",
  }
  nodes[0].shape = 'box'
  nodes[0].size = 200

  console.log(nodes)
  const data = {
    nodes: new DataSet(nodes),
    edges: new DataSet(edges)
  }

  useEffect(() => {
    let network = new Network(appRef.current, data, options);

    network.on("click", function(params) {
      let options = [
        {enabled: true, direction: "UD"},
        {enabled: false},
        {enabled: true, direction: "LR"}
      ]

      let newOptions = { 
        layout: {
          hierarchical: options[option % 3]
        },
      }

      network.setOptions(newOptions);
      option++;
    });

  }, [props]);

  return (
    <div ref={appRef} />
  );
}


export default Chart;