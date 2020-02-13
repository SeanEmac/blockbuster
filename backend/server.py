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
  url = "https://blockchain.info/rawtx/" + transaction_id + "?&cors=true"
  response = requests.get(url).json()
  return process_response(response)


@app.route('/blockbuster/api/transaction/<transaction_id>')
def get_transaction(transaction_id):
  res = make_request(transaction_id)
  return jsonify({'transaction': res})

    
if __name__ == "__main__":
    app.run(debug=True)