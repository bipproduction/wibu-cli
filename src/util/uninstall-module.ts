import { path as appPath } from "app-root-path";
import fs from "fs/promises";
import path from "path";
import readdirp from "readdirp";

export async function uninstallModule(packageName: string) {
  const targetRoot = process.cwd();
  const sourceDir = path.join(appPath, "assets", packageName);

  // Delete matching files in target
  for await (const entry of readdirp(sourceDir)) {
    const relativePath = entry.path.replace(".wibu", "");
    const targetFile = path.join(targetRoot, relativePath);

    try {
      await fs.unlink(targetFile);
      console.log(`Deleted file: ${targetFile}`);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        console.error(`Failed to delete file ${targetFile}:`, error);
      }
    }
  }

  console.log("Uninstall success");
}
