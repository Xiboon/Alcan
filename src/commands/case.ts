import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
module.exports.run = async (client: AlcanClient, message: Message, args: Array<string>) => {
	if (!args[0]) return message.reply(message.lang.error);
	const caseArray = await client.functions.getCase(client, message.guild, args[0]);
	const Case = caseArray[0];
	const user = client.users.cache.get(Case.user);
	const creator = client.users.cache.get(Case.creator);
	if (!Case) return message.reply(message.lang.error);
	const embed = new MessageEmbed()
		.setTitle(message.lang.push)
		.setColor(client.color)
		.setFooter(client.footer)
		.setDescription(message.lang.dscp + Case.dscp)
		.addField(message.lang['ID'], Case.nr)
		.addField(message.lang.type, Case.type)
		.addField(message.lang.target, user?.tag)
		.addField(message.lang.moderator, creator?.tag);
	message.channel.send(embed);
};
module.exports.help = {
	name: 'case',
	description: 'Check info about a punishment',
	descriptionpl: 'Sprawdź informacje o karze',
	aliases: ['punishments'],
	category: 'Tools', // Tools, moderation, 4fun, dev
	perm: 'admin' // user, admin, mod, tester, dev
};
