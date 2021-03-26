import dayjs from 'dayjs';
import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
export async function run(client: AlcanClient, message: Message, args: Array<string>) {
	let member = message.mentions.members?.first() || message.member;
	let user =
		message.mentions.users.first() ||
		(await client.users.fetch(args[0]).catch(err => {})) ||
		message.author;
	let embed = new MessageEmbed()
		.setTitle(message.lang.title)
		.setColor(client.color)
		.setFooter(client.footer)
		.setThumbnail(user.displayAvatarURL({ dynamic: true }))
		.setDescription(`${user.tag}`);
	if (member?.nickname) embed.addField(message.lang.fields[0], member?.nickname);
	embed.addField(message.lang.fields[1], dayjs(user.createdTimestamp));
	// @ts-ignore
	if (member) embed.addField(message.lang.fields[2], dayjs(member.joinedTimestamp));
	message.channel.send(embed);
}

export const help = {
	name: 'userinfo',
	aliases: ['ui'],
	description: 'Info about  an user.',
	descriptionpl: 'Informacje o użytkowniku',
	category: 'Tools', // Tools, Moderation, 4fun, dev
	perm: 'NULL' // user, admin, mod, tester, dev
};
