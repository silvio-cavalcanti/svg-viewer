import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import type { CliResult } from "./types.js";

/**
 * Writes the data URI to a file
 * @param dataUri - The data URI to write
 * @param outputPath - Path to the output file
 * @returns CliResult with success status and path
 * @throws Error if file cannot be written
 */
export async function writeToFile(
  dataUri: string,
  outputPath: string,
): Promise<CliResult> {
  try {
    // Ensure the directory exists
    const dir = dirname(outputPath);
    await mkdir(dir, { recursive: true });

    // Write the data URI to file
    await writeFile(outputPath, dataUri, "utf-8");

    return {
      success: true,
      message: `Data URI saved to: ${outputPath}`,
      dataUri,
      outputPath,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      success: false,
      message: `Failed to write output file: ${errorMessage}`,
    };
  }
}
