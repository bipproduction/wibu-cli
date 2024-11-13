import webpush from "web-push";
import fs from "fs/promises";
import dedent from "dedent";
import path from "path";
import { supportPackage } from "../util/support-package";
import { moduleInstall } from "../util/module-install";
import { getRootPath } from "../util/get-root-path";

export async function vapidkey() {
  const vapidKeys = webpush.generateVAPIDKeys();
  const publicKey = vapidKeys.publicKey;
  const privateKey = vapidKeys.privateKey;
  const targetEnv = path.join(process.cwd(), ".env");

  try {
    // Periksa apakah file .env ada, jika tidak, buat file kosong
    await fs.access(targetEnv);
  } catch (error) {
    await fs.writeFile(targetEnv, "", "utf8");
  }

  // Baca isi file .env dan pisahkan menjadi array baris
  const envList = (await fs.readFile(targetEnv, "utf8")).split("\n");

  const setEnvVariable = (key: string, value: string) => {
    const index = envList.findIndex((line) => line.startsWith(key + "="));
    if (index !== -1) {
      envList[index] = key + "=" + value; 
    } else {
      envList.push(key + "=" + value); 
    }
  };

  setEnvVariable("NEXT_PUBLIC_VAPID_PUBLIC_KEY", publicKey);
  setEnvVariable("VAPID_PRIVATE_KEY", privateKey);

  await fs.writeFile(targetEnv, envList.join("\n"), "utf8");

  // Tampilkan log sukses ke konsol
  console.log(dedent`
    VAPID keys successfully generated and written to .env
    NEXT_PUBLIC_VAPID_PUBLIC_KEY=${publicKey}
    VAPID_PRIVATE_KEY=${privateKey}
  `);
}

export async function install(){
  await supportPackage(
    "web-push @types/web-push",
    "install"
  );
  await moduleInstall(path.join(await getRootPath(), "assets", "web-push"));
}
