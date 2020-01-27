FROM mongo

COPY catalog.json /catalog.json

CMD mongoimport --host mongodb --db catalog --collection products --type json --file /catalog.json