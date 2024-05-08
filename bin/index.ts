#!/usr/bin/env node
import { note, outro } from "@clack/prompts";
import { FileUtils } from "@code-shaper/shaper-utils";
import {
  copyTemplates,
  isEmptyDir,
  replaceStringInFiles,
} from "@npm-smith/utils/file";
import { install } from "@npm-smith/utils/install";
import {
  constructRootPackageName,
  handleWorkspaces,
  sortPackageJson,
} from "@npm-smith/utils/packages";
import * as emoji from "node-emoji";
import path from "path";
import color from "picocolors";
import { PROJECT_OPTIONS } from "./types";
import {
  PACKAGE_JSON,
  TEMPLATE_DIR,
  renderQuestions,
  renderTitle,
} from "./utils";

async function main(): Promise<void> {
  if (isEmptyDir()) {
    outro(
      color.red(
        `${emoji.get(
          "no_entry"
        )} This directory is empty. Create an app and try again...`
      )
    );
    process.exit(1);
  }
  if (!FileUtils.fileExists(PACKAGE_JSON)) {
    outro(color.red(`${emoji.get("no_entry")} No package.json found!`));
    process.exit(1);
  }

  renderTitle();

  note(
    "You have triggered the executable i.e. a package with sample custom hooks will be created in your project",
    color.blue("INFO")
  );

  const project: PROJECT_OPTIONS = await renderQuestions();
  const { isScoped, packageName, scopeName, destination, pkgManager } = project;
  const dstPath = path.join(process.cwd(), destination, packageName);

  copyTemplates(TEMPLATE_DIR, dstPath, ["__template__"]);
  replaceStringInFiles(
    dstPath,
    "{{rootPackageName}}",
    constructRootPackageName(packageName, isScoped, scopeName)
  );
  sortPackageJson(path.join(dstPath, "package.json"));

  await handleWorkspaces();
  await install(pkgManager, process.cwd());

  outro(color.green(`${emoji.get("partying")} You're all set!`));
}

main().catch(console.error);
