module.exports = async (client, guild) => {
    client.db.table('ServerSettings').get(guild.id).delete().run(client.conn)
}