import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
module.exports = async (client: AlcanClient, guild: Guild) => {
	client.db
		.table('ServerSettings')
		.insert({ id: guild.id, prefix: 'a!', lang: 'en' })
		.run(client.conn);
};
