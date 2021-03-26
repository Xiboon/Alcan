import { Connection } from 'rethinkdb';
import { Client } from 'statcord.js';
export interface config {
	token: string;
	developer: array<string>;
	tester: array<string>;
	statcord: string;
}
export interface help {
	name: string;
	aliases: Array<string>;
	description: string;
	descriptionpl: string;
	category: string;
	perm: string;
}
export interface command {
	run: function;
	help: help;
}
export interface settings {
	prefix: string;
	id: string;
	lang: string;
	wchannel?: string;
	gchannel?: string;
	wtext?: string;
	gtext?: string;
	wenabled?: boolean;
	genabled?: boolean;
}
interface functions {
	checkPerms: Module;
	clean: Module;
	convertPerms: Module;
	createCase: Module;
	getLang: Module;
	requireUncached: Module;
	getCase: Module;
}
declare module 'discord.js' {
	export interface Client {
		cmds: Map<string, Module>;
		aliases: Map<string, string>;
		color: string;
		conn: Connection;
		functions: functions;
		footer: string;
		config: config;
		version: string;
		db: Module;
	}
	export interface Guild {
		settings?: settings;
	}
	export interface GuildMember {
		perms?: Array<string>;
	}
	export interface Message {
		lang?: any;
	}
}
