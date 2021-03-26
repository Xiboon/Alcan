import AlcanClient from '../classes/client';
import { GuildMember, PermissionResolvable } from 'discord.js';
export default function run(
	client: AlcanClient,
	member: GuildMember,
	perm: PermissionResolvable | string
): boolean {
	switch (perm) {
		case 'BOT_DEVELOPER':
			if (client.config.developer.includes(member.id)) return true;
			else return false;
		case 'BOT_TESTER':
			if (client.config.developer.includes(member.id)) return true;
			if (client.config.tester.includes(member.id)) return true;
			else return false;
		default:
			if (perm === 'NULL') return true;
			// @ts-ignore
			if (member.hasPermission(perm)) return true;
			else return false;
	}
}
