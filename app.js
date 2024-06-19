import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import http from 'http'; // Assure-toi d'importer 'http' si tu l'utilises pour créer un serveur
import { logLogger } from './config/winston/winston.config.js'; // Assure-toi que le chemin est correct et utilise l'extension .js si nécessaire

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
import databaseConfig from './config/databaseConfig.js';

// Initialize database tables
databaseConfig.init();

app.use(express.static('views'));
app.use(express.static('public'));
app.get('/random-character', async (req, res) => {
	try {
		const response = await fetch(
			'https://api.api-onepiece.com/v2/characters/fr'
		);
		const characters = await response.json();
		const randomIndex = Math.floor(Math.random() * characters.length);
		const character = characters[randomIndex];
		res.json(character);
	} catch (error) {
		res.status(500).send('Error fetching character data: ' + error.message);
	}
});

server.listen(port, () => {
	logLogger(`App listening on port ${port}`, 'App');
});
