#!/usr/bin/env node

import commander, { Command } from "commander";
import { formatFile } from "./lib/formatter";

const program: commander.Command = new Command();

program
  .version("0.1.0")
  .arguments("<filepaths...>")
  .description("Gherkin formatter CLI", {
    filepaths: "Input file path(s) or pattern to search for.",
  })
  .action(formatFile)
  .parse(process.argv);
