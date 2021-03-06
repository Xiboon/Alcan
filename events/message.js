module.exports = async function(client, message) {
    if (message.channel.type === "dm") return;
    message.guild.settings = await client.db.table("ServerSettings").get(message.guild.id).run(client.conn)
    require("dayjs/locale/pl")

    const dayjs = require("dayjs"),
    duration = require('dayjs/plugin/duration'),
    relativeTime = require('dayjs/plugin/relativeTime');

    let prefix = message.guild.settings.prefix || "a!",
    args = message.content.slice(prefix.length).split(" "),
    cmdname = args.shift(),
    lang = client.functions.getLang(message.guild).events.message;

    dayjs.extend(duration)
    dayjs.extend(relativeTime)
    dayjs.locale(message.guild.settings.lang)
    let uptime = dayjs.duration(client.uptime).humanize();
    message.lang = client.functions.getLang(message.guild)[cmdname]
    if (message.mentions.members.first() === message.guild.me) {
        let embed = new client.disc.MessageEmbed()
            .setTitle("Alcan")
            .setDescription(`${lang.dscp} ${prefix}`)
            .addField(lang.guilds, client.guilds.cache.size)
            .addField(lang.users, client.users.cache.size)
            .addField(lang.channels, client.channels.cache.size)
            .addField("Uptime", uptime||"?")
        message.channel.send(embed)
    }
    if (message.content.startsWith(prefix)) {
        let cmd = client.cmds.get(cmdname) || client.cmds.get(client.aliases.get(cmdname))
        if (!cmd) return message.react("❌");
        let permsNeeded = cmd.help.perm
        message.member.perms = client.functions.checkPerms(client, message.member, message.guild)

        if (!message.member.perms.includes(permsNeeded)) {
            let embed = new client.disc.MessageEmbed()
                .setTitle(lang.perms1)
                .setDescription(lang.perms2 + client.functions.convertPerms(permsNeeded, message.guild))
                .setColor(client.color)
                .setFooter(client.footer);
          return  message.channel.send(embed)
        }


        cmd(client, message, args)
        if(cmd.help.category === "dev") return;
        client.statcord.postCommand(cmd.help.name, message.author.id)
    }
}