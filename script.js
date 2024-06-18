async function fetchRandomCharacter() {
	const response = await fetch('/random-character');
	return response.json();
}

let currentCharacter;

window.onload = async () => {
	currentCharacter = await fetchRandomCharacter();
};

function guessCharacter() {
	const userInput = document.getElementById('characterInput').value;
	const feedback = document.getElementById('feedback');
	if (!userInput) {
		feedback.textContent = 'Veuillez entrer un nom de personnage.';
		return;
	}

	// Ici, on pourras ajouter des logiques pour comparer userInput avec currentCharacter
	// et donner des indices comme l'âge, le statut, etc.
	feedback.textContent = `Recherche en cours pour : ${userInput}`;
	// Après recherche, affiche les résultats
}

// Ajouter plus de fonctions pour afficher les indices basés sur les attributs
