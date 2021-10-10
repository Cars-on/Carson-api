import { createConnection } from 'typeorm';

(async () => {
  createConnection()
    .then(() => {
      console.info('\x1b[32m', 'Database connected ✨', '\x1b[0m');
    })
    .catch(err => {
      console.info('\x1b[33m', 'Database not connected ❌ ', err, '\x1b[0m');
    });
})();
