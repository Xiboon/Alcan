import { MessageEmbed, GuildMember, TextChannel } from 'discord.js';
import AlcanClient from '../classes/client';
module.exports = async (client: AlcanClient, member: GuildMember) => {
	let settings = await client.db.table('ServerSettings').get(member.guild.id).run(client.conn);
	if (!settings.wenabled) return;
	member.guild.settings = settings;
	let lang = client.functions.getLang(member.guild).events.guildMemberAdd;
	let text = settings.wtext
		.replaceAll('{mention}', member.user)
		.replaceAll('{nick}', member.user.username)
		.replaceAll('{username}', member.user.tag)
		.replaceAll('{memberCount}', member.guild.memberCount)
		.replaceAll('{serverName}', member.guild.name);
	let embed = new MessageEmbed()
		.setTitle(lang)
		.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
		.setDescription(text)
		.setFooter(client.footer)
		.setColor(client.color);
	(client.channels.cache.get(settings.wchannel) as TextChannel).send(embed);
};
