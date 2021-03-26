import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
export function run(client: AlcanClient, guild: Guild) {
	client.db.table('ServerSettings').get(guild.id).delete().run(client.conn);
};
