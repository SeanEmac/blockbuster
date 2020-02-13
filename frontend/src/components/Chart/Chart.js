import React, { useEffect, createRef }from 'react';
import { DataSet, Network } from 'vis';


const options = {
  layout: {
    hierarchical: {
      direction: "UD",
      sortMethod: "directed"
    }
  },
  physics: {
    barnesHut: {
      springConstant: 0,
      avoidOverlap: 20
    }
  },
  edges:{
    arrows: {
      to: {
        enabled: true,
      }
    }
  }
}

const toBTC = (satoshi) => {
  return satoshi / 100000000 + " BTC" 
}

const makeNode = (id, label, shape, colour) => {
  return {
    id: id,
    label: label,
    shape: shape,
    color: colour
  }
}

const getNodes = (transaction) => {
  let inputs = transaction.inputs
  let outputs = transaction.outputs
  let total = toBTC(transaction.totalIn) 
  let nodes = []

  nodes.push(makeNode(transaction.id, 'Transaction\n' + total, "circle", "#97C2FC"))

  inputs.forEach(input => {
    nodes.push(makeNode(input.address, 'Input\n' + toBTC(input.satoshis), "circle", "#FB7E81"))
  })
  outputs.forEach(output => {
    nodes.push(makeNode(output.address, 'Input\n' + toBTC(output.satoshis), "circle", "#FB7E81"))
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

const Chart = (props)  => {
  let transaction = props.transaction
  console.log(transaction)

  const appRef = createRef();
  let nodes = []
  let edges = []

  let root_trans = transaction.id;
  nodes.push(getNodes(transaction.inputs[0].parent))
  nodes.push(getNodes(transaction.outputs[0].child))
  nodes.push(getNodes(transaction.outputs[1].child))
  nodes = nodes.flat()

  edges.push(getEdges(transaction.inputs[0].parent))
  edges.push(getEdges(transaction.outputs[0].child))
  edges.push(getEdges(transaction.outputs[1].child))
  edges.push(getEdges(transaction))
  edges = edges.flat()

  nodes.push(makeNode(root_trans, 'Root Transaction\n' + toBTC(transaction.totalIn), "circle", "#7BE141"))

  const data = {
    nodes:  new DataSet(nodes),
    edges: new DataSet(edges)
  }

  useEffect(() => {
    new Network(appRef.current, data, options);
  }, [props]);

  return (
    <div ref={appRef} />
  );
}

export default Chart;