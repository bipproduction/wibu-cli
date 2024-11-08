import { path as appPath } from "app-root-path";
import fs from "fs/promises";
import path from "path";
import readdirp from "readdirp";

export async function installModule(packageName: string) {
  const targetRoot = process.cwd();
  const sourceDir = path.join(appPath, "assets", packageName);
  for await (const entry of readdirp(sourceDir, {
    type: "directories"
  })) {
    const dir = entry.path;
    await fs.mkdir(path.join(targetRoot, dir), { recursive: true });
  }

  console.log("create dir support success");

  for await (const entry of readdirp(sourceDir)) {
    const filePath = entry.fullPath;
    const finalPath = entry.path.replace(".wibu", "");
    await fs.copyFile(filePath, path.join(targetRoot, finalPath));
    console.log("install file: ", finalPath);
  }

  console.log("install file success");
}
