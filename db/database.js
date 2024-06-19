import pkg from 'pg';
const { Client } = pkg;

import { logLogger, errorLogger } from '../config/winston/winston.config.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

export const connectToDatabase = async () => {
	try {
		await client.connect();
		logLogger(
			'Connecté avec succès à la base de données PostgreSQL',
			'connectToDatabase'
		);
	} catch (e) {
		errorLogger(
			'Erreur lors de la connexion à la base de données PostgreSQL:' +
				e.stack,
			'connectToDatabase'
		);
	}
};

export const createTablePreferences = async () => {
	try {
		const checkTableQuery = `SELECT to_regclass('preferences') as table_exists;`;
		const result = await client.query(checkTableQuery);
		if (result.rows[0].table_exists === null) {
			const createTableQuery = `
                CREATE TABLE preferences (
                    user_id SERIAL PRIMARY KEY,
                    status_hint BOOLEAN NOT NULL DEFAULT true,
                    crew_hint BOOLEAN NOT NULL DEFAULT true,
                    devil_fruit_hint BOOLEAN NOT NULL DEFAULT true,
                    bounty_hint BOOLEAN NOT NULL DEFAULT true,
                    age_hint BOOLEAN NOT NULL DEFAULT true,
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                );
            `;
			await client.query(createTableQuery);
			console.log('Table [preferences] créée avec succès');
		} else {
			console.log('La table [preferences] existe déjà.');
		}
	} catch (e) {
		console.error(
			'Erreur lors de la création/vérification de la table [preferences]: ' +
				e.message
		);
		errorLogger(
			'Erreur lors de la création/vérification de la table [preferences]',
			'createTablePreferences',
			'',
			'',
			e.message
		);
	}
};

export default { connectToDatabase, createTablePreferences };
