from google.cloud import bigquery

QUERY_TEMPLATE = """
  SELECT
    timestamp,
    transaction_id,
    inputs.input_pubkey_base58 AS input_key,
    outputs.output_pubkey_base58 AS output_key,
    outputs.output_satoshis as satoshis

  FROM `bigquery-public-data.bitcoin_blockchain.transactions`
    JOIN UNNEST (inputs) AS inputs
    JOIN UNNEST (outputs) AS outputs

  WHERE transaction_id = "{0}"
    AND outputs.output_satoshis  >= 0
    AND inputs.input_pubkey_base58 IS NOT NULL
    AND outputs.output_pubkey_base58 IS NOT NULL

  GROUP BY timestamp, transaction_id, input_key, output_key, satoshis
"""
# bigquery-public-data:crypto_bitcoin.transactions

def query_transaction(id):
  client = bigquery.Client()
  query_job = client.query(QUERY_TEMPLATE.format(id))

  results = query_job.result()  # Waits for job to complete.
  handle_results(results)
  # trans = handle_results()
  # print(trans)


def handle_results():

  fake = [
    {
      "timestamp": 1322135154000,
      'input_key': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
      'output_key': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV',
      'satoshis': 2000000
    },
    {
      'timestamp':1322135154000,
      'input_key': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
      'output_key': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG',
      'satoshis': 98000000
    }
  ]
  inp = extract_results(fake, 'input_key')
  out = extract_results(fake, 'output_key')

  return {
    'inputs': inp,
    'outputs': out
  }
  print(inp)
  print(out)

def extract_results(results, key):
  addresses = []

  for row in results:
    index = -1
    for i, addr in enumerate(addresses):
      if addr[key] == row[key]:
        index = i
        break

    if (index != -1):
      addresses[index]['satoshis'] = addresses[index]['satoshis'] + row['satoshis']
    else:
      print('No dupe')
      addresses.append({
        "timestamp": row['timestamp'],
        key: row[key],
        "satoshis": row['satoshis'],
      })

  return addresses


if __name__ == '__main__':
    query_transaction("b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da")

"""

SELECT
  `hash`,
  block_timestamp,
  input_count,
  input_value,
  output_count,
  output_value,
  fee,
  
FROM `bigquery-public-data.crypto_bitcoin.transactions`
WHERE `hash` = "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da"
"""


# Mock Data
default = {
  'id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
  'timestamp': 1322135154000,
  'totalIn': 100000000,
  'totalOut': 100000000,
  'fees': 0,
  'inputs': [
    {
      'input_key': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
      'satoshis': 100000000,
      'parent_transaction': '9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201'
    }
  ],
  'outputs': [
    {
      'output_key': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV'
      'satoshis': 2000000,
      'parent_transaction': '0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8'
    },
    {
      'output_key': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG',
      'satoshis': 98000000,
      'parent_transaction': 'df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c'
    }
  ]
}

murder = {
  'id': '4a0a5b6036c0da84c3eb9c2a884b6ad72416d1758470e19fb1d2fa2a145b5601',
  'timestamp': 1364746539000,
  'totalIn': 180264000000,
  'totalOut': 180264000000,
  'fees': 0,
  'inputs': [
    {'input_key': '1Hhckdfu1m61wx8B1MbKH14W1WUP34dTn6', 'satoshis': 54300000000},
    {'input_key': '19hK8YqPZN9zhThN6kxBSqoPeapoiJbY19', 'satoshis': 54400000000},
    {'input_key': '1FQgZUT2uWiraUXYkKfETGrrmWjqjHfmub', 'satoshis': 54900000000},
    {'input_key': '18PsQyJqCLZN15T59JKrtiio1x57bRdFHw', 'satoshis': 16664000000},
  ],
  'outputs': [
    {'output_key': '1MwvS1idEevZ5gd428TjL3hB2kHaBH9WTL', 'satoshis': 167000000000},
    {'output_key': '1Mn159fJS1jX2VnqTbtjFGLAHgb14bFYsw', 'satoshis': 13264000000}
  ]
}

b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da

  # print(response.status_code)
  # handle_response(response)

  # if(transaction_id == murder['id']):
  #   return jsonify({'transaction': murder})
  # else:
  #   return jsonify({'transaction': default})  



    # res = {
  #   'root_id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
  #   'timestamp': 1322135154000,
  #   'totalIn': 100000000,
  #   'totalOut': 100000000,
  #   'fees': 0,
  #   'transactions': [
  #     root,
  #     t2,
  #     t3,
  #     t4
  #   ]
  # }
  # default = {
  #   'id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
  #   'timestamp': 1322135154000,
  #   'totalIn': 100000000,
  #   'totalOut': 100000000,
  #   'fees': 0,
  #   'inputs': [
  #     {
  #       'address': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq',
  #       'satoshis': 100000000,
  #       'parent_transaction': '9fa4e0e33aba41623bc3618827d2a6495e6828ce04f26c97771a1369210e8201'
  #     }
  #   ],
  #   'outputs': [
  #     {
  #       'address': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV',
  #       'satoshis': 2000000,
  #       'parent_transaction': '0c45329983279acf2f9e9c7976774ef11bdb2646d934836c53e6679281e09ac8'
  #     },
  #     {
  #       'address': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG',
  #       'satoshis': 98000000,
  #       'parent_transaction': 'df0f8a4f0988de2875705a79ec826c8b9f8b08c9ffa4e5b4a5ea1b7bf956306c'
  #     }
  #   ]
  # }s