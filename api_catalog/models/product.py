from mongodb import mongoClient

class ProductModel():
    catalog = mongoClient.catalog

    @classmethod
    def get_product(self, product_id):
        product = self.catalog.products.find_one({'id' : str(product_id)})
        
        if product:
            return product

        return None