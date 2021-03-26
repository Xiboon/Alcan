import Module from "node:module";

export default function(module: string): Module {
    delete require.cache[require.resolve(module)];
    return require(module);
}