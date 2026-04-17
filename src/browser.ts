import open, { apps } from "open";
import type { CliResult } from "./types.js";

/**
 * Opens the data URI in the default or specified browser
 * @param dataUri - The data URI to open
 * @param browser - Optional specific browser to use
 * @returns CliResult with success status
 */
export async function openBrowser(
  dataUri: string,
  browser?: string,
): Promise<CliResult> {
  try {
    const options: { app?: { name: string | readonly string[] } } = {};

    if (browser) {
      const appName = apps[browser as keyof typeof apps] ?? browser;
      options.app = {
        name: appName,
      };
    }

    await open(dataUri, options);

    return {
      success: true,
      message: browser ? `Opened in ${browser}` : "Opened in default browser",
      dataUri,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      success: false,
      message: `Failed to open browser: ${errorMessage}`,
    };
  }
}
