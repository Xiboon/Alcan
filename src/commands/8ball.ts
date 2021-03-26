import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
export function run(client: AlcanClient, message: Message, args: Array<string>) {
	let responses = message.lang.responses;
	let embed = new MessageEmbed()
		.setDescription(args.join(' '))
		.setColor(client.color)
		.setFooter(client.footer)
		.addField(message.lang.ans, responses[Math.floor(Math.random() * responses.length)]);
	message.channel.send(embed);
};

export const help = {
	name: '8ball',
	aliases: [],
	description: 'Ask bot',
	descriptionpl: 'Spytaj bota',
	category: '4fun', // Tools, Moderation, 4fun, dev
	perm: 'NULL' // user, admin, mod, tester, dev
};
