import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export function supportPackage(
  packages: string,
  variant: "install" | "uninstall"
): Promise<void> {
  async function install() {
    console.log("Installing package:", packages);
    try {
      const result = await execPromise("yarn add " + packages);
      console.log("Package installed successfully:");
    } catch (error) {
      console.error("Failed to install package:", error);
    }
  }

  async function uninstall() {
    try {
      const result = await execPromise("yarn remove " + packages);
      if (result.stderr) {
        console.error("Error uninstalling package:", result.stderr);
      } else {
        console.log("Package uninstalled successfully:");
      }
    } catch (error) {
      console.error("Failed to uninstall package:", error);
    }
  }

  return variant === "install" ? install() : uninstall();
}
