import { Client } from 'discord.js';
import Module from 'node:module';
import * as r from 'rethinkdb';
import { readdirSync } from 'fs';
import { functions } from '../util/index';
export default class AlcanClient extends Client {
	public constructor() {
		super({});
		this.cmds = new Map<string, Module>();
		this.aliases = new Map<string, string>();
		this.color = '#59bfe7';
		this.config = require('../../config.json');
		this.version = '1.2.0';
		this.footer = `Alcan ${this.version}`;
		this.functions = functions as any;
		this.db = r;
	}
	public async init(): Promise<void> {
		const client = this;
		console.log(client.functions);
		const commands = readdirSync('./commands');
		commands.forEach(async function (cmd) {
			try {
				console.log(cmd);
				const code = await import(`../commands/${cmd}`);
				const cmdname = cmd.split('.')[0];
				client.cmds.set(cmdname, code);
				// aliasy
				code.help.aliases.forEach(function (alias: string) {
					client.aliases.set(alias, cmdname);
				});
			} catch (e) {
				console.error(e);
			}
		});
		// events handler
		const events = readdirSync('./events');
		events.forEach(async function (evt) {
			try {
				const code = await import(`../events/${evt}`);
				const evtname = evt.split('.')[0];
				client.on(evtname, (event) => {
					code.run(client, event);
				});
			} catch (e) {
				console.error(e);
			}
		});
	}
}
