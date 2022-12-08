import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "pet_finder_db_user",
  password: process.env.SECUALIZE_PASS,
  database: "pet_finder_db",
  port: 5432,
  host: "dpg-cdo3lsirrk05dt2gmdeg-a.oregon-postgres.render.com",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// hacer push y cambiar clave en env vars
