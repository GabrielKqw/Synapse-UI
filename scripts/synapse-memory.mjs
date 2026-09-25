#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";

const [command, ...args] = process.argv.slice(2);
const root = resolve(process.env.SYNAPSE_UI_ROOT || process.cwd());
const memoryDir = resolve(root, ".synapse-ui", "memories");
const validName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  console.error(`Synapse UI: ${message}`);
  process.exit(1);
}

function memoryPath(name) {
  if (!validName.test(name)) fail("memory names must use lowercase letters, digits, and single hyphens.");
  const file = resolve(memoryDir, `${name}.md`);
  if (relative(memoryDir, file).startsWith(`..${sep}`)) fail("memory path escapes the project store.");
  return file;
}

function option(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function escapeYaml(value) {
  return value.replace(/[\r\n]+/g, " ").replace(/"/g, '\\"').trim();
}

function tags(value) {
  const parsed = value.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean);
  if (!parsed.length || parsed.some((tag) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag))) {
    fail("--tags must be a comma-separated list of lowercase kebab-case tags.");
  }
  return [...new Set(parsed)];
}

function section(title, value) {
  return value ? `\n## ${title}\n\n${value.trim()}\n` : "";
}

function list() {
  if (!existsSync(memoryDir)) return [];
  return readdirSync(memoryDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.slice(0, -3))
    .sort();
}

if (command === "save") {
  const name = option("--name");
  const title = option("--title");
  const scope = option("--scope");
  const rule = option("--rule");
  const when = option("--when");
  const tagList = option("--tags");
  const avoid = option("--avoid");
  const example = option("--example");
  const evidence = option("--evidence") || "User-confirmed project convention";
  const replace = args.includes("--replace");
  if (!name || !title || !scope || !rule || !when || !tagList) {
    fail("save requires --name, --title, --scope, --rule, --when, and --tags.");
  }
  const file = memoryPath(name);
  if (existsSync(file) && !replace) fail(`'${name}' already exists; use --replace only after confirming replacement.`);
  const normalizedTags = tags(tagList);
  mkdirSync(memoryDir, { recursive: true });
  writeFileSync(file, `---\nschema: 1\nname: ${name}\ntitle: "${escapeYaml(title)}"\nscope: "${escapeYaml(scope)}"\ntags: [${normalizedTags.join(", ")}]\nevidence: "${escapeYaml(evidence)}"\n---\n\n# Rule\n\n${rule.trim()}\n${section("Applies when", when)}${section("Do not apply when", avoid)}${section("Example", example)}\n## Evidence\n\n${evidence.trim()}\n`, "utf8");
  console.log(`Saved ${name} at ${file}`);
} else if (command === "list") {
  const names = list();
  console.log(names.length ? names.join("\n") : "No Synapse UI memories saved in this project.");
} else if (command === "get") {
  const name = option("--name");
  if (!name) fail("get requires --name.");
  const file = memoryPath(name);
  if (!existsSync(file)) fail(`'${name}' does not exist in this project.`);
  process.stdout.write(readFileSync(file, "utf8"));
} else if (command === "find") {
  const query = option("--query");
  if (!query?.trim()) fail("find requires --query.");
  const normalized = query.toLocaleLowerCase();
  const matches = list().filter((name) =>
    name.includes(normalized) || readFileSync(memoryPath(name), "utf8").toLocaleLowerCase().includes(normalized),
  );
  console.log(matches.length ? matches.join("\n") : "No Synapse UI memories match that query.");
} else if (command === "delete") {
  const name = option("--name");
  if (!name) fail("delete requires --name.");
  if (!args.includes("--confirm")) fail("delete requires --confirm to prevent accidental loss.");
  const file = memoryPath(name);
  if (!existsSync(file)) fail(`'${name}' does not exist in this project.`);
  unlinkSync(file);
  console.log(`Deleted ${name} from ${memoryDir}`);
} else {
  fail("use one of: save, list, get, find, delete.");
}
