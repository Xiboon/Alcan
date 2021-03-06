const dayjs = require('dayjs')
module.exports = async (client, message, args) => {
    let embed = new client.disc.MessageEmbed()
    .setTitle(message.lang.title)
    .setColor(client.color)
    .setFooter(client.footer)
    .setThumbnail(message.guild.iconURL({dymamic: true}))
    .setDescription(`${message.guild.name}`)
    .addField(message.lang.fields[0], dayjs(message.guild.createdTimestamp))
    .addField(message.lang.fields[1], message.guild.owner.user.tag)
    .addField(message.lang.fields[2], message.guild.region)
    .addField(message.lang.fields[3], message.guild.memberCount)
    .addField(message.lang.fields[4], member.guild.channels.cache.size)
    .addField(message.lang.fields[5], member.guild.roles.cache.size)
if(message.guild.vanityURLCode) embed.addField(message.lang.fields[6], message.guild.vanityURLCode)
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "serverinfo",
        aliases: ["si"],
        description: "Info about the guild you're in.",
        descriptionpl: "Informacje o serwerze",
        category: "Tools", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }