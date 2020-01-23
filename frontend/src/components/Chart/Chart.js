import React, { useEffect, createRef }from 'react';
import { DataSet, Network } from 'vis';


const options = {
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

const Chart = (props)  => {
  const appRef = createRef();
  let nodes = []
  let edges = []

  let trans = props.data.hash;
  let inputs = props.data.inputs.map(input => input.prev_out.addr)
  let outputs = props.data.out.map(output => output.addr)

  nodes.push({
    id: trans,
    label: 'Transaction',//trans,
    shape: "circle",
    color: "#97C2FC"
  })

  inputs.forEach(input => {
    nodes.push({
      id: input,
      label: 'Input',//input,
      shape: "circle",
      color: "#FB7E81"
    })
  })

  outputs.forEach(output => {
    nodes.push({
      id: output,
      label: 'Output', //output,
      shape: "circle",
      color: "#7BE141"
    })
  })

  inputs.forEach(input => {
    edges.push({
      from: input,
      to: trans
    })
  })

  outputs.forEach(output => {
    edges.push({
      from: trans,
      to: output
    })
  })

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