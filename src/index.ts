import AlcanClient from './classes/client';
import { connect, Connection } from 'rethinkdb';
import { readdirSync } from 'fs';
const client = new AlcanClient();
connect({}, function (err, conn) {
	if (err) throw err;
	client.conn = conn;
	console.log('Połączono z bazą danych');
});
// Error handler
process.on('unhandledRejection', (err: any) => {
	console.error(`Unhandled rejection: ${err.stack}`);
	client.users.cache.get('707675871355600967')?.send(`Błąd: \n\`\`\`${err.stack}\`\`\``);
});
client.init();
client.login(client.config.token);
