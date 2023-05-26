import { ask, controlledSpawn } from "../utils/functions";
import * as fs from "fs";

const supported_hook = [
  // 'applypatch-msg',
  // 'pre-applypatch',
  // 'post-applypatch',
  // 'pre-commit',
  // 'pre-merge-commit',
  // 'prepare-commit-msg',
  "commit-msg"
  // 'post-commit',
  // 'pre-rebase',
  // 'post-checkout',
  // 'post-merge',
  // 'pre-push',
  // 'pre-receive',
  // 'update',
  // 'proc-receive',
  // 'post-receive',
  // 'post-update',
  // 'reference-transaction',
  // 'push-to-checkout',
  // 'pre-auto-gc',
  // 'post-rewrite',
  // 'sendemail-validate',
  // 'fsmonitor-watchman',
  // 'p4-changelist',
  // 'p4-prepare-changelist',
  // 'p4-post-changelist',
  // 'p4-pre-submit',
  // 'post-index-change'
];

export const add = async (): Promise<void> => {
  // select the interested webhooks
  const hooks = (
    await ask({
      type: "multiselect",
      name: "hooks",
      message: "Choose one or more hooks",
      instructions: false,
      choices: supported_hook.map(hook => ({ title: hook, value: hook }))
    })
  ).hooks;

  // copy corresponding hooks template
  hooks.forEach((hook: string) => {
    // caller ( sh file )
    fs.cpSync(
      __dirname + `/../../templates/caller/${hook}`,
      `./.cosmokeeper/${hook}`
    );
    controlledSpawn("chmod", ["u+x", `./.cosmokeeper/${hook}`]);
    // bin ( js file )
    fs.cpSync(
      __dirname + `/../../templates/bin/${hook}.ts`,
      `./.cosmokeeper/bin/${hook}.ts`
    );
  });
};
