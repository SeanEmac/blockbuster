import React from 'react';
import Chart, {ChartMethods} from './Chart';
import { shallow } from 'enzyme';

const props = {
  "transaction": {
    "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
    "inputs": [
      {
        "address": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
        "transaction": {
          "hash": "30e0d04b10e5ec1fd14288e2fafffc5f60f38ff127317a214273c05ddd280250",
          "inputs": [],
          "outputs": [],
        },
      }
    ],
    "outputs": [
      {
        "address": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
        "transaction": {
          "hash": "df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c",
          "inputs": [],
          "outputs": [],
        }
      }
    ]
  }
}

describe('Chart component', () => {
  const container = shallow(<Chart {...props}/>);

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should convert Satoshi to Bitcoin', () => {
    expect(ChartMethods().toBTC(100000000)).toBe("1 BTC")
    expect(ChartMethods().toBTC(111111111)).toBe("1.11 BTC")
    expect(ChartMethods().toBTC(99000000)).toBe("0.99 BTC")
  });

  it('should create a network ', () => {
    let [n, e] = ChartMethods().draw_transaction(props.transaction)
    n = n.map(node => node.id);
    
    let nodes = [
      'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
      '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
      '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG',
    ]
    let edges = [
      { 
        'from': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
        'to': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da'
      },
      { 
        'from': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
        'to': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG'
      }
    ]
    expect(nodes).toEqual(n)
    expect(edges).toEqual(e)
  })

  it('should remove duplicate nodes', () => {
    let nodes  = [
      {'id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da' },
      {'id': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq' },
      {'id': '30e0d04b10e5ec1fd14288e2fafffc5f60f38ff127317a214273c05ddd280250' },
      {'id': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG' },
      {'id': 'df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c' }
    ]

    // Should not remove any
    expect(ChartMethods().remove_duplicate_nodes(nodes)).toEqual(nodes)
    
    // Should have removed the duplicate we added
    nodes.push({'id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da' })
    expect(ChartMethods().remove_duplicate_nodes(nodes).length).toEqual(5)

  })
});