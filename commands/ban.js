module.exports = async (client, message, args) => {
let user =  message.mentions.users.first() || await client.users.fetch(args[0]).catch(err=>{})
let reason = args.slice(1).join(" ") || message.lang.noreason;
    if (!user) return message.channel.send(message.lang.nouser)
let casecreate = await client.functions.createCase(client, message.guild, user, message.author.tag, "ban", reason);
    client.db.table("Case").insert(casecreate).run(client.conn);
try {
    message.guild.members.ban(user, {reason: reason})
}
catch(e) {
    let error = new client.disc.MessageEmbed()
        .setTitle(message.lang.error1)
        .setDescription(message.lang.error2)
        .setColor(client.color)
        .setFooter(client.footer)
    message.channel.send(error)
}
let banembed = new client.disc.MessageEmbed()
.setColor(client.color)
.setFooter(client.setFooter)
.setTitle("Ban")
.addField(message.lang.ban, user.tag)
.addField(message.lang.ban2, message.author.tag)
.addField(message.lang.reason, reason);
message.channel.send(banembed)
    client.db.table("Case").insert(casecreate).run(client.conn);
}

module.exports.help = {
    name: "ban",
    aliases: [],
    description: "Ban a user in your guild.",
    descriptionpl: "Zbanuj użytkownika na swoim serwerze",
    category: "Moderation", // Tools, Moderation, 4fun, dev
    perm: "admin" // user, admin, mod, tester, dev
}