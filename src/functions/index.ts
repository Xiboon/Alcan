import { functions } from "../types"
import * as checkPerms from "./checkPerms"
import * as clean from "./clean"
import * as convertPerms from "./convertPerms"
import * as createCase from "./createCase"
import * as getLang from "./getLang"
import * as requireUncached from "./requireUncached"

module.exports = {
    "checkPerms": checkPerms,
    "clean": clean,
    "convertPerms": convertPerms,
    "createCase": createCase,
    "getLang": getLang,
    "requireUncached": requireUncached
}