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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageEmbed_1 = __importDefault(require("../classes/MessageEmbed"));
module.exports = (client, member) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let settings = yield client.db.table('ServerSettings').get(member.guild.id).run(client.conn);
    if (!settings.genabled)
        return;
    member.guild.settings = settings;
    let lang = client.functions.getLang(member.guild).events.guildMemberRemove;
    let text = settings.gtext
        .replaceAll('{mention}', member.user)
        .replaceAll('{nick}', member.user.username)
        .replaceAll('{username}', member.user.tag)
        .replaceAll('{memberCount}', member.guild.memberCount)
        .replaceAll('{serverName}', member.guild.name);
    let embed = new MessageEmbed_1.default()
        .setTitle(lang)
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(text);
    (_a = client.channels.cache.get(settings.gchannel)) === null || _a === void 0 ? void 0 : _a.send(embed);
});
