/**
 * Options passed via CLI arguments
 */
export interface CliOptions {
  /** Path to the SVG file */
  file: string;
  /** Custom browser to use (optional) */
  browser?: string;
  /** Silent mode - no console output */
  silent: boolean;
  /** Output file path (optional) */
  output?: string;
}

/**
 * Result of SVG to Base64 conversion
 */
export interface ConversionResult {
  /** The data URI with base64 content */
  dataUri: string;
  /** Original file size in bytes */
  originalSize: number;
  /** Base64 encoded size */
  encodedSize: number;
}

/**
 * Action to perform after conversion
 */
export type CliAction = "browser" | "file";

/**
 * Result of the CLI operation
 */
export interface CliResult {
  success: boolean;
  message: string;
  dataUri?: string;
  outputPath?: string;
}
