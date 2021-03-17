import { Client } from 'discord.js';
import Module from 'node:module';
import * as r from 'rethinkdb';
import { readdirSync } from 'fs';
export default class AlcanClient extends Client {
	public constructor() {
		super({});
		this.cmds = new Map<string, Module>();
		this.aliases = new Map<string, string>();
		this.color = '#6600ff';
		this.config = require('../../config.json');
		this.version = '1.1.0';
		this.footer = `Alcan ${this.version}`;
		this.functions = require('../functions/index');
		this.db = r;
	}
	public init(): void {
		const client = this;
		const commands = readdirSync('./commands');
		commands.forEach(function (cmd) {
			try {
				let code = require(`../commands/${cmd}`);
				let cmdname = cmd.split('.')[0];
				client.cmds.set(cmdname, code);
				// aliasy
				code.help.aliases.forEach(function (alias: string) {
					client.aliases.set(alias, cmdname);
				});
			} catch (e) {
				console.error(e);
			}
		});
		console.log('2/3');
		// events handler
		const events = readdirSync('./events');
		events.forEach(function (evt) {
			try {
				let code = require(`../events/${evt}`);
				let evtname = evt.split('.')[0];
				client.on(evtname, code.bind(null, client));
			} catch (e) {
				console.error(e);
			}
		});
		console.log('jazda');
	}
}
