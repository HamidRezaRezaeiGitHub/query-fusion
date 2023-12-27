import { IContentFormatter } from "./IContentFormatter";

export class JsonFormatter implements IContentFormatter {
  formatContent(content: string): string {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2); // Beautify JSON
    } catch (e: any) {
      console.log(`Could not parse or beutify the JSON content! ${e.message}`);
      return content;
    }
  }
}
