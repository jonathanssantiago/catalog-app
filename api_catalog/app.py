from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://mongodb:27017/catalog')
db = client.catalog

@app.route('/api/product/<int:product_id>')
def products(product_id):
    _product = db.products.find_one({'id' : str(product_id)})

    if(_product == None):
        abort(404)

    _product.pop('_id')

    compact = {
        'name': _product['name'],
        'price': _product['price'],
        'status' : _product['status'],
        'categories' : _product['categories'],
    }
        
    return jsonify(
        status=True,
        complete=_product,
        compact=compact
    )

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')