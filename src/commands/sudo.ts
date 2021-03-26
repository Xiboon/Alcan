import AlcanClient from '../classes/client';
import { Message } from 'discord.js';
export async function run(client: AlcanClient, message: Message, args: Array<string>) {
	let command = args[0];
	let argss = args.slice(1);
	let run = client.cmds.get(command).run;
	message.lang = client.functions.getLang(message.guild)[command];
	run(client, message, argss);
}

export const help = {
	name: 'sudo',
	description: 'Run a command with a specific permission.',
	descriptionpl: 'Wykonaj komendę z wybraną permisją',
	aliases: [],
	category: 'dev', // Tools, moderation, 4fun, dev
	perm: 'BOT_DEVELOPER' // user, admin, mod, tester, dev
};
