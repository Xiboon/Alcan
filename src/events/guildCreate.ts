import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
export function run(client: AlcanClient, guild: Guild) {
	client.db
		.table('ServerSettings')
		.insert({ id: guild.id, prefix: 'a!', lang: 'en' })
		.run(client.conn);
};
