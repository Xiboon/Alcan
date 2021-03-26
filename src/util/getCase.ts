import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
export async function run(client: AlcanClient, guild: Guild, nr: string) {
	return client.db
		.table('Case')
		.getAll([guild.id, parseInt(nr)], { index: 'case' })
		.coerceTo('array')
		.run(client.conn);
};
