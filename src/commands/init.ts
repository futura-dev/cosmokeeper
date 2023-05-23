import * as fs from "fs";
import { ask, controlledSpawn } from "../utils/functions";

export const init = async (): Promise<void> => {
  // check if configuration file already exists
  const does_override = (
    await ask({
      type: "toggle",
      name: "does_override",
      message:
        ".cosmokeeper configuration file already exists, do you want to override it ?",
      active: "yes",
      inactive: "no",
    })
  ).does_override;
  if (!does_override) process.exit(0);

  // create config file
  fs.writeFileSync(
    "./.cosmokeeper.json",
    JSON.stringify(
      {
        lint: {
          eslint: true,
          prettier: true,
          matches: "(.ts)$",
        },
        patterns: {
          branch: "/(w+/w+|main|master)/g",
        },
        // eslint-disable-next-line comma-dangle
      },
      null,
      2
    )
  );
  console.log(".cosmokeeper.json file was successfully created");

  // create .cosmokeeper folder
  fs.mkdirSync("./.cosmokeeper/bin", { recursive: true });

  // register the git hooks directory
  controlledSpawn("git", [
    "config",
    "--local",
    "core.hooksPath",
    ".cosmokeeper",
  ]);

  // TODO: call the cosmokeeper 'add' command

  // return
  return Promise.resolve();
};
