import Module from "node:module";

module.exports = function(module: string): Module {
    delete require.cache[require.resolve(module)];
    return require(module);
}