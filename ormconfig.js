require('dotenv/config');

module.exports = [
  {
    name: 'default',
    type: 'mongodb',
    url: process.env.MONGO_DB_URL,
    useUnifiedTopology: true,
    authSourse: process.env.MONGO_AUTH,
    database: process.env.MONGO_COLLECTION,
    entities: ['./src/modules/**/infra/typeorm/schemas/**{.js,.ts}'],
  },
];