"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (client, member) {
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
