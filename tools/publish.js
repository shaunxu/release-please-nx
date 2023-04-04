#!/usr/bin/env node
const cp = require("child_process");

const outputs = JSON.parse(process.argv[2]);

for (let key in outputs) {
    const value = outputs[key];
    const match = key.match(/^(.*\/.*)--release_created$/);
    if (!match || !value) {
        continue;
    }

    const workspace = match[1];
    const cwd = `./dist/${match[1]}`;
    console.log(`publishing ${workspace} at ${cwd} ......`);
    cp.spawnSync("npm", ["publish"], {
        cwd: cwd,
        stdio: "inherit"
    });
}