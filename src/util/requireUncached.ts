import Module from "node:module";

export default function requireUncached(module: string): Module {
    delete require.cache[require.resolve(module)];
    return require(module);
}