import { connectToDatabase, createTablePreferences } from '../db/database.js';

function initDatabase() {
	connectToDatabase().then(() => {
		createTablePreferences();
	});
}

export default {
	init: initDatabase,
};
