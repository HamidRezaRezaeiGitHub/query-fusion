import { IContentFormatter } from "./IContentFormatter";

export class XmlFormatter implements IContentFormatter {
  formatContent(content: string): string {
    try {
      // Use require for better Jest compatibility
      const xmlFormatter = require("xml-formatter");
      return xmlFormatter(content, {
        indentation: "    ",
        collapseContent: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(
          `Could not parse or format the XML content! ${error.message}`
        );
      } else {
        console.log("Could not parse or format the XML content!");
      }
      return content;
    }
  }
}
