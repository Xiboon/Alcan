"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (guild) {
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
