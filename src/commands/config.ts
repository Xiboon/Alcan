import AlcanClient from '../classes/client';
import { Message, MessageEmbed } from 'discord.js';
module.exports.run = async (client: AlcanClient, message: Message, args: Array<string>) => {
	const save = (toSave: string, value: string | boolean | undefined) => {
		client.db
			.table('ServerSettings')
			.get(message.guild?.id)
			.update({ [toSave]: value })
			.run(client.conn);
	};
	const settings = await client.db.table('ServerSettings').get(message.guild?.id).run(client.conn);

	let what = false;
	let channel, embed;
	switch (args[0]) {
		case '1':
			if (!args[1]) return message.reply(message.lang.notspecified);
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[0])
				.setDescription(
					`${message.lang.changes[0]} ${settings.prefix || message.lang.none} ${
						message.lang.changes[1]
					} ${args[1]}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('prefix', args[1]);
			message.channel.send(embed);
			break;
		case '2':
			if (!args[1]) return message.reply(message.lang.notspecified);
			channel = message.mentions.channels.first() || client.channels.cache.get(args[0]);
			if (!channel) return message.reply(message.lang.wrongchannel);
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[1])
				.setDescription(
					`${message.lang.changes[0]} ${
						client.channels.cache.get(settings.wchannel) || message.lang.none
					} ${message.lang.changes[1]} ${channel}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('wchannel', message.mentions?.channels?.firstKey());
			message.channel.send(embed);
			break;
		case '3':
			if (!args[1]) return message.reply(message.lang.notspecified);
			channel = message.mentions.channels.first() || client.channels.cache.get(args[0]);
			if (!channel) return message.reply(message.lang.wrongchannel);
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[2])
				.setDescription(
					`${message.lang.changes[0]}${
						client.channels.cache.get(settings.gchannel) || message.lang.none
					} ${message.lang.changes[1]} ${channel}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('gchannel', channel.id);
			message.channel.send(embed);
			break;
		case '4':
			if (!args[1]) return message.reply(message.lang.notspecified);
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[3])
				.setDescription(
					`${message.lang.changes[0]}${settings.wtext || message.lang.none} ${
						message.lang.changes[1]
					} ${args[1]}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('wtext', args[1]);
			message.channel.send(embed);
			break;
		case '5':
			if (!args[1]) return message.reply(message.lang.notspecified);
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[4])
				.setDescription(
					`${message.lang.changes[0]} ${settings.gtext || message.lang.none} ${
						message.lang.changes[1]
					} ${args[1]}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('gtext', args[1]);
			message.channel.send(embed);
			break;
		case '6':
			if (settings.wenabled) what = false;
			if (!settings.wenabled) what = true;
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[5])
				.setDescription(
					`${message.lang.changes[0]} ${
						settings.wenabled ? message.lang.enabled : message.lang.disabled
					} to ${what ? message.lang.enabled : message.lang.disabled}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('wenabled', what);
			message.channel.send(embed);
			break;
		case '7':
			if (settings.wenabled) what = false;
			if (!settings.wenabled) what = true;
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[6])
				.setDescription(
					`${message.lang.changes[0]} ${
						settings.genabled ? message.lang.enabled : message.lang.disabled
					} ${message.lang.changes[1]} ${what ? 'enabled' : 'disabled'}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('genabled', what);
			message.channel.send(embed);
			break;
		case '8':
			if (!args[1]) return message.reply(message.lang.notspecified);
			// @ts-ignore
			if (!args[1].toLowerCase() === 'pl' || !args[1].toLowerCase() === 'en')
				return message.reply(message.lang.wronglang + message.lang.validoptions + ': pl, en');
			embed = new MessageEmbed()
				.setTitle(message.lang.settings[7])
				.setDescription(
					`${message.lang.changes[0]} ${settings.lang} ${message.lang.changes[1]} ${args[1]}`
				)
				.setFooter(client.footer)
				.setColor(client.color);
			save('lang', args[1].toLowerCase());
			message.channel.send(embed);
			break;
		default:
			embed = new MessageEmbed()
				.setTitle(message.lang.defaultt.ss)
				.setDescription(message.lang.defaultt.dscp + 'a!config <number> <value>')
				.addField(message.lang.defaultt.p, settings.prefix || 'a!')
				.addField(
					message.lang.defaultt.w,
					message.guild?.channels.cache.get(settings.wchannel) || message.lang.none
				)
				.addField(
					message.lang.defaultt.g,
					message.guild?.channels.cache.get(settings.gchannel) || message.lang.none
				)
				.addField(message.lang.defaultt.wt, settings.wtext || message.lang.none)
				.addField(message.lang.defaultt.gt, settings.gtext || message.lang.none)
				.addField(
					message.lang.defaultt.we,
					settings.wenabled ? message.lang.enabled : message.lang.disabled
				)
				.addField(
					message.lang.defaultt.ge,
					settings.genabled ? message.lang.enabled : message.lang.disabled
				)
				.addField(message.lang.defaultt.lg, settings.lang || '')
				.setFooter(client.footer)
				.setColor(client.color);
			message.channel.send(embed);
	}
};

module.exports.help = {
	name: 'config',
	aliases: ['settings'],
	description: "Configure your server's settings!",
	descriptionpl: 'Skonfiguruj ustawienia swojego serwera!',
	category: 'Tools',
	perm: 'admin'
};
