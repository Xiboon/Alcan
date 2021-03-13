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
const discord_js_1 = require("discord.js");
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
require('dayjs/locale/pl');
module.exports = function (client, message) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        if (message.channel.type === 'dm' || !message || !message.guild || !message.member)
            return;
        message.guild.settings = yield client.db
            .table('ServerSettings')
            .get(message.guild.id)
            .run(client.conn);
        const prefix = ((_a = message.guild.settings) === null || _a === void 0 ? void 0 : _a.prefix) || 'a!', args = message.content.slice(prefix.length).split(' '), cmdname = args.shift(), lang = client.functions.getLang(message.guild).events.message;
        dayjs_1.default.extend(duration_1.default);
        dayjs_1.default.extend(relativeTime_1.default);
        dayjs_1.default.locale((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.lang);
        let uptime = dayjs_1.default.duration(client.uptime || 0).humanize();
        message.lang = client.functions.getLang(message.guild)[cmdname];
        if (((_d = message.mentions.members) === null || _d === void 0 ? void 0 : _d.first()) === message.guild.me) {
            let embed = new discord_js_1.MessageEmbed()
                .setTitle('Alcan')
                .setDescription(`${lang.dscp} ${prefix}`)
                .addField(lang.guilds, client.guilds.cache.size)
                .addField(lang.users, client.users.cache.size)
                .addField(lang.channels, client.channels.cache.size)
                .addField('Uptime', uptime || '?');
            message.channel.send(embed);
        }
        if (message.content.startsWith(prefix)) {
            // @ts-ignore
            let cmd = client.cmds.get(cmdname) || client.cmds.get(client.aliases.get(cmdname));
            if (!cmd)
                return message.react('❌');
            let permsNeeded = cmd.help.perm;
            message.member.perms = client.functions.checkPerms(client, message.member, message.guild);
            if (!((_e = message.member.perms) === null || _e === void 0 ? void 0 : _e.includes(permsNeeded))) {
                let embed = new discord_js_1.MessageEmbed()
                    .setTitle(lang.perms1)
                    .setDescription(lang.perms2 + client.functions.convertPerms(permsNeeded, message.guild))
                    .setColor(client.color)
                    .setFooter(client.footer);
                return message.channel.send(embed);
            }
            cmd(client, message, args);
            if (cmd.help.category === 'dev')
                return;
        }
    });
};
