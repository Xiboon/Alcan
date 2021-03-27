import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
export async function run(client: AlcanClient, message: Message, args: Array<string>) {
	let embed = new MessageEmbed()
		.setTitle('Ping')
		.setColor(client.color)
		.setFooter(client.footer)
		.setDescription('Pong')
		.setTimestamp()
		.addField(message.lang, client.ws.ping + 'ms');
	message.channel.send(embed);
}

export const help = {
	name: 'ping',
	aliases: ['delay', 'latency'],
	description: "Check bot's ping",
	descriptionpl: 'Sprawdź ping bota',
	category: 'Tools', // Tools, Moderation, 4fun, dev
	perm: 'NULL', // user, admin, mod, tester, dev
};
