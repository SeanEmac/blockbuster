import React, { useEffect, createRef }from 'react';
import { DataSet, Network } from 'vis';


const options = {
  layout: {
    hierarchical: {
      direction: "LR",
      sortMethod: "directed"
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
    transaction: {
      shape: "box",
      color: "#97C2FC"
    },
    address: {
      shape: "circle",
      color: "#32CD32"
    },
    fraudAddr: {
      shape: "circle",
      color: "#FB7E81"
    }
  }
}

const toBTC = (satoshi) => {
  let sat = Math.round((satoshi / 100000000 + Number.EPSILON) * 100) / 100
  return sat + " BTC" 
}

const makeNode = (id, label, group, value) => {
  return {
    id: id,
    label: label,
    group: group,
    title: id,
    value: value
  }
}

const getNodes = (transaction) => {
  let inputs = transaction.inputs
  let outputs = transaction.outputs
  let total = toBTC(transaction.totalIn) 
  let nodes = []

  nodes.push(makeNode(transaction.id, 'Transaction\n' + total, 'transaction', transaction.totalIn))

  inputs.forEach(input => {
    let type = 'address'
    if(input.fraud) type = 'fraudAddr'
    nodes.push(makeNode(input.address, 'Address\n' + toBTC(input.satoshis), type, input.satoshis))
  })
  outputs.forEach(output => {
    let type = 'address'
    if(output.fraud) type = 'fraudAddr'
    nodes.push(makeNode(output.address, 'Address\n' + toBTC(output.satoshis), type, output.satoshis))
  })

  return nodes
}

const getEdges = (transaction) => {
  let inputs = transaction.inputs
  let outputs = transaction.outputs
  let edges = []

  inputs.forEach(input => {
    edges.push({from: input.address, to: transaction.id})
  })

  outputs.forEach(output => {
    edges.push({from: transaction.id, to: output.address})
  })

  return edges
}

const combine_nodes = (nodes) => {
  let newNodes = []
  nodes.forEach(node => {
    if (check_node_id(newNodes, node.id) == false) {
      newNodes.push(node)
    }
  })
  return newNodes
}

const check_node_id = (nodes, id) => {
  let duplicate = false
  nodes.forEach(node => {
    if (node.id == id) {
      duplicate = true
    }
  })
  return duplicate
}

const Chart = (props)  => {
  console.log(props)
  let transaction = props.transaction

  const appRef = createRef();
  let nodes = []
  let edges = []

  let root_trans = transaction.id;
  transaction.inputs.forEach(input => nodes.push(getNodes(input.parent)))
  transaction.outputs.forEach(output => nodes.push(getNodes(output.child)))
  nodes = nodes.flat()

  transaction.inputs.forEach(input => edges.push(getEdges(input.parent)))
  transaction.outputs.forEach(output => edges.push(getEdges(output.child)))
  edges.push(getEdges(transaction))
  edges = edges.flat()

  nodes.push(makeNode(root_trans, 'Searched\n' + toBTC(transaction.totalIn), "transaction", transaction.totalIn))

  console.log(nodes)
  let combined = combine_nodes(nodes)
  const data = {
    nodes: new DataSet(combined),
    edges: new DataSet(edges)
  }

  useEffect(() => {
    let network = new Network(appRef.current, data, options);

    network.on("click", function(params) {
    });

  }, [props]);

  return (
    <div ref={appRef} />
  );
}

export default Chart;