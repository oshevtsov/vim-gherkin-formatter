import { read, write, Document } from "gherkin-io";
import { FormatOptions } from "gherkin-formatter";

const optionsFormatter: FormatOptions = {
  separateStepGroups: true,
  lineBreak: "\n",
  indentation: "  ",
};

export const formatFile = (filepath: string) => {
  read(filepath)
    .then((doc: Document[]) => {
      write(filepath, doc[0], optionsFormatter);
    })
    .catch((err: Error) => {
      console.log(err.message);
    });
};
