import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { svgToBase64 } from "./converter.js";
import { openBrowser } from "./browser.js";
import { writeToFile } from "./file-writer.js";
import type { CliOptions, CliResult } from "./types.js";

interface Arguments {
  file: string;
  browser?: string;
  silent: boolean;
  output?: string;
  help?: boolean;
  version?: boolean;
  _: (string | number)[];
  $0: string;
}

async function main(): Promise<void> {
  const argv = yargs(hideBin(process.argv))
    .scriptName("svg-viewer")
    .usage("$0 <file> [options]")
    .positional("file", {
      describe: "Path to the SVG file",
      type: "string",
    })
    .option("browser", {
      alias: "b",
      type: "string",
      description: "Browser to use (e.g., chrome, firefox, safari)",
    })
    .option("silent", {
      alias: "s",
      type: "boolean",
      default: false,
      description: "Suppress console output",
    })
    .option("output", {
      alias: "o",
      type: "string",
      description: "Save data URI to file instead of opening browser",
    })
    .example("$0 ./icon.svg", "Open SVG in default browser")
    .example("$0 ./icon.svg -b firefox", "Open SVG in Firefox")
    .example("$0 ./icon.svg -o ./output.txt", "Save data URI to file")
    .example("$0 ./icon.svg -s", "Open silently")
    .demandCommand(1, "Please provide a file path")
    .strict()
    .help()
    .alias("help", "h")
    .version("1.0.0")
    .alias("version", "v")
    .parseSync() as Arguments;

  const file = argv._[0] as string;

  if (!file) {
    console.error("Error: Please provide a file path");
    process.exit(1);
  }

  const options: CliOptions = {
    file,
    browser: argv.browser,
    silent: argv.silent ?? false,
    output: argv.output,
  };

  // Log function that respects silent mode
  const log = (message: string): void => {
    if (!options.silent) {
      console.log(message);
    }
  };

  try {
    // Convert SVG to Base64
    log(`Converting ${file}...`);
    const conversion = await svgToBase64(file);

    if (!options.silent) {
      console.log(`Original size: ${conversion.originalSize} bytes`);
      console.log(`Encoded size: ${conversion.encodedSize} bytes`);
    }

    let result: CliResult;

    // Decide what to do based on options
    if (options.output) {
      // Save to file
      result = await writeToFile(conversion.dataUri, options.output);
    } else {
      // Open in browser
      result = await openBrowser(conversion.dataUri, options.browser);
    }

    if (result.success) {
      log(result.message);
      process.exit(0);
    } else {
      console.error(`Error: ${result.message}`);
      process.exit(1);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${errorMessage}`);
    process.exit(1);
  }
}

main();
