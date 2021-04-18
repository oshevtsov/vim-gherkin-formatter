#!/usr/bin/env node

import { read, write, Document } from "gherkin-io";
import { FormatOptions } from "gherkin-formatter";
import { Command } from "commander";

const optionsFormatter: FormatOptions = {
  separateStepGroups: true,
  lineBreak: "\n",
  indentation: "  ",
};

const program = new Command();

program
  .version("0.1.0")
  .arguments("<filepath>")
  .description("Gherkin formatter CLI", {
    filepath: "Input file path",
  })
  .action((filepath) => {
    read(filepath)
      .then((doc: Document[]) => {
        write(filepath, doc[0], optionsFormatter);
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  })
  .parse(process.argv);
