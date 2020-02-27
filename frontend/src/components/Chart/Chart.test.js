import React from 'react';
import Chart, {ChartMethods} from './Chart';
import { shallow, mount, render } from 'enzyme';

const props = {
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
          "inputs": [],
          "outputs": [],
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
          "inputs": [],
          "outputs": [],
          "timestamp": 1322177223,
          "totalIn": 10188551954,
          "totalOut": 10188551954
        },
        "fraud": false,
        "satoshis": 98000000,
        "spent": true
      }
    ],
    "timestamp": 1322135154,
    "totalIn": 100000000,
    "totalOut": 100000000
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
});