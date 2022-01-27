module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": "postgres",
    "password": process.env.DB_PASS,
    "database": "codingcamp",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/**/*"],
    "migrations": ["src/migration/**/*"],
    "subscribers": ["src/subscriber/**/*"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
};