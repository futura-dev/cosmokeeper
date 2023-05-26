import * as fs from "fs";
import { ask, controlledSpawn } from "../utils/functions";
import { add } from "./add";

export const init = async (): Promise<void> => {
  // check if configuration file already exists
  let does_override = true;

  if (fs.existsSync("./.cosmokeeper.json")) {
    does_override = (
      await ask({
        type: "toggle",
        name: "does_override",
        message:
          ".cosmokeeper configuration file already exists, do you want to override it ?",
        active: "yes",
        inactive: "no"
      })
    ).does_override;
  }

  if (does_override) {
    // create config file
    fs.writeFileSync(
      "./.cosmokeeper.json",
      JSON.stringify(
        {
          lint: {
            eslint: true,
            prettier: true,
            matches: "(.ts)$"
          },
          patterns: {
            branch: "/(w+/w+|main|master)/g"
          }
          // eslint-disable-next-line comma-dangle
        },
        null,
        2
      )
    );
    console.log(".cosmokeeper.json file was successfully created");
  }

  // create .cosmokeeper folder
  fs.mkdirSync("./.cosmokeeper/bin", { recursive: true });

  // register the git hooks directory
  controlledSpawn("git", [
    "config",
    "--local",
    "core.hooksPath",
    ".cosmokeeper"
  ]);
  console.log("core.hooksPath was succesfully set with '.cosmokeep'");

  // call 'add' command
  add();
};
