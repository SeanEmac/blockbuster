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
  # client = bigquery.Client()
  # query_job = client.query(QUERY_TEMPLATE.format(id))

  # results = query_job.result()  # Waits for job to complete.

  trans = handle_results()
  print(trans)


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

