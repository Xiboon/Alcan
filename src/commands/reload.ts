import AlcanClient from '../classes/client';
import { Message } from 'discord.js';
import { readdirSync } from 'fs';
export function run(client: AlcanClient, message: Message, args: Array<string>) {
	message.channel.send('Przeładowywanie komendy...');
	if (readdirSync('./commands/').includes(`${args[0]}.js`)) client.cmds.delete(args[0]);

	try {
		let code = client.functions.requireUncached(`./commands/${args}.js`);
		client.cmds.set(args[0], code);
	} catch (e) {
		message.channel.send('Wystąpił błąd podczas wczytywania (Czy napewno istnieje taki plik?)');
		console.error(e);
	}

	message.channel.send(`Przeładowano komendę`);
};

export const help = {
	name: 'reload',
	aliases: [],
	description: 'Reload a command!',
	descriptionpl: 'Przeładuj komendę!',
	category: 'dev', // Tools, moderation, 4fun, dev
	perm: 'BOT_DEVELOPER' // user, admin, mod, tester, dev
};
