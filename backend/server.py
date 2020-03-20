from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from blockcypher import get_transaction_details

import csv
import requests
import time

app = Flask(__name__)
cors = CORS(app)

dummy = {'hash': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da', 'block_height': 154598, 'timestamp': "ABC", 'totalIn': 100000000, 'totalOut': 100000000, 'fees': 0, 'inputs': [{'address': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq', 'hash': '9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201', 'satoshis': 100000000, 'spent': True, 'fraud': False, 'transaction': {'hash': '9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201', 'block_height': 154567, 'timestamp': 'wefwef', 'totalIn': 4074755464, 'totalOut': 4074705464, 'fees': 50000, 'inputs': [{'address': '1ExY9836X5RB5GA28KCtegh5iVenzp4pch', 'hash': 'ebd18ad0c4217aa615803aa37dfcda65c5f7c62a7282a0a9ac84bdbd01d8b89a', 'satoshis': 4074805464, 'spent': True, 'fraud': False}], 'outputs': [{'address': '1N6WBEcCdCPpDCWCryb2r8mPUhr2XrukTu', 'hash': '8557e590db7a7e892b41b61319cf0975f17c112e2e3d0b015ef90424fe13807c', 'satoshis': 10000000, 'spent': True, 'fraud': False}, {'address': '1Pq4mXRXeicnPqSWRe2XaYqbpNJcRHRh2k', 'hash': '00ce0483c6ed0287798db1a368e5f6ab0e3dbcb5496ad749e178c85d62479be8', 'satoshis': 10000000, 'spent': True, 'fraud': False}, {'address': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq', 'hash': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da', 'satoshis': 100000000, 'spent': True, 'fraud': False}, {'address': '1HgRqL79u71wRwrRt9ZesDngvtHwU4UJrq', 'hash': '388a330654b9531c304da45e087d5ec8d755815309a32b10158d5385d8fcb491', 'satoshis': 100000000, 'spent': True, 'fraud': False}, {'address': '1PBRnU4NNmLF4qtWBM41rPP2HTmG5DuLwp', 'hash': '3446e5d2405fefbcd4bda94deaafabdb84ec885ccc38ca03e917cf9573cad3c3', 'satoshis': 20000000, 'spent': True, 'fraud': False}, {'address': '1N2hME6rag7EUhzwQDvSvvfPAU98Kzgk9Q', 'hash': 'c609a706a6f0cb0172cf6f12d739fa2b8141b7c853624e2928d12cd25a94a4f9', 'satoshis': 200000000, 'spent': True, 'fraud': False}, {'address': '1Mc46Fe2wq7NXLG7dj2HwVSmBq83C6rWsT', 'hash': 'eda384daa0860efecf95eea848358388a42aa4c5049f440a724136fe2103e80f', 'satoshis': 3354755464, 'spent': True, 'fraud': False}, {'address': '1GYeEYRyjbLecAuMuxvuqdvzuyDwacfPNe', 'hash': '184b84e9599277adec636337cd51953fed6a4f29f2f1c65dd9d3a1c94ac10c76', 'satoshis': 50000000, 'spent': True, 'fraud': False}, {'address': '1HginDTMzrhTfVLvXVDctwNvgUdBG4dFyz', 'hash': 'b04a85c631f3b7307a636395e4c96a56e440687df348f6c391966504542ab3b6', 'satoshis': 10000000, 'spent': True, 'fraud': False}, {'address': '1EZv24A6GVzcPNTckFyWZwU7kMRuffcf7v', 'hash': '6fe6e38c03cae6449f04b0c5de96f7be99683ffd04822b52bd52b965d8428878', 'satoshis': 100000000, 'spent': True, 'fraud': False}, {'address': '17oNVhTZAtwvHuH4Dccf8xdYFU6YGLDNcj', 'hash': '9e2022d592a9593ad2e80daa64406ebb79c525893ca9dd988bd0dca377a114a2', 'satoshis': 100000000, 'spent': True, 'fraud': False}, {'address': '1J6GNYnHdUokmkAiuy3gT37Jd55fSCud7h', 'hash': '61f6d9871b008f1771030c302584a028081b8938f48355d75a2c8e32702d21c4', 'satoshis': 10000000, 'spent': True, 'fraud': False}, {'address': '18Jzi4xXLsATdBCYg117EVpn1pLJLumeki', 'hash': '5bb4001137380fe7ef8cbceec2c44f8f803c0dbbe90be3d9ec5c8da8ede4dc03', 'satoshis': 10000000, 'spent': True, 'fraud': False}]}}], 'outputs': [{'address': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG', 'hash': 'df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c', 'satoshis': 98000000, 'spent': True, 'fraud': False, 'transaction': {'hash': 'df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c', 'block_height': 154651, 'timestamp': "bdfbdfb", 'totalIn': 10188551954, 'totalOut': 10188551954, 'fees': 0, 'inputs': [{'address': '1KoRbPbuA5HPNAGgA59x7NuS6y3faD7dwv', 'hash': 'a05e0d8179f8b8ac61aba52cdc04d7526eab32d006c320f9e50e06b2d39e9728', 'satoshis': 8951000000, 'spent': True, 'fraud': False}, {'address': '1DV4RzhCc4L6WdXVaHnknsJ8rh9wqTse3W', 'hash': '3b94c71a376fc2179f264eaa69205e87a64c7879fcdc922b8240cb061c9b6162', 'satoshis': 56049959, 'spent': True, 'fraud': False}, {'address': '16Uu3uzN9ZbAgUEfevjYGPQTgCtRYkv3R2', 'hash': 'a1402065928e46c7ba635afda48d1af9b9d5da1eac97177820fcaf174c5e89ae', 'satoshis': 1083501995, 'spent': True, 'fraud': False}, {'address': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG', 'hash': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da', 'satoshis': 98000000, 'spent': True, 'fraud': False}], 'outputs': [{'address': '1KaVS5cuGQ4pJksMjr1nKVZ5dQ4HPjCxqG', 'hash': 'd41f4d35a0cf42c2c97a055ebe0f430b307f594aa0c2da77a6e51780004b57b8', 'satoshis': 3976000000, 'spent': True, 'fraud': False}, {'address': '1LbwZNZgC5KFB3V8jtjV7Q5g5mJw5swSJ1', 'hash': '60a649d64b05ddac8c4e69f013931b3bcdc709f45be25591ec61d016e8154418', 'satoshis': 6212551954, 'spent': True, 'fraud': False}]}}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8', 'satoshis': 2000000, 'spent': True, 'fraud': False, 'transaction': {'hash': '0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8', 'block_height': 154642, 'fraud': True, 'timestamp': 'wfefwef', 'totalIn': 401000000, 'totalOut': 401000000, 'fees': 0, 'inputs': [{'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '601254d176048fc43674366abee475d238d504c2e5bb668492a82373a5fb9e13', 'satoshis': 2000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '3ada3030aba9871740b24c511cdc06cedbd433612bd4fab9d624ab90093e68eb', 'satoshis': 7000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'ee6f2f97ba59ae9174f89410aeee330237e96f3b3a1321b1b1da9bdf7c54478f', 'satoshis': 2000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '4447d5cded3636a328611b455a0bfdd54734f32475bf239f817c4b2412058f66', 'satoshis': 2000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '5238828e10aecad4f0dbc63a71931404dfd28cfce4a0383327e477ed51a32ad5', 'satoshis': 4000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da', 'satoshis': 2000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '595489548aa631454e089f2d57056f5ddf0ee2f4c48ca31fa900c45e2099a601', 'satoshis': 5000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'c6b86387eaf5a8a8e5fb336a62278d4d8d22ad7f1f4d3d4c671fee2f1439442e', 'satoshis': 6000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '8c3efe55e6b640c77fe0933cfe6fc370ee7840e8353b625b014250bbecdcc8cf', 'satoshis': 4000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '1cd1ba92af5f99b7d49631845982ac57f9a5c49440d8e707f1c6d977beddd10e', 'satoshis': 5000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'f54e3d8416aca7ac028bdb1c205f17abb2669d939fe2734b91e9593ee65776f7', 'satoshis': 6000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '0df0f6235bbb28e082d754f495d159fcbb6c770bdf2ee0bf82afd72d08c58873', 'satoshis': 6000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'eab8b77522728eda9da4eb6932c406fcc44954041cfc27d2441b9b77ba9ac502', 'satoshis': 4000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '01a4d15336dd81709be56d112a406d54a01795cdbedd35a0fb6d682e04df8e83', 'satoshis': 4000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'ec1a2fbf4eae7f3b971ae0de351bd4a637774548fb86eb47dbd4c34f1271e490', 'satoshis': 5000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '8fd6e97bf8e76c520360aabef2df6a969d8d780bf7cd1966ace2c0fbe311f8ea', 'satoshis': 3000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'b3a1d3c6224c6bac764cf7b71de2258089f505417a4e3806945c7d741044d7d3', 'satoshis': 3000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '871455c040a2e14e98ab5f09a2a848fa48264bbac083c85e8e789bc7c588df32', 'satoshis': 3000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': '61f67f5124f50c7bcfad1efb94d187f46e4223243c2abcd9f55b4b7678531b46', 'satoshis': 3000000, 'spent': True, 'fraud': False}, {'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'hash': 'ae4de3c402efd88804a20d8a03f911fadc7b69546a8ff2c975a938e8dcb0ce26', 'satoshis': 2000000, 'spent': True, 'fraud': False}], 'outputs': [{'address': '1NQYRsxVYwmKFHLANwtc2khPcwFmhB6Giv', 'hash': '67dbfaa3352d014d0f3433fcf1667ee3a2082f995b8cf64eb3158473b77aed38', 'satoshis': 400000000, 'spent': True, 'fraud': False}, {'address': '1F3b3w16Aeb7apKLA6XbnXH9fKt6qynAk4', 'hash': 'b4e9210fa59a6a0eb45eeb71ea278ba007a53361045e5fd922c9295b7df2f564', 'satoshis': 1000000, 'spent': True, 'fraud': False}]}}]}

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
  print('\n\n')
  print(transaction)
  print('\n\n')
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
  root = get_transaction(transaction_id)
  root = expand_transaction(root)
  # zero = 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da'
  # one = '4e645394a176febb7474f7b40cf5610b3c48767e52e31a46768df8a388ff7805'
  # two = '39da0d8a7c9bda8f253288181f9691e4594f8add9964f73592c63b0c241e0460'
  # three = 'b779b9f491ca4ead9b26b8f0aaf7b65589fcd548c447586d49ad0e5df6a7dcf3'
  # four = 'e0a1822b4fa1dec069f42da6a6c963c814320ffc723de684e05259cc4f880245'
  # print(search_elliptic(zero))
  # print(search_elliptic(one))
  # print(search_elliptic(two))
  # print(search_elliptic(three))
  # print(search_elliptic(four))

  return  jsonify({'transaction': root})


if __name__ == "__main__":
  app.run(port=8000, debug=True)