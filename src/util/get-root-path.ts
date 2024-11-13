import { path as appPath } from "app-root-path";
import fs from "fs/promises";
import path from "path";

export async function getRootPath() {
  const globalPath = appPath;
  const localPath = path.join(process.cwd(), "node_modules", "wibu-cli"); 

  try {
    await fs.access(localPath);
    return localPath;
  } catch (error) {
    return globalPath; 
  }
}
