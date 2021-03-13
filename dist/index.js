"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./classes/client"));
const client = new client_1.default();
// Error handler
process.on('unhandledRejection', err => {
    console.error(`Unhandled rejection: ${err}`);
    // @ts-ignore
    client.users.cache.get('707675871355600967').send(`Błąd: \n\`\`\`${err.stack}\`\`\``);
});
client.init(client.config.token);
