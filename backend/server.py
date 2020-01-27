from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

# Mock Data
default = {
  'id': 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
  'timestamp': 1322135154000,
  'totalIn': 100000000,
  'totalOut': 100000000,
  'fees': 0,
  'inputs': [
    {'input_key': '1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq', 'satoshis': 100000000}
  ],
  'outputs': [
    {'output_key': '13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV', 'satoshis': 2000000},
    {'output_key': '14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG', 'satoshis': 98000000}
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


@app.route('/blockbuster/api/transaction/<transaction_id>')
def get_transaction(transaction_id):
  if(transaction_id == murder['id']):
    return jsonify({'transaction': murder})
  else:
    return jsonify({'transaction': default})
    
if __name__ == "__main__":
    app.run(debug=True)