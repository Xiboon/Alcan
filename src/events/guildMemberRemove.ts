import { GuildMember, TextChannel, MessageEmbed } from 'discord.js';
import AlcanClient from '../classes/client';
export async function run(client: AlcanClient, member: GuildMember) {
	let settings = await client.db.table('ServerSettings').get(member.guild.id).run(client.conn);
	if (!settings.genabled || !settings.gtext) return;
	member.guild.settings = settings;
	let lang = client.functions.getLang(member.guild).events.guildMemberRemove;
	let text = settings.gtext
		.replaceAll('{mention}', member.user)
		.replaceAll('{nick}', member.user.username)
		.replaceAll('{username}', member.user.tag)
		.replaceAll('{memberCount}', member.guild.memberCount)
		.replaceAll('{serverName}', member.guild.name);
	let embed = new MessageEmbed()
		.setTitle(lang)
		.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
		.setDescription(text);
	(client.channels.cache.get(settings.gchannel) as TextChannel)?.send(embed);
};
