import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: "postgres",
	username: "qalwatfi",
	password: process.env.SECUALIZE_PASS,
	database: "qalwatfi",
	port: 5432,
	host: "silly.db.elephantsql.com",
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
