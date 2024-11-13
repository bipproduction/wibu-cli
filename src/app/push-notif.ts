import path from "path";
import { moduleInstall } from "../util/module-install";
import { getRootPath } from "../util/get-root-path";
import { moduleUninstall } from "../util/module-uninstall";
export const install = async () => moduleInstall(path.join(await getRootPath(), "assets", "push-notification"));
export const uninstall = async () => moduleUninstall(path.join(await getRootPath(), "assets", "push-notification"));