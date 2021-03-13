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
const discord_js_1 = require("discord.js");
module.exports = (client, member) => __awaiter(void 0, void 0, void 0, function* () {
    let settings = yield client.db
        .table('ServerSettings')
        .get(member.guild.id)
        .run(client.conn);
    if (!settings.wenabled)
        return;
    member.guild.settings = settings;
    let lang = client.functions.getLang(member.guild).events.guildMemberAdd;
    let text = settings.wtext
        .replaceAll('{mention}', member.user)
        .replaceAll('{nick}', member.user.username)
        .replaceAll('{username}', member.user.tag)
        .replaceAll('{memberCount}', member.guild.memberCount)
        .replaceAll('{serverName}', member.guild.name);
    let embed = new discord_js_1.MessageEmbed()
        .setTitle(lang)
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(text)
        .setFooter(client.footer)
        .setColor(client.color);
    client.channels.cache.get(settings.wchannel).send(embed);
});
