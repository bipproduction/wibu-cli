import { installModule } from "../util/install-module";
import { uninstallModule } from "../util/uninstall-module";

export const install = async () => installModule("push-notification");
export const uninstall = async () => uninstallModule("push-notification");

