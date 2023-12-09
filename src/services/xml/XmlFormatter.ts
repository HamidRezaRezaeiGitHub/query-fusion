import { IContentFormatter } from "../IContentFormatter";
import xmlFormatter from "xml-formatter";

export class XmlFormatter implements IContentFormatter {
  formatContent(content: string): string {
    try {
      return xmlFormatter(content, {
        indentation: "    ",
        collapseContent: true,
      });
    } catch (e: any) {
      console.log(`Could not parse or formt the XML content! ${e.message}`);
      return content;
    }
  }
}
