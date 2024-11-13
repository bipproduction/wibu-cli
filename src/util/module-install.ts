import fs from "fs/promises";
import path from "path";
import readdirp from "readdirp";

export async function moduleInstall(sourceAssetDir: string) {
  
  const targetRoot = process.cwd();
  for await (const entry of readdirp(sourceAssetDir)) {
    const targetPath = path.join(targetRoot, entry.path.replace(".wibu", ""));
    if (entry.dirent.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
    } else {
      await fs.mkdir(path.dirname(targetPath), { recursive: true }); // pastikan direktori target ada
      await fs.copyFile(entry.fullPath, targetPath);
      console.log("Installed file:", targetPath);
    }
  }

  console.log("Module installation completed successfully.");
}
