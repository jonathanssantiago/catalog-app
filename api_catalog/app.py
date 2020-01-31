from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin
from flask_redis import FlaskRedis
from pymongo import MongoClient
import json
from ast import literal_eval

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://mongodb:27017/catalog')
db = client.catalog

app.config['REDIS_URL'] = 'redis://redis:6379/0'
redis = FlaskRedis(app)

@app.route('/api/product/<int:product_id>')
def products(product_id):
    if redis.get('catalog.product-' + str(product_id)) != None:
       return json.loads(redis.get('catalog.product-' + str(product_id))), 200

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

    redis.set(
        'catalog.product-' + str(product_id), 
        json.dumps({'complete': _product, 'compact': compact}), 
        ex=(60*5)
    )
        
    return jsonify(
        complete=_product,
        compact=compact
    ), 200


if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')