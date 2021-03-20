import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
module.exports = async (client: AlcanClient, guild: Guild, nr: string) => {
	return client.db
		.table('Case')
		.getAll([guild.id, parseInt(nr)], { index: 'case' })
		.coerceTo('array')
		.run(client.conn);
};
