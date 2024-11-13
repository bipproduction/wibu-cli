import path from "path";
import { getRootPath } from "../util/get-root-path";
import { moduleInstall } from "../util/module-install";

export async function install() {
  await moduleInstall(path.join(await getRootPath(), "assets", "wibu-push"));
}
