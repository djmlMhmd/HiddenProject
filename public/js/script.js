let currentCharacter;
let attempts = 0;
const maxAttempts = 5;

window.onload = async () => {
	resetGame();
};

async function fetchRandomCharacter() {
	const response = await fetch('/random-character');
	return response.json();
}

async function resetGame() {
	currentCharacter = await fetchRandomCharacter();
	attempts = 0;
	document.getElementById('feedback').innerHTML = '';
	document.getElementById('characterInput').value = '';
	document.getElementById('characterInput').disabled = false;
	document.getElementById('guessButton').disabled = false;
}

function guessCharacter() {
	const userInput = document.getElementById('characterInput').value.trim();
	const feedback = document.getElementById('feedback');

	if (!userInput) {
		feedback.textContent = 'Veuillez entrer un nom de personnage.';
		return;
	}

	attempts++;

	if (userInput.toLowerCase() === currentCharacter.name.toLowerCase()) {
		feedback.innerHTML = `Félicitations! Vous avez correctement deviné : ${currentCharacter.name}. <button onclick="resetGame()">Rejouer</button>`;
		document.getElementById('characterInput').disabled = true;
		document.getElementById('guessButton').disabled = true;
		return;
	} else if (attempts >= maxAttempts) {
		feedback.innerHTML = `Désolé, vous avez épuisé vos tentatives. Le personnage était ${currentCharacter.name}. <button onclick="resetGame()">Rejouer</button>`;
		document.getElementById('characterInput').disabled = true;
		document.getElementById('guessButton').disabled = true;
		return;
	} else {
		let hints = generateHints(userInput);
		feedback.innerHTML = `Non, ce n'est pas ${userInput}. Tentative ${attempts} sur ${maxAttempts}.<br>Indices:<br> ${hints.join(
			'<br>'
		)}`;
	}
}

function generateHints(userInput) {
	let hints = [];

	// Comparaison et indices sur le statut vivant ou mort
	if (currentCharacter.status) {
		hints.push(`Statut: ${currentCharacter.status}`);
	}

	// Indice sur l'appartenance à un équipage
	if (currentCharacter.crew && currentCharacter.crew.name) {
		hints.push(`Équipage: ${currentCharacter.crew.name}`);
	}

	// Indice sur l'utilisation d'un fruit du démon
	if (currentCharacter.fruit && currentCharacter.fruit.name) {
		hints.push(
			`Possède un fruit du démon: Oui (${currentCharacter.fruit.name})`
		);
	} else {
		hints.push('Possède un fruit du démon: Non');
	}

	// Indice sur la dernière prime connue
	if (currentCharacter.bounty) {
		hints.push(`Dernière prime connue: ${currentCharacter.bounty}`);
	}

	// Indice sur l'âge
	if (currentCharacter.age) {
		hints.push(`Âge: ${currentCharacter.age}`);
	}

	feedback.innerHTML = `Non, ce n'est pas ${userInput}. <br>Indices:<br> ${hints.join(
		'<br>'
	)}`;

	// Ajouter d'autres indices ici selon les propriétés de currentCharacter

	return hints;
}
