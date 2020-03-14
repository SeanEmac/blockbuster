from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from blockcypher import get_transaction_details

import requests
import time

app = Flask(__name__)
cors = CORS(app)

def get_transaction(transaction_id):
  response = get_transaction_details(transaction_id)
  t = {}
  t['hash'] = response['hash']
  t['timestamp'] = response['confirmed']
  t['totalIn'] = response['total']
  t['totalOut'] = response['total'] - response['fees']
  t['fees'] = response['fees']
  t['inputs'] = []
  t['outputs'] = []

  for inp in response['inputs']:
    input = {}
    input['address'] = inp['addresses'][0]
    input['hash'] = inp['prev_hash']
    input['satoshis'] = inp['output_value']
    input['spent'] = True
    input['fraud'] = False
    t['inputs'].append(input)

  for out in response['outputs']:
    output = {}
    output['address'] = out['addresses'][0]
    output['hash'] = -1
    output['satoshis'] = out['value']
    output['spent'] = False
    output['fraud'] = False

    if ('spent_by' in out):
      output['spent'] = True
      output['hash'] = out['spent_by']

    t['outputs'].append(output)

  return t


def expand_transaction(transaction):
  for input in transaction['inputs']:
    input['transaction'] = get_transaction(input['hash'])

  for output in transaction['outputs']:
    output['transaction'] = get_transaction(output['hash'])

  return transaction


@app.route('/blockbuster/api/transaction/<transaction_id>')
def get_network(transaction_id):
  root = get_transaction(transaction_id)
  root = expand_transaction(root)

  return  jsonify({'transaction': root})


if __name__ == "__main__":
  app.run(port=8000, debug=True)