import { cpSync, existsSync } from "node:fs";

const out = ".next/standalone";
if (!existsSync(out)) throw new Error("Run `next build` first.");
cpSync(".next/static", `${out}/.next/static`, { recursive: true });
if (existsSync("public")) cpSync("public", `${out}/public`, { recursive: true });
