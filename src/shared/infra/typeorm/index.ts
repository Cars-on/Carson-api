import { createConnection } from 'typeorm';

// eslint-disable-next-line no-unused-expressions
(async () => {
  createConnection()
    .then(() => {
      console.log('Database connected ✨✨✨✨');
    })
    .catch(err => {
      console.log('Database not connected ❌❌❌❌ ', err);
    });
})();
