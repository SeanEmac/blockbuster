from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import requests
import time

app = Flask(__name__)
cors = CORS(app)


def process_transaction(response):
  res = {}
  res['id'] = response['hash']
  res['timestamp'] = response['time']
  res['inputs'] = []
  res['outputs'] = []

  for inp in response['inputs']:
    input = {}
    input['satoshis'] = inp['prev_out']['value']
    input['spent'] = inp['prev_out']['spent']
    if ('addr' in inp['prev_out']):
      input['address'] = inp['prev_out']['addr']
    else:
      input['address'] = 'Invalid Address'

    res['inputs'].append(input)

  for out in response['out']:
    output = {}
    output['spent'] = out['spent']
    output['satoshis'] = out['value']
    if ('addr' in out):
      output['address'] = out['addr']
    else: 
      output['address'] = 'Invalid Address'

    res['outputs'].append(output)


  res['totalIn'] = sum(x['satoshis'] for x in res['inputs'])
  res['totalOut'] = sum(x['satoshis'] for x in res['outputs'])
  res['fees'] = res['totalIn'] - res['totalOut']
  return res


def get_root_trans(transaction_id):
  url = "https://blockchain.info/rawtx/" + transaction_id + "?&cors=true"
  response = requests.get(url).json()
  return process_transaction(response)


def get_address(address):
  # need to collect all of the transactions of the address using limits and offset
  url = "https://blockchain.info/rawaddr/" + address + "?&cors=true"
  return requests.get(url).json()


def filter_address(transactions, isInput):
  # Filters out transactions that are a different base or not spent
  filtered_transactions = []
  for transaction in transactions:
    all_good = True

    if isInput:
      for input in transaction['inputs']:
        if not 'addr' in input['prev_out']:
          all_good = False
    else:
      for output in transaction['out']:
        if not 'addr' in output:
          all_good = False
    
    if all_good:
      filtered_transactions.append(transaction)

  return filtered_transactions


def next_spending_transaction(output):
  # Tries to match up where the transaction was spent
  addr = output['address']
  value = output['satoshis']
  address = get_address(addr)
  valid_transactions = filter_address(address["txs"], True)

  spending_transaction = [tx for tx in valid_transactions # A list of transactions where:
    if ( addr in [y["prev_out"]["addr"] for y in tx["inputs"]] # The address is an input
    and value in [y["prev_out"]["value"] for y in tx["inputs"]])] # And the value matches

  log_results(spending_transaction)

  return spending_transaction[0]


def log_results(spending_transaction):
  if len(spending_transaction) == 0:
    print("No matching transactions found in Address.")
  elif len(spending_transaction) == 1:
    print("Exact transaction found.")
  elif len(spending_transaction) > 1:
    print("Multiple possible transactions found.")


def previous_spending_transaction(input):
  # Tries to match up where the transaction came from
  addr = input['address']
  value = input['satoshis']
  address = get_address(addr)
  valid_transactions = filter_address(address["txs"], False)

  spending_transaction = [tx for tx in valid_transactions # A list of transactions where:
    if ( addr in [y['addr'] for y in tx['out']] # The address is an input
    and value in [y['value'] for y in tx['out']])] # And the value matches

  return spending_transaction[0]


def reduce_addresses(transaction):
  # Go over the addresses and combine the satoshis of a single address into one
  newIns = []
  newOuts = []
  for input in transaction['inputs']:
    if input in newIns:
      newIns = combine_satoshis(newIns, input['address'], input['satoshis'])
    else:
      newIns.append(input)

  for output in transaction['outputs']:
    if output['address'] in [y['address'] for y in newOuts]:
      newOuts = combine_satoshis(newOuts, output['address'], output['satoshis'])
    else:
      newOuts.append(output)

  transaction['inputs'] = newIns
  transaction['outputs'] = newOuts
  return transaction


def combine_satoshis(addresses, address, satoshis):
  # Adds the sats together
  for addr in addresses:
    if addr['address'] == address:
      addr['satoshis'] = addr['satoshis'] + satoshis
      break

  return addresses


@app.route('/blockbuster/api/transaction/<transaction_id>')
def get_transaction(transaction_id):
  root = get_root_trans(transaction_id)

  # Expand to the inputs
  for input in root['inputs']:
    print('doing input')
    time.sleep(10)
    if input['address'] == 'Invalid Address':
      print('invalid')
    else:
      input['parent'] = process_transaction(previous_spending_transaction(input))

  # Expand to the outputs
  for output in root['outputs']:
    print('doing output')
    time.sleep(10)
    if output['address'] == 'Invalid Address':
      print('invalid')
    else:
      output['child'] = process_transaction(next_spending_transaction(output))

  res =  jsonify({'transaction': root})
  return res

    
if __name__ == "__main__":
    app.run(debug=True)