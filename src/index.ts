import { Command } from "commander";
import path from "path";
import { getAppName } from "./util/get-app-name";
import _ from "lodash";
import { getRootPath } from "./util/get-root-path";

(async () => {
  const program = new Command();
  const item = (name: Record<string, any>) =>
    _.keys(name)
      .filter((i) => i !== "index")
      .join(", ");

  const app = getAppName(path.join(await getRootPath(), "dist", "app"));
  for (const [key, value] of Object.entries(app)) {
    program
      .command(key + " <arg>")
      .description(item(value))
      .action((arg: string) => {
        if (!(arg in value)) {
          console.error("App not found");
          return;
        }
        value[arg]();
      });
  }

  program.exitOverride((err) => {
    if (err.code === "commander.missingArgument") {
      program.help();
    }
  });

  program.parse(process.argv);
})();
