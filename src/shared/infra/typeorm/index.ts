import { createConnection } from 'typeorm';

console.log('teste');

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
