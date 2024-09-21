import { createPool, Pool } from 'mysql2/promise';

class Database {
  public pool: Pool | null;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'clinica_vet',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
}

const db = new Database();

export { db };
