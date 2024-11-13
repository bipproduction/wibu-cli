import path from "path";
import fs from "fs/promises";
import loading from "loading-cli";
import dotenv from "dotenv";
import JsonToTS from "json-to-ts";
import dedent from "dedent";
const root = process.cwd();

const envServerText = dedent`
    import { Envs } from "@/types/Envs";

    export class EnvServer {
      static env: Envs | NodeJS.ProcessEnv;
      static init(env: Envs | NodeJS.ProcessEnv) {
        this.env = env;
      }
    }
  `;

const envClientClass = dedent`
 "use client";
  import { Envs } from "@/types/Envs";
  export class EnvClient {
    static env: Envs | NodeJS.ProcessEnv;
    static init(env: Envs | NodeJS.ProcessEnv) {
      this.env = env;
    }
  }

  export function EnvClientProvider({ env }: { env: string }) {
    try {
      EnvClient.init(JSON.parse(env));
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  `;

export async function generate() {
  let hasEnvFile = false;
  try {
    await fs.statfs(path.join(root, ".env"));
    hasEnvFile = true;
  } catch (error) {
    hasEnvFile = false;
  }
  if (!hasEnvFile) return console.log("no .env file");
  await fs.mkdir(path.join(root, "src/lib/client"), { recursive: true });
  await fs.mkdir(path.join(root, "src/lib/server"), { recursive: true });
  await fs.mkdir(path.join(root, "src/types"), { recursive: true });
  const log = loading("loading ...").start();
  const env = dotenv.parse(await fs.readFile(path.join(root, ".env"), "utf8"));
  const key = Object.keys(env);
  if (key.length === 0) return log.fail("no env");
  const types = JsonToTS(env)
    .map(
      (type, i) =>
        `export interface ${type.replace(/interface RootObject/g, "Envs")}`
    )
    .join("\n");

  await fs.writeFile(path.join(root, "src/types/Envs.d.ts"), types, "utf8");
  log.succeed("type env generated");

  await fs.writeFile(
    path.join(root, "src/lib/server/EnvServer.ts"),
    envServerText,
    "utf8"
  );
  log.succeed("env server generated");

  await fs.writeFile(
    path.join(root, "src/lib/client/EnvClient.ts"),
    envClientClass,
    "utf8"
  );
  log.succeed("env client generated");

  log.stop();
}
