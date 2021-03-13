import AlcanClient from './classes/client';
const client = new AlcanClient();
// Error handler
process.on('unhandledRejection', err => {
	console.error(`Unhandled rejection: ${err}`);
	// @ts-ignore
	client.users.cache.get('707675871355600967').send(`Błąd: \n\`\`\`${err.stack}\`\`\``);
});
client.init(client.config.token);
