import { ask, controlledSpawn } from "../utils/functions";

export const uninstall = async (): Promise<void> => {
  // check if configuration file already exists
  const does_uninstall = (
    await ask({
      type: "toggle",
      name: "does_uninstall",
      message: "are you sure to uninstall cosmokeeper ?",
      active: "yes",
      inactive: "no",
    })
  ).does_uninstall;
  if (!does_uninstall) process.exit(0);

  // unregister the git hooks directory
  controlledSpawn("git", [
    "config",
    "--unset",
    "--local",
    "core.hooksPath",
    "./cosmokeeper",
  ]);

  // return
  return Promise.resolve();
};
