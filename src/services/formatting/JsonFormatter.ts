import { IContentFormatter } from "./IContentFormatter";

export class JsonFormatter implements IContentFormatter {
  formatContent(content: string): string {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2); // Beautify JSON
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(
          `Could not parse or beautify the JSON content! ${error.message}`
        );
      } else {
        console.log("Could not parse or beautify the JSON content!");
      }
      return content;
    }
  }
}
