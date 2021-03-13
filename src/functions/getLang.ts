import { Guild } from "discord.js"
module.exports = function(guild: Guild) {
    let lang;
    if (!guild.settings) return new Error("xibon idioto czemu wsadzasz obiekt guild ktory nie ma settings!!!!")
    if (guild.settings.lang == "pl") {
        lang = require("./translations/pl.json")
    }
    else {
        lang = require("./translations/en.json")
    }
    return lang;
}
