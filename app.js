import express from 'express';
import fetch from 'node-fetch';

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
