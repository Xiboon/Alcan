module.exports = async (client, message, args) => {
let responses = message.lang.responses
    let embed = new client.disc.MessageEmbed()
    .setDescription(args.join(' '))
    .setColor(client.color)
    .setFooter(client.footer)
    .addField("Answer:", responses[Math.floor(Math.random() * responses.length)])
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "8ball",
        aliases: [],
        description: "Ask bot",
        descriptionpl: "Spytaj bota",
        category: "4fun", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }
