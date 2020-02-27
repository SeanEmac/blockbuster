from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import time

default = {
   "ver": 1,
   "inputs": [
      {
         "sequence": 4294967295,
         "witness": "",
         "prev_out": {
            "spent": 'true',
            "spending_outpoints": [
               {
                  "tx_index": 0,
                  "n": 0
               }
            ],
            "tx_index": 0,
            "type": 0,
            "addr": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
            "value": 100000000,
            "n": 2,
            "script": "76a914a3e2bcc9a5f776112497a32b05f4b9e5b2405ed988ac"
         },
         "script": "48304502210098a2851420e4daba656fd79cb60cb565bd7218b6b117fda9a512ffbf17f8f178022005c61f31fef3ce3f906eb672e05b65f506045a65a80431b5eaf28e0999266993014104f0f86fa57c424deb160d0fc7693f13fce5ed6542c29483c51953e4fa87ebf247487ed79b1ddcf3de66b182217fcaf3fcef3fcb44737eb93b1fcb8927ebecea26"
      }
   ],
   "weight": 1032,
   "block_height": 154598,
   "relayed_by": "0.0.0.0",
   "out": [
      {
         "spent": 'true',
         "spending_outpoints": [
            {
               "tx_index": 0,
               "n": 3
            }
         ],
         "tx_index": 0,
         "type": 0,
         "addr": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
         "value": 98000000,
         "n": 0,
         "script": "76a91429d6a3540acfa0a950bef2bfdc75cd51c24390fd88ac"
      },
      {
         "spent": 'true',
         "spending_outpoints": [
            {
               "tx_index": 0,
               "n": 5
            }
         ],
         "tx_index": 0,
         "type": 0,
         "addr": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV",
         "value": 2000000,
         "n": 1,
         "script": "76a91417b5038a413f5c5ee288caa64cfab35a0c01914e88ac"
      }
   ],
   "lock_time": 0,
   "size": 258,
   "block_index": 0,
   "time": 1322135154,
   "tx_index": 0,
   "vin_sz": 1,
   "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
   "vout_sz": 2
}
address1 = "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG"
transaction1= {
  "id": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
  "addr": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG",
  "value": 98000000
}

address2 = "1KaVS5cuGQ4pJksMjr1nKVZ5dQ4HPjCxqG"
transaction2 = {
  "id": "df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c",
  "addr": "1KaVS5cuGQ4pJksMjr1nKVZ5dQ4HPjCxqG",
  "value": 3976000000
}

def next_outgoing_transaction(transaction, address):

  # need to collect all of the transactions of the address
  spending_transaction = [tx for tx in address["txs"] # A list of transactions where:
    if (transaction["addr"] in [y["prev_out"]["addr"] for y in tx["inputs"]] # The address is an input
    and transaction["value"] in [y["prev_out"]["value"] for y in tx["inputs"]])] # And the value matches

  if len(spending_transaction) > 1:
    print("Multiple possible spendings found")
  else:
    print("Exact transaction found")

  print("After searching Address: " + transaction["addr"])
  print("Which was an output of transaction: " + transaction["id"])
  print("With a value of: " + str(transaction["value"]))

  print("\nFound that this output was spent in transaction:")
  print(spending_transaction[0]["hash"])



url = "https://blockchain.info/rawaddr/" + address2 + "?&cors=true"
response = requests.get(url).json()
zero = next_outgoing_transaction(transaction2, response)

print("sleep")
time.sleep(10)

print("slept")

# "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq"
# "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG"
# "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV"

