import { path as appPath } from "app-root-path";
import { Command } from "commander";
import path from "path";
import { getAppName } from "./util/get-app-name";
import _ from "lodash";

const program = new Command();
const item = (name: Record<string, any>) =>
  _.keys(name)
    .filter((i) => i !== "index")
    .join(", ");

const install: Record<string, any> = getAppName("install");
const gen = getAppName("gen");
const git = getAppName("git");

const packageJson = require(path.join(appPath, "package.json"));
program
  .name("wibu-cli")
  .version(packageJson.version)
  .description("CLI untuk berbagai perintah utilitas wibu");

program
  .command("install <name>")
  .alias("i")
  .description(item(install))
  .action((name: string) => {
    if (!(name in install)) {
      console.error("App not found");
      return;
    }
    install[name].install();
  });

program
  .command("uninstall <name>")
  .alias("un")
  .description(item(install))
  .action((name: string) => {
    if (!(name in install)) {
      console.error("App not found");
      return;
    }
    install[name].uninstall();
  });

program
  .command("gen <name>")
  .description(item(gen))
  .action((name: string) => {
    if (!(name in gen)) {
      console.error("App not found");
      return;
    }
    gen[name].main();
  });

  program
  .command("git <name>")
  .description(item(git))
  .action((name: string) => {
    if (!(name in git)) {
      console.error("App not found");
      return;
    }
    git[name].main();
  });

program.exitOverride((err) => {
  if (err.code === "commander.missingArgument") {
    program.help();
  }
});

program.add;

program.parse(process.argv);
