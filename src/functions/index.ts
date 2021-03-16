import { functions } from '../types';
const checkPerms = require('./checkPerms');
const clean = require('./clean');
const convertPerms = require('./convertPerms');
const getLang = require('./getLang');
const createCase = require('./createCase');
const requireUncached = require('./requireUncached');
const getCase = require('./getCase');

module.exports = {
	getCase: getCase,
	checkPerms: checkPerms,
	clean: clean,
	convertPerms: convertPerms,
	createCase: createCase,
	getLang: getLang,
	requireUncached: requireUncached
};
