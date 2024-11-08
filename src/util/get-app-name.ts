import { directoryImport } from "directory-import";
import path from "path";
import { path as appPath } from "app-root-path";

export function getAppName(dirName: string) {
  const rawApp = directoryImport(path.join(appPath, "dist", dirName));
  const container: Record<string, any> = {};
  for (const [filePath, module] of Object.entries(rawApp)) {
    const appName = path.basename(filePath).replace(".js", "");
    if (!container[appName]) {
      container[appName] = {};
    }
    Object.assign(container[appName], module); // Gabungkan semua fungsi ke dalam objek berdasarkan nama direktori
  }
  return container;
}
