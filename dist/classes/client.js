"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const r = __importStar(require("rethinkdb"));
const fs_1 = require("fs");
class AlcanClient extends discord_js_1.Client {
    constructor() {
        super({});
        this.conn = function () {
            return __awaiter(this, void 0, void 0, function* () { yield r.connect({ host: 'localhost', port: 28015 }); });
        }();
        this.cmds = new Map();
        this.aliases = new Map();
        this.color = "#6600ff";
        this.config = require('../config.json');
        this.version = "1.1.0";
        this.footer = `Alcan ${this.version}`;
        this.functions = require('./functions/index');
        this.db = r;
    }
    init(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this;
            const commands = fs_1.readdirSync("./commands");
            // Commands handler
            commands.forEach(function (cmd) {
                try {
                    let code = require(`./commands/${cmd}`);
                    let cmdname = cmd.split(".")[0];
                    client.cmds.set(cmdname, code);
                    // Aliases
                    code.help.aliases.forEach(function (alias) {
                        client.aliases.set(alias, cmdname);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            });
            const events = fs_1.readdirSync("./events");
            events.forEach(function (evt) {
                try {
                    let code = require(`./events/${evt}`);
                    let evtname = evt.split(".")[0];
                    client.on(evtname, code.bind(null, client));
                }
                catch (e) {
                    console.error(e);
                }
            });
            client.login(token);
        });
    }
}
exports.default = AlcanClient;
