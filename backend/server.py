from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import requests

app = Flask(__name__)
cors = CORS(app)


def process_response(response):
  res = {}
  res['id'] = response['hash']
  res['timestamp'] = response['time']
  res['inputs'] = []
  res['outputs'] = []

  for inp in response['inputs']:
    input = {}
    input['input_key'] = inp['prev_out']['addr']
    input['satoshis'] = inp['prev_out']['value']
    res['inputs'].append(input)

  for out in response['out']:
    output = {}
    output['output_key'] = out['addr']
    output['satoshis'] = out['value']
    res['outputs'].append(output)

  res['totalIn'] = sum(x['satoshis'] for x in res['inputs'])
  res['totalOut'] = sum(x['satoshis'] for x in res['outputs'])
  res['fees'] = res['totalIn'] - res['totalOut']
  return res


def make_request(transaction_id):
  # url = "https://blockchain.info/rawtx/" + transaction_id + "?&cors=true"
  # response = requests.get(url).json()
  # return process_response(response)
  t2 = {
    'id': '9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201',
    'timestamp': 1322135154000,
    'totalIn': 4070000000,
    'totalOut': 4070000000,
    'fees': 0,
    'inputs': [
      {
        'address': '1ExY9836X5RB5GA28KCtegh5iVenzp4pch',
        'satoshis': 4070000000,
        'parent_transaction': 'leave out'
      }
    ],
    'outputs': [
      {
        'address': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
        'satoshis': 100000000,
        'parent_transaction': 'leave out'
      },
      {
        'address': '13 more',
        'satoshis': 3970000000,
        'parent_transaction': '13 more'
      }
    ]
  }


  t3 = {
    'id': 'df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c',
    'timestamp': 1322135154000,
    'totalIn': 10100000000,
    'totalOut': 10100000000,
    'fees': 99999,
    'inputs': [
      {
        'address': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG',
        'satoshis': 98000000,
        'parent_transaction': 'leave out'
      },
      {
        'address': 'there are 3 others',
        'satoshis': 10002000000,
        'parent_transaction': 'leave out'
      }
    ],
    'outputs': [
      {
        'address': 'there are 2 more',
        'satoshis': 10100000000,
        'parent_transaction': 'leave out'
      }
    ]
  }

  t4 = {
    'id': '0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8',
    'timestamp': 1322135154000,
    'totalIn': 400000000,
    'totalOut': 400000000,
    'fees': 0,
    'inputs': [
      {
        'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV',
        'satoshis': 2000000,
        'parent_transaction': 'leave out'
      },
      {
        'address': 'lots of others 111',
        'satoshis': 398000000,
        'parent_transaction': 'leave out'
      }
    ],
    'outputs': [
      {
        'address': 'there are 2 other',
        'satoshis': 400000000,
        'parent_transaction': 'leave out'
      }
    ]
  }


  root = {
    'id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
    'timestamp': 1322135154000,
    'totalIn': 100000000,
    'totalOut': 100000000,
    'fees': 0,
    'inputs': [
      {
        'address': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
        'satoshis': 100000000,
        'parent': t2
      }
    ],
    'outputs': [
      {
        'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV',
        'satoshis': 2000000,
        'child': t4
      },
      {
        'address': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG',
        'satoshis': 98000000,
        'child': t3
      }
    ]
  }
  return root


@app.route('/blockbuster/api/transaction/<transaction_id>')
def get_transaction(transaction_id):
  res = make_request(transaction_id)
  return jsonify({'transaction': res})

    
if __name__ == "__main__":
    app.run(debug=True)