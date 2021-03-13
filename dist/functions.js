"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.checkPerms = function (client, member) {
    let perms = [];
    perms.push("user");
    if (client.config.developer.includes(member.user.id))
        perms.push("dev");
    if (client.config.tester.includes(member.user.id))
        perms.push("tester");
    if (member.hasPermission("ADMINISTRATOR")) {
        perms.push("admin");
        perms.push("mod");
    }
    if (member.hasPermission("MANAGE_MESSAGES"))
        perms.push("mod");
    return perms;
};
module.exports.clean = (client, text) => __awaiter(void 0, void 0, void 0, function* () {
    if (text && text.constructor.name == "Promise")
        text = yield text;
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replaceAll(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
    return text;
});
module.exports.createCase = function (client, guild, user, creator, type, dscp) {
    return __awaiter(this, void 0, void 0, function* () {
        let values = yield client.db.table("Case").filter({ id: guild.id }).orderBy(client.db.desc("nr")).filter(1).run(client.conn);
        let nr1;
        if (values[0] && values[0].nr)
            nr1 = values[0].nr;
        else
            nr1 = "1";
        return { nr: nr1, id: guild.id, user: user, creator: creator, type: type, dscp: dscp };
    });
};
module.exports.requireUncached = function (module) {
    delete require.cache[require.resolve(module)];
    return require(module);
};
module.exports.getLang = function (guild) {
    let lang;
    if (!guild.settings)
        return new Error("xibon idioto czemu wsadzasz obiekt guild ktory nie ma settings!!!!");
    if (guild.settings.lang == "pl") {
        lang = require("./translations/pl.json");
    }
    else {
        lang = require("./translations/en.json");
    }
    return lang;
};
module.exports.convertPerms = function (perm, guild) {
    let converted;
    if (!guild.settings)
        return new Error("xibon idioto czemu wsadzasz obiekt guild ktory nie ma settings!!!!");
    if (guild.settings.lang === "pl") {
        switch (perm) {
            case 'dev':
                converted = "Programista";
                break;
            case 'tester':
                converted = "Tester";
                break;
            case 'admin':
                converted = "Administrator";
                break;
            case 'mod':
                converted = "Moderator";
                break;
            case 'user':
                converted = "Użytkownik";
                break;
        }
    }
    if (guild.settings.lang === "en") {
        switch (perm) {
            case 'dev':
                converted = "Developer";
                break;
            case 'tester':
                converted = "Tester";
                break;
            case 'admin':
                converted = "Administrator";
                break;
            case 'mod':
                converted = "Moderator";
                break;
            case 'user':
                converted = "User";
                break;
        }
    }
    return converted;
};
