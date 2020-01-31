from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources.product import Product

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config['REDIS_URL'] = 'redis://redis:6379/0'

api.add_resource(Product, '/api/product/<int:product_id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')