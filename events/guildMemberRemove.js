module.exports = async (client, member) => {
    let settings = await client.db.table('ServerSettings').get(member.guild.id).run(client.conn)
    if(!settings.genabled) return
    member.guild.settings = settings
    let lang = client.functions.getLang(member.guild).events.guildMemberRemove
    let text = settings.gtext
    .replaceAll('{mention}', member.user)
    .replaceAll('{nick}', member.user.username)
    .replaceAll('{username}', member.user.tag)
    .replaceAll('{memberCount}', member.guild.memberCount)
    .replaceAll('{serverName}', member.guild.name)
    let embed = new client.disc.MessageEmbed()
    .setTitle(lang)
    .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
    .setDescription(text)
    .setFooter(client.footer)
    .setColor(client.color)
    client.channels.cache.get(settings.gchannel).send(embed)
}