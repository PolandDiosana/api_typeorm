import "reflect-metadata";
import { DataSource } from "typeorm";
import mysql from "mysql2/promise";
import config from "../config.json";
import { User } from "../users/user.model";

// Initialize TypeORM DataSource
export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  entities: [User],
  synchronize: true,
  logging: true,
});

async function initialize() {
  const { host, user, password, database } = config.database;
  const port = Number(config.database.port);

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();

  await AppDataSource.initialize()
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection error:", error));
}

initialize();
