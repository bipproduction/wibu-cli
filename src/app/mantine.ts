import path from "path";
import { moduleInstall } from "../util/module-install";
import { getRootPath } from "../util/get-root-path";
import { supportPackage } from "../util/support-package";

export const install = async () => {
  await supportPackage(
    "@mantine/core @mantine/hooks postcss postcss-preset-mantine postcss-simple-vars",
    "install"
  );
  await moduleInstall(path.join(await getRootPath(), "assets", "mantine"));
};
