import { Module } from 'node:module';
import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
import type { command } from '../types';
export function run(client: AlcanClient, message: Message, args: Array<string>) {
	if (!message.guild || !message.guild.settings) return;
	const cmds: Array<command> = Array.from(client.cmds.values());
	const fun =
		cmds
			.filter((cmd) => cmd.help.category === '4fun')
			.map((c) => c.help.name)
			.join(` \n`) || 'None';
	const tools =
		cmds
			.filter((cmd) => cmd.help.category === 'Tools')
			.map((c) => `${c.help.name}`)
			.join(` \n`) || 'None';
	const moderation =
		cmds
			.filter((cmd) => cmd.help.category === 'Moderation')
			.map((c) => `${c.help.name}`)
			.join(` \n`) || 'None';
	const dev =
		cmds
			.filter((cmd) => cmd.help.category === 'dev')
			.map((c) => `${c.help.name}`)
			.join(` \n`) || 'None';

	const embed = new MessageEmbed()
		.setTitle('Alcan')
		.setDescription(message.lang.all)
		.addField(message.lang.fun, `\`\`\`${message.guild.settings.prefix}help 4fun\`\`\``)
		.addField(message.lang.tools, `\`\`\`${message.guild.settings.prefix}help tools\`\`\``)
		.addField(message.lang.mod, `\`\`\`${message.guild.settings.prefix}help mod\`\`\``)
		.setFooter(client.footer)
		.setTimestamp()
		.setColor(client.color);
	let funembed = new MessageEmbed()
		.setTitle(message.lang.fun)
		.setDescription(fun)
		.setFooter(client.footer)
		.setTimestamp()
		.setColor(client.color);

	let toolsembed = new MessageEmbed()
		.setTitle(message.lang.tools)
		.setDescription(tools)
		.setFooter(client.footer)
		.setTimestamp()
		.setColor(client.color);

	let modembed = new MessageEmbed()
		.setTitle(message.lang.mod)
		.setDescription(moderation)
		.setFooter(client.footer)
		.setTimestamp()
		.setColor(client.color);

	let devembed = new MessageEmbed()
		.setTitle('Developer Tools')
		.setDescription(dev)
		.setFooter(client.footer)
		.setTimestamp()
		.setColor(client.color);

	switch (args[0]?.toLowerCase()) {
		case '4fun':
			message.channel.send(funembed);
			break;

		case 'tools':
			message.channel.send(toolsembed);
			break;

		case 'mod':
			message.channel.send(modembed);
			break;
		case 'dev':
			message.channel.send(devembed);
			break;

		default:
			if (!args[0]) return message.channel.send(embed);
			const cmd = client.cmds.get(args[0]);
			if (!cmd) return;
			if (message.guild.settings.lang === 'pl') {
				cmd.help.description = cmd.help.descriptionpl;
			}
			let infoembed = new MessageEmbed()
				.setTitle(message.lang.info.info)
				.addField(message.lang.info.cmdname, cmd.help.name)
				.addField(message.lang.info.dscp, cmd.help.description)
				.addField(message.lang.info.category, cmd.help.category)
				.addField(message.lang.info.alias, cmd.help.aliases)
				.setFooter(client.footer)
				.setTimestamp()
				.setColor(client.color);
			message.channel.send(infoembed);
			break;
	}
}
export const help = {
	name: 'help',
	aliases: ['commands', 'h'],
	description: 'All commands listed!',
	descriptionpl: 'Lista wszystkich komend!',
	category: 'Tools',
	perm: 'NULL',
};
