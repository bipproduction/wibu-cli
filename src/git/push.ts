import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";

const execPromise = util.promisify(exec);
export async function main() {
  const currentBranch = await execPromise("git branch --show-current");
  const branchName = currentBranch.stdout.trim();
  let { stdout } = await execPromise(
    "git diff --stat --unified=1 --ignore-space-change --diff-filter=ACMRT && git status"
  );
  stdout = stdout.substring(0, 2000);
  const tmpFilePath = path.join(os.tmpdir(), `commit_message.txt`);

  const text = await summarizeText(stdout);
  await fs.writeFile(tmpFilePath, text);
  await execPromise(
    `git add -A && git commit --file="${tmpFilePath}" && git push origin ${branchName}`
  );

  try {
    await fs.access(tmpFilePath); // Check if the file exists
    await fs.unlink(tmpFilePath); // Asynchronously delete the file
  } catch (err: any) {
    console.log("Error deleting file:", err);
  }
}

async function summarizeText(text: string) {
  const { pipeline, env } = await import("@huggingface/transformers");

  const summarizer = await pipeline(
    "summarization",
    "Xenova/distilbart-cnn-6-6",
    {
      dtype: "fp32", // Tentukan dtype sebagai 'float32' atau lainnya jika diperlukan
      device: "cpu", // Sesuaikan perangkat jika library mendukung opsi ini,
      session_options: { logSeverityLevel: 4, logVerbosityLevel: 4 },
      progress_callback: () => {
        console.clear();
        console.log("processing ...");
      }
    }
  );

  const result: any = await summarizer(text);
  const summary = result[0]["summary_text"];
  return summary;
}

