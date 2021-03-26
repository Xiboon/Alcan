import dayjs from 'dayjs';
import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
export async function run(client: AlcanClient, message: Message, args: Array<string>) {
	if (!message.guild) return;
	let embed = new MessageEmbed()
		.setTitle(message.lang.title)
		.setColor(client.color)
		.setFooter(client.footer)
		.setThumbnail(
			message.guild.iconURL({ dynamic: true }) ||
				'https://discord.com/assets/28174a34e77bb5e5310ced9f95cb480b.png'
		)
		.setDescription(`${message.guild.name}`)
		.addField(message.lang.fields[0], dayjs(message.guild.createdTimestamp))
		.addField(message.lang.fields[2], message.guild.region)
		.addField(message.lang.fields[3], message.guild.memberCount)
		.addField(message.lang.fields[4], message.guild.channels.cache.size)
		.addField(message.lang.fields[5], message.guild.roles.cache.size);
	if (message.guild.vanityURLCode)
		embed.addField(message.lang.fields[6], message.guild.vanityURLCode);
	message.channel.send(embed);
}

export const help = {
	name: 'serverinfo',
	aliases: ['si'],
	description: "Info about the guild you're in.",
	descriptionpl: 'Informacje o serwerze',
	category: 'Tools', // Tools, Moderation, 4fun, dev
	perm: 'NULL' // user, admin, mod, tester, dev
};
