from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from blockcypher import get_transaction_details

import csv
import requests
import datetime
import time
import json
import os

app = Flask(__name__)
cors = CORS(app)


def date_converter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


def get_transaction(transaction_id):
  response = get_transaction_details(transaction_id)
  t = {}
  t['hash'] = response['hash']
  t['block_height'] = response['block_height']
  t['timestamp'] = response['confirmed']
  t['totalIn'] = response['total']
  t['totalOut'] = response['total'] - response['fees']
  t['fees'] = response['fees']
  t['fraud'] = search_elliptic(response['hash'])
  t['inputs'] = []
  t['outputs'] = []

  for inp in response['inputs']:
    input = {}
    input['address'] = inp['addresses'][0]
    input['hash'] = inp['prev_hash']
    input['satoshis'] = inp['output_value']
    input['spent'] = True
    t['inputs'].append(input)

  for out in response['outputs']:
    output = {}
    output['address'] = out['addresses'][0]
    output['hash'] = -1
    output['satoshis'] = out['value']
    output['spent'] = False

    if ('spent_by' in out):
      output['spent'] = True
      output['hash'] = out['spent_by']

    t['outputs'].append(output)

  return t


def expand_transaction(transaction):
  for input in transaction['inputs']:
    if input['spent']:
      input['transaction'] = get_transaction(input['hash'])

  for output in transaction['outputs']:
    if output['spent']:
      output['transaction'] = get_transaction(output['hash'])

  return transaction


def search_elliptic(transaction_id):
  de_anon = csv.reader(open('data/elliptic_txs_de-anon.csv', "rt"), delimiter=",")
  classes = csv.reader(open('data/combined_predictions.csv', "rt"), delimiter=",")

  found = False
  identifier = 0
  fraud = '0' 
  # '0' - not in dataset
  # '1' - known fraud
  # '2' - know not fraud
  # '3' - predicted fraud
  # '4' - predicted not fraud

  for row in de_anon:
    # See if it is in the data set
    if transaction_id == row[1]:
      found = True
      identifier = row[0]

  if found:
    # Get the class
    for row in classes:
      if identifier == row[0]:
        fraud = row[1]

  return int(fraud)


@app.route('/blockbuster/api/transaction/<transaction_id>')
def get_network(transaction_id):
  files = os.listdir("transactions")
  # Remove .json from the file names
  cache = [f[:-5] for f in files]

  if transaction_id in cache:
    print("We already have this transcation")
    with open('transactions/' + transaction_id + '.json', 'r') as read_file:
      root = json.load(read_file)

  else:
    print("This is a new transaction")
    root = get_transaction(transaction_id)
    root = expand_transaction(root)
    with open('transactions/' + transaction_id + '.json', 'w') as outfile:
      json.dump(root, outfile, default=date_converter)

  return jsonify({'transaction': root})


if __name__ == "__main__":
  app.run(port=8000, debug=True)