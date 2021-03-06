module.exports.checkPerms = function (client, user, guild) {
    perms = new Array()
    perms.push("user")
    
    if (client.config.developer.includes(user.user.id)) perms.push("dev")
    if (client.config.tester.includes(user.user.id)) perms.push("tester")
    if (user.hasPermission("ADMINISTRATOR")) {
        perms.push("admin")
        perms.push("mod")
    }
    if (user.hasPermission("MANAGE_MESSAGES")) perms.push("mod")
    return perms;
}

module.exports.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });
  
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replaceAll(
        client.token,
        "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0"
      );
  
    
    
    return text;
    
  };

module.exports.createCase = async function (client, guild, user, creator, type, dscp) {
  let values = await client.db.table("Case").filter({ id: guild.id }).orderBy(client.db.desc("nr")).filter(1).run(client.conn)
  if (values[0] && values[0].nr) nr1 = values[0].nr
else nr1 = "1"
  let obj = { nr: nr1, id: guild.id, user: user, creator: creator, type: type, dscp: dscp }
  return obj;
}

module.exports.requireUncached = function(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}
module.exports.getLang = function(guild) {
    if (guild.settings.lang == "pl") {
        lang = require("./translations/pl.json")
    }
    else {
        lang = require("./translations/en.json")
    }
    return lang;
}

module.exports.convertPerms = function(perm, guild) {
    let converted;
    if (guild.settings.lang === "pl") {
switch (perm) {
    case 'dev':
        converted = "Programista"
        break;
    case 'tester':
        converted = "Tester"
        break;
    case 'admin':
        converted = "Administrator"
        break;
    case 'mod':
        converted = "Moderator"
        break;
    case 'user':
        converted = "Użytkownik"
        break;
}

    }
    if (guild.settings.lang === "en") {
        switch (perm) {
            case 'dev':
                converted = "Developer"
                break;
            case 'tester':
                converted = "Tester"
                break;
            case 'admin':
                converted = "Administrator"
                break;
            case 'mod':
                converted = "Moderator"
                break;
            case 'user':
                converted = "User"
                break;
        }

    }
    return converted;
}