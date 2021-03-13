import { Client } from "discord.js"
import Module from "node:module";
import * as r from "rethinkdb"
import { readdirSync } from "fs"
export default class AlcanClient extends Client {
public constructor() {
    super({})
        this.cmds = new Map<string, Module>();
        this.aliases = new Map<string, string>();
        this.color = "#6600ff";
        this.config = require('../config.json')
        this.version = "1.1.0";
        this.footer = `Alcan ${this.version}`;
        this.functions = require('./functions/index')
        this.db = r

    
}
public conn: any = async function(){await r.connect( {host: 'localhost', port: 28015})}()
public async init(token: string) {

const client = this
const commands = readdirSync("./commands")

// Commands handler
commands.forEach(function (cmd: string) {
    try {
        let code = require(`./commands/${cmd}`)
        let cmdname = cmd.split(".")[0]
        client.cmds.set(cmdname, code)
        // Aliases
        code.help.aliases.forEach(function(alias: string){
            client.aliases.set(alias, cmdname)
        })
    }
    catch (e) {
        console.error(e)
    }
})

const events = readdirSync("./events")
events.forEach(function (evt: string) {
    try {
        let code = require(`./events/${evt}`)
        let evtname = evt.split(".")[0]
        client.on(evtname, code.bind(null, client))
    }
    catch (e) {
        console.error(e)
    }
})
client.login(token)
}

}