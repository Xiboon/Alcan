module.exports = (client, message, args) => {
    let cmds = Array.from(client.cmds.values())
    let fun = cmds.filter(cmd => cmd.help.category === "4fun").map(c => `${c.help.name}`).join(` \n`) || "None"
    let tools = cmds.filter(cmd => cmd.help.category === "Tools").map(c => `${c.help.name}`).join(` \n`) || "None"
    let moderation = cmds.filter(cmd => cmd.help.category === "admin").map(c => `${c.help.name}`).join(` \n`) || "None"
    let dev = cmds.filter(cmd => cmd.help.category === "dev").map(c => `${c.help.name}`).join(` \n`) || "None"

    let embed = new client.disc.MessageEmbed()
        .setTitle("Alcan")
        .setDescription(message.lang.all)
        .addField(message.lang.fun, `\`\`\`${message.guild.settings.prefix}help 4fun\`\`\``)
        .addField(message.lang.tools, `\`\`\`${message.guild.settings.prefix}help tools\`\`\``)
        .addField(message.lang.mod, `\`\`\`${message.guild.settings.prefix}help mod\`\`\``)
        .setFooter(client.footer)
        .setColor(client.color);
    let funembed = new client.disc.MessageEmbed()
        .setTitle(message.lang.fun)
        .setDescription(fun)
        .setFooter(client.footer)
        .setColor(client.color);

    let toolsembed = new client.disc.MessageEmbed()
        .setTitle(message.lang.tools)
        .setDescription(tools)
        .setFooter(client.footer)
        .setColor(client.color);

    let modembed = new client.disc.MessageEmbed()
        .setTitle(message.lang.mod)
        .setDescription(moderation)
        .setFooter(client.footer)
        .setColor(client.color);


    let devembed = new client.disc.MessageEmbed()
        .setTitle("Developer Tools")
        .setDescription(dev)
        .setFooter(client.footer)
        .setColor(client.color);


    switch (args[0].toLowerCase()) {
        case "4fun":
            message.channel.send(funembed)
            break;

        case "tools":
            message.channel.send(toolsembed)
            break;

        case "mod":
            message.channel.send(modembed)
            break;
        case "dev":
            message.channel.send(devembed)
            break;

default:
    let cmd = client.cmds.get(args[0])
    if (message.guild.settings.lang === "pl") {
        cmd.description = cmd.descriptionpl
    }
    if (!args[0]) return message.channel.send(embed)
    console.log('test')
    let infoembed = new client.disc.MessageEmbed()
        .setTitle(message.lang.info.info)
        .addField(message.lang.info.cmdname, cmd.help.name)
        .addField(message.lang.info.dscp, cmd.help.description)
        .addField(message.lang.info.category, cmd.help.category)
        .addField(message.lang.info.alias, cmd.help.aliases)
        .setFooter(client.footer)
        .setColor(client.color)
    message.channel.send(infoembed)
            break;

    }

}
module.exports.help = {
    name: "help",
    aliases: ["commands", "h"],
    description: "All commands listed!",
    descriptionpl: "Lista wszystkich komend!",
    category: "Tools",
    perm: "user"
}
