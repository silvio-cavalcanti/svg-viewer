import { readFile } from "fs/promises";
import type { ConversionResult } from "./types.js";

/**
 * Converts an SVG file to a Base64 data URI
 * @param filePath - Path to the SVG file
 * @returns ConversionResult with the data URI and size information
 * @throws Error if file cannot be read or is empty
 */
export async function svgToBase64(filePath: string): Promise<ConversionResult> {
  try {
    // Read the file as a buffer
    const buffer = await readFile(filePath);

    if (buffer.length === 0) {
      throw new Error("File is empty");
    }

    // Convert to base64
    const base64Content = buffer.toString("base64");

    // Build the complete data URI
    // Using data:image/svg+xml;base64,... format
    const dataUri = `data:image/svg+xml;base64,${base64Content}`;

    return {
      dataUri,
      originalSize: buffer.length,
      encodedSize: base64Content.length,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        throw new Error(`File not found: ${filePath}`);
      }
      if (error.message.includes("EACCES")) {
        throw new Error(`Permission denied: ${filePath}`);
      }
      throw error;
    }
    throw new Error(`Failed to convert SVG: ${String(error)}`);
  }
}
