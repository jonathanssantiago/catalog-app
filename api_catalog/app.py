from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_redis import FlaskRedis

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['REDIS_URL'] = 'redis://redis:6379/0'
redis = FlaskRedis(app)


def create_app():
    from resources.product import Product
    api.add_resource(Product, '/api/product/<int:product_id>')
    app.run(port=5000, debug=True, host='0.0.0.0')


if __name__ == '__main__':
    create_app()
