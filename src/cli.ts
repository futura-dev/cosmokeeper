#! /usr/bin/env node
import { program } from "commander";
import { init } from "./commands/init";
import * as process from "process";
import { add } from "./commands/add";
import { uninstall } from "./commands/uninstall";

// program definition
program.name("@futura-dev/cosmokeeper").description("Cosmokeeper 🚦");

// 'init' command definition
program.command("init").action(async () => init());

// 'add' command definition
program.command("add").action(async () => add());

program.command("uninstall").action(async () => uninstall());

// parse program
program.parse(process.argv);
