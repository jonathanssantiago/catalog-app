# Catalog APP

## API's

É possível acessar a documentação das APIs através do Swagger online importando o arquivo
swagger.yaml

Link Swagger Online: https://editor.swagger.io

### Api de Catálogo

API REST para servir os dados de um produto.

Tecnologias Utilizadas:

* Python / Flask
* MongoDB
* Redis

### Api de Recomendações

API REST para fornecer a lista de recomendações para serem exibidas nas vitrines de recomendação.

Tecnologias Utilizadas:

* NodeJS
* Redis

### Front-end

Aplicação cliente para a exibição das vitrines de recomendações.

Tecnologias Utilizadas:

* Webpack 4
* SASS

## Configuração e Execução

### Docker

Foi disponibilizado um arquivo **docker-compose.yml** contendo os conteiners necessários à execução, já configurados. Para executar a aplicação usando docker, basta executar o compose.
> docker-compose up

O front-end será executado na porta 8001 (http://localhost:8001) e as API's de catálogo e recomendações serão executados na porta 5001 (http://localhost:5001) e na porta 3003 (http://localhost:3003) respectivamentes.
