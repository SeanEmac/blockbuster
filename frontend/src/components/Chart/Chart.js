import React, { useEffect, createRef }from 'react';
import { DataSet, Network } from 'vis';

export const ChartMethods = () => {
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

  const check_node_id = (nodes, id) => {
    let duplicate = false
    nodes.forEach(node => {
      if (node.id == id) {
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

    let hash = transaction.hash
    nodes.push(makeNode(transaction.hash, 'Transaction\n' + toBTC(transaction.totalIn) , 'transaction', transaction.totalIn))

    transaction.inputs.forEach(input => {
      let type = 'address'
      if(input.fraud) type = 'fraudAddr'

      nodes.push(makeNode(input.address, 'Address\n' + toBTC(input.satoshis), type, input.satoshis))
      edges.push({from: input.address, to: hash})
    })

    transaction.outputs.forEach(output => {
      let type = 'address'
      if(output.fraud) type = 'fraudAddr'

      nodes.push(makeNode(output.address, 'Address\n' + toBTC(output.satoshis), type, output.satoshis))
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
    [n, e] = ChartMethods().draw_transaction(output.transaction)
    nodes.push(n)
    edges.push(e)
  })
  nodes = nodes.flat()
  edges = edges.flat()

  nodes = ChartMethods().remove_duplicate_nodes(nodes)
  const data = {
    nodes: new DataSet(nodes),
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