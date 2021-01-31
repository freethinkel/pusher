import dotenv from 'dotenv';
dotenv.config();

export const config = {
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbDatabase: process.env.DB_NAME,
	dbUsername: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	prod: process.env.NODE_ENV === 'production',
	botToken: process.env.BOT_TOKEN,
	domainURL: process.env.HOSTNAME,
};
