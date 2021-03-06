const dayjs = require('dayjs')
module.exports = async (client, message, args) => {

    let member = message.mentions.users.first() || await client.users.fetch(args[0]).catch(err=>{}) || message.author
    let embed = new client.disc.MessageEmbed()
    .setTitle(message.lang.title)
    .setColor(client.color)
    .setFooter(client.footer)
    .setThumbnail(user.displayAvatarURL({dymamic: true}))
    .setDescription(`${user.tag}`)
    if(member.nickname) embed.addField(message.lang.fields[0], member.nickname);
    embed.addField(message.lang.fields[1], dayjs(user.createdTimestamp));
    if(member) embed.addField(message.lang.fields[2], dayjs(member.joinedTimestamp));
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "userinfo",
        aliases: ["ui"],
        description: "Info about  an user.",
        descriptionpl: "Informacje o użytkowniku",
        category: "Tools", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }