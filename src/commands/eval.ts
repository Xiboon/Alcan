import type AlcanClient from '../classes/client';
import type { Message } from 'discord.js';
module.exports.run = async (client: AlcanClient, message: Message, args: Array<string>) => {
	if (args.includes('client.token'))
		return message.channel.send(
			"I'm not gonna run this code. Delete client.token and then run the code again."
		);

	const codex = args.join(' ');
	const code = codex.replace('client.token', '"chuj ci w dupke"');
	try {
		const evaled = eval(code);
		const clean = await client.functions.clean(client, evaled);
		message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
		message.react('✅');
	} catch (err) {
		message.channel.send(`KEKŁO SIĘ NO`);
		message.channel.send(
			`\`ERROR\` \`\`\`xl\n${await client.functions.clean(client, err)}\n\`\`\``
		);
		// message.channel.send(await client.clean(client, err))
		message.react('❌');
	}
};

module.exports.help = {
	name: 'eval',
	aliases: ['evaluate', 'run', 'e'],
	description: 'Evaluates your JS code. Works only for developers.',
	descriptionpl: 'Ewaluuj kod JS. Działa tylko dla developerów.',
	category: 'dev',
	perm: 'dev' // user, moderator admin, tester,  dev
};
