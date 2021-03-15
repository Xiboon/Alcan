import { MessageEmbed, Message } from 'discord.js';
import AlcanClient from '../classes/client';
module.exports.run = async (client: AlcanClient, message: Message, args: Array<string>) => {
	let member =
		message.mentions.members?.first() || (await message.guild?.members.fetch(args[0]).catch());
	let reason = args.slice(1).join(' ') || message.lang.noreason;
	let casecreate = await client.functions.createCase(
		client,
		message.guild,
		member,
		message.author.tag,
		'kick',
		reason
	);
	if (!member?.kickable) return message.reply(message.lang.noperm);
	if (!member) return message.channel.send(message.lang.noperson);
	member.kick(`${message.lang.kb} ${message.author.tag} | ${reason}`).then(() => {
		let embed = new MessageEmbed()
			.setColor(client.color)
			.setFooter(client.footer)
			.setTitle(message.lang.title)
			.addField(message.lang.kb, message.author.tag)
			.addField(message.lang.kicked, member?.user.tag)
			.addField(message.lang.reason, reason || 'No reason provided');
		message.channel.send(embed);
	});
};

module.exports.help = {
	name: 'kick',
	aliases: [],
	description: 'Kick a user in your guild.',
	descriptionpl: 'Wyrzuć użytkownika ze swojego serwera',
	category: 'Moderation', // Tools, Moderation, 4fun, dev
	perm: 'mod' // user, admin, mod, tester, dev
};
