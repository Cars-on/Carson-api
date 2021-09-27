![thumbnail-github-carson-back](https://user-images.githubusercontent.com/54003876/133947437-6815294e-5b40-4738-b252-31add3670e03.png)

## Como rodar o projeto

1. Para rodar o servidor do Back-end é essencial que tenha **Docker** e **Docker Compose** instalado, passo a passo da instalação nos links abaixos: <br />
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Composer](https://docs.docker.com/compose/install/)

1.1 (Opcional) Caso opte pela não utilização do docker será necessário ter instalado no seu computador NodeJS e MongoDB, passo a passo nos links:
- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)


2. Clone repositório: 
```
git clone https://github.com/Cars-on/Carson-api.git
```

3. Para a instalação das dependencias do projeto, execute: 
```
yarn
```
ou 
```
npm install
```

3. Crie um arquivo .env para para a conexão do Mongo na raiz do projeto:
```
MONGO_DB_URL=mongodb://root:carson_app@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false

APP_SECRET=carsOn2349201

APP_WEB_URL=http://localhost:3000

```

4. Crie também na raiz do projeto um arquivo **ormconfig.js** com as seguintes propriedades:
```
require("dotenv/config")


module.exports = [
  {
    name: 'default',
    type: 'mongodb',
    url: process.env.MONGO_DB_URL,
    useUnifiedTopology: true,
    authSourse: 'admin',
    database: 'carson',
    entities: ["./src/modules/**/infra/typeorm/schemas/**{.js,.ts}"],
  }
]

```

5. Para iniciar o servidor, agora execute: 
```
docker-compose up
```
