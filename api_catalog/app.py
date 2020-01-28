from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://mongodb:27017/catalog')
db = client.catalog

@app.route('/product/<int:product_id>')
def products(product_id):
    _products = db.products.find({'id' : str(product_id)})

    complete = []
    compact = []

    for product in _products:
        product.pop('_id')
        complete.append(product)
        compact.append({
            'name': product['name'],
            'price': product['price'],
            'status' : product['status'],
            'categories' : product['categories'],
        })
        
    return jsonify(
        status=True,
        complete=complete,
        compact=compact
    )

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')