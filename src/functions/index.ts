import { functions } from '../types';
let checkPerms = require('./checkPerms');
let clean = require('./clean');
let convertPerms = require('./convertPerms');
let getLang = require('./getLang');
let createCase = require('./createCase');
let requireUncached = require('./requireUncached');

module.exports = {
	checkPerms: checkPerms,
	clean: clean,
	convertPerms: convertPerms,
	createCase: createCase,
	getLang: getLang,
	requireUncached: requireUncached
};
