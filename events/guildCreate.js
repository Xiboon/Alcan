module.exports = async (client, guild) => {
    client.db.table('ServerSettings').insert({id: guild.id, prefix: 'a!', lang: "en"}).run(client.conn)
}