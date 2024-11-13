import { directoryImport } from "directory-import";
import path from "path";

export function getAppName(absoluteDirPath: string) {
  const rawApp = directoryImport(absoluteDirPath);
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
