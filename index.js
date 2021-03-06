
const discord = require("discord.js")
const fs = require("fs")
const r = require('rethinkdb')
const Statcord = require("statcord.js")
const { performance } = require("perf_hooks")
let client = new discord.Client({
    cacheGuilds: true,
    cacheChannels: false,
    cacheOverwrites: false,
    cacheRoles: false,
    cacheEmojis: false,
    cachePresences: false
})
client.config = require("./config.json")
const statcord = new Statcord.Client({
    client,    key: client.config.statcord,
    postCpuStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
});
client.disc = discord;
client.cmds = new Map();
client.aliases = new Map();
client.statcord = statcord
client.color = "#6600ff";
client.version = "1.1.0";
client.footer = `Alcan ${client.version}`;
client.functions = require('./functions.js')
client.on("ready", function() {
    client.channels.fetch('806900774105251860');
    console.log("Gotowy")
    statcord.autopost()
})

// baza danych
client.db = r;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    client.conn = conn;
    console.log('Połączono z bazą danych')
})
// commands handler
let c1 = performance.now()
let commands = fs.readdirSync("./commands")
commands.forEach(function (cmd) {
    try {
        code = require(`./commands/${cmd}`)
        cmdname = cmd.split(".")[0]
        client.cmds.set(cmdname, code)
        // aliasy
        code.help.aliases.forEach(function(alias){
            client.aliases.set(alias, cmdname)
        })
    }
    catch (e) {
        console.error(e)
    }
})
let c2 = performance.now()
console.log(`Loaded commands! It took me ${Math.round(c2 - c1)}ms to load all commands.`)
// events handler
e1 = performance.now()
const events = fs.readdirSync("./events")
events.forEach(function (evt) {
    try {
        let code = require(`./events/${evt}`)
        let evtname = evt.split(".")[0]
        client.on(evtname, code.bind(null, client))
    }
    catch (e) {
        console.error(e)
    }
})
const e2 = performance.now();
console.log(`Loaded events! It took me ${Math.round(e2 - e1)}ms to load all events.`)
// error handler
process.on("unhandledRejection", err => {
    console.error(`Unhandled rejection: ${err}`);
    client.channels.cache.get('806900774105251860').send(`Błąd: \n\`\`\`${err.stack}\`\`\``)
});
client.login(client.config.token)

