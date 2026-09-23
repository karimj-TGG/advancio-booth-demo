import { spawnSync } from "node:child_process";

// Azure track: the app is served under a path on the shared marketing domain.
process.env.NEXT_PUBLIC_BASE_PATH ||= "/booth";

for (const args of [["node_modules/next/dist/bin/next", "build"], ["scripts/prepare-standalone.mjs"]]) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
