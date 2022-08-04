import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "vokxduoavtqvyn",
  password: process.env.SECUALIZE_PASS,
  database: "db9iko8n74u757",
  port: 5432,
  host: "ec2-3-229-11-55.compute-1.amazonaws.com",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
