import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const src = ".next/standalone";
if (!existsSync(src)) throw new Error("Run `pnpm build:node` first.");

const stage = join(tmpdir(), "advancio-azure-stage");
const zip = join(tmpdir(), "advancio-azure.zip");
rmSync(stage, { recursive: true, force: true });
rmSync(zip, { force: true });
mkdirSync(stage, { recursive: true });

for (const item of ["server.js", ".next", "public"]) {
  cpSync(join(src, item), join(stage, item), { recursive: true });
}

// Azure installs these at deploy time (SCM_DO_BUILD_DURING_DEPLOYMENT=true); app code is already bundled.
writeFileSync(join(stage, "package.json"), JSON.stringify({
  name: "advancio-booth",
  private: true,
  engines: { node: ">=22" },
  dependencies: { next: "16.3.4", react: "19.2.6", "react-dom": "19.2.6" },
}, null, 2));

const result = spawnSync(process.platform === "win32" ? "C:/Windows/System32/tar.exe" : "tar", ["-a", "-cf", zip, "-C", stage, "."], { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);
console.log(zip);
