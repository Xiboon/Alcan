import AlcanClient from '../classes/client';
import { Guild, User } from 'discord.js';
export default async function createCase(
	client: AlcanClient,
	guild: Guild,
	user: User,
	creator: User,
	type: string,
	dscp: string
): Promise<object> {
	let values = await client.db
		.table('Case')
		.getAll(guild.id, { index: 'id' })
		.orderBy(client.db.desc('nr'))
		.limit(1)
		.run(client.conn);
	let nr1;
	console.log(values);
	if (values[0] && values[0].nr) nr1 = values[0].nr;
	else nr1 = 0;

	return { nr: nr1 + 1, id: guild.id, user: user, creator: creator, type: type, dscp: dscp };
};
