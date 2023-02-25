#!/usr/bin/env node

import { Command } from "commander";
import { formatFile } from "./lib/formatter";

const program: Command = new Command();

program
  .name("vim-gherkin-formatter")
  .version("0.2.0")
  .argument("<filepaths...>", "Input file path(s) or pattern to search for.")
  .description("Format Gherkin (cucumber) file(s).")
  .action(formatFile)
  .parse(process.argv);
