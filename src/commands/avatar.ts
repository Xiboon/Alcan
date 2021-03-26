import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
export function run(client: AlcanClient, message: Message, args: Array<string>) {
	const user = message.mentions.users.first() ?? client.users.cache.get(args[0]) ?? message.author;
	const embed = new MessageEmbed()
		.setTitle('Avatar')
		.setFooter(client.footer)
		.setColor(client.color)
		.setThumbnail(user.displayAvatarURL());
	message.channel.send(embed);
}

export const help = {
	name: 'avatar',
	description: "Check someone's avatar",
	descriptionpl: 'Sprawdź kogoś avatar',
	aliases: [],
	category: 'Tools', // Tools, moderation, 4fun, dev
	perm: 'NULL'
};
