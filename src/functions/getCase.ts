import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
module.exports = async (client: AlcanClient, guild: Guild, nr: number) => {
	const casee = await client.db
		.table('Case')
		.getAll([guild.id, nr], { index: 'case' })
		.run(client.conn);
	return casee;
};
