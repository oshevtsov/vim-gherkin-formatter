#!/usr/bin/env node

import commander, { Command } from "commander";
import { formatFile } from "./lib/formatter";

const program: commander.Command = new Command();

program
  .version("0.1.0")
  .arguments("<filepath>")
  .description("Gherkin formatter CLI", {
    filepath: "Input file path",
  })
  .action(formatFile)
  .parse(process.argv);
