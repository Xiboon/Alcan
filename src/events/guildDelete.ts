import { Guild } from 'discord.js';
import AlcanClient from '../classes/client';
module.exports = async (client: AlcanClient, guild: Guild) => {
	client.db.table('ServerSettings').get(guild.id).delete().run(client.conn);
};
