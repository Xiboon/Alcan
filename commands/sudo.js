module.exports = (client, message, args) => {
    const { performance } = require("perf_hooks")
    let perm = args[0]
    let command = args[1]
    let argss = args.slice(2)
    let run = client.cmds.get(command)
    message.member.perms = ["user", perm]
    message.lang = client.functions.getLang(message.guild)[command]
    let p1 = performance.now()

run(client, message, argss)
    let p2 = performance.now()
    message.channel.send(`It took me ${p2 - p1} to run this command.`)
}

module.exports.help = {
    name: "sudo",
    description: "Run a command with a specific permission.",
    descriptionpl: "Wykonaj komendę z wybraną permisją",
    aliases: [],
    category: "dev", // Tools, moderation, 4fun, dev
    perm: "dev" // user, admin, mod, tester, dev
}