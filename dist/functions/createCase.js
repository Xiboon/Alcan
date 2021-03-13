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
module.exports = function (client, guild, user, creator, type, dscp) {
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
