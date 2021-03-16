import { MessageEmbed, Message } from 'discord.js';
import AlcanClient from '../classes/client';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/pl');
module.exports = async function (client: AlcanClient, message: Message) {
	if (message.channel.type === 'dm' || !message || !message.guild || !message.member) return;
	message.guild.settings = await client.db
		.table('ServerSettings')
		.get(message.guild.id)
		.run(client.conn);

	const prefix = message.guild.settings?.prefix || 'a!',
		args = message.content.slice(prefix.length).split(' '),
		cmdname = args.shift(),
		lang = client.functions.getLang(message.guild).events.message;

	dayjs.extend(duration);
	dayjs.extend(relativeTime);
	dayjs.locale(message.guild?.settings?.lang);
	let uptime = dayjs.duration(client.uptime || 0).humanize();
	message.lang = client.functions.getLang(message.guild)[cmdname];
	if (
		message.content === `<@${client.user?.id}> ` ||
		message.content === `<@!${client.user?.id}>`
	) {
		let embed = new MessageEmbed()
			.setTitle('Alcan')
			.setDescription(
				`${lang.dscp} ${prefix}, [${lang.add}](https://discord.com/oauth2/authorize?client_id=${client.user?.id}&scope=bot&permissions=8)`
			)
			.addField(lang.cmds, client.cmds.size)
			.addField(lang.guilds, client.guilds.cache.size)
			.addField(lang.users, client.users.cache.size)
			.addField(lang.channels, client.channels.cache.size)
			.addField('Uptime', uptime || '?');
		message.channel.send(embed);
	}
	if (message.content.startsWith(prefix)) {
		// @ts-ignore
		let cmd = client.cmds.get(cmdname) || client.cmds.get(client.aliases.get(cmdname));
		if (!cmd) return message.react('❌');
		let permsNeeded = cmd.help.perm;
		message.member.perms = client.functions.checkPerms(client, message.member, message.guild);

		if (!message.member.perms?.includes(permsNeeded)) {
			let embed = new MessageEmbed()
				.setTitle(lang.perms1)
				.setDescription(lang.perms2 + client.functions.convertPerms(permsNeeded, message.guild))
				.setColor(client.color)
				.setFooter(client.footer);
			return message.channel.send(embed);
		}

		cmd.run(client, message, args);
		if (cmd.help.category === 'dev') return;
	}
};
