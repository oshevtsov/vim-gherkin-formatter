import { read, write, Document } from "gherkin-io";
import { FormatOptions } from "gherkin-formatter";

const optionsFormatter: FormatOptions = {
  separateStepGroups: true,
  lineBreak: "\n",
  indentation: "  ",
};

export const formatFile = (filepaths: string[]) => {
  filepaths.forEach((filepath) => {
    read(filepath)
      .then((docs: Document[]) => {
        docs.forEach((doc) => write(doc.uri, doc, optionsFormatter));
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  });
};
