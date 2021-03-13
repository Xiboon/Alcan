"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (perm, guild) {
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
