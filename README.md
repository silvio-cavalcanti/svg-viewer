# SVG Viewer CLI

A command-line tool to instantly view SVG files in your browser by converting them to Base64 data URIs.

## What It Does

SVG Viewer CLI takes an SVG file, encodes it as a Base64 data URI, and opens it directly in your web browser. No need to set up a local server or manually encode files.

## Installation

### Global Installation

```bash
npm install -g @opencicd/svg-viewer
```

After installation, the `svg-viewer` command is available globally.

### One-Time Usage

No installation required:

```bash
npx @opencicd/svg-viewer ./icon.svg
```

## Quick Start

Open any SVG file in your default browser:

```bash
svg-viewer ./icon.svg
```

That's it! Your browser will open with the SVG displayed.

## Commands and Options

### Basic Usage

```bash
svg-viewer <file> [options]
@opencicd/svg-viewer <file> [options]
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--browser` | `-b` | Specify which browser to use (chrome, firefox, safari, edge) |
| `--output` | `-o` | Save the Base64 data URI to a file instead of opening browser |
| `--silent` | `-s` | Run without console output |
| `--help` | `-h` | Show help information |
| `--version` | `-v` | Show version number |

## Usage Examples

### Open in Default Browser

```bash
svg-viewer ./logo.svg
```

### Open in Specific Browser

```bash
svg-viewer ./icon.svg --browser firefox
svg-viewer ./logo.svg -b chrome
```

### Save Data URI to File

Instead of opening the browser, save the Base64 string to a file:

```bash
svg-viewer ./icon.svg --output ./icon-base64.txt
svg-viewer ./logo.svg -o ./output/data-uri.txt
```

The output file will contain the complete data URI:
```
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciP...
```

### Silent Mode

Suppress all console output:

```bash
svg-viewer ./icon.svg --silent
svg-viewer ./logo.svg -s -o ./output.txt
```

### Combine Options

Use multiple options together:

```bash
# Open in Firefox without console output
svg-viewer ./icon.svg -b firefox -s

# Save to file (browser option ignored when using -o)
svg-viewer ./icon.svg -o ./output.txt -b chrome
```

## Output Format

SVG Viewer CLI generates data URIs in the format:

```
data:image/svg+xml;base64,<base64-encoded-svg-content>
```

This format is:
- Supported by all modern browsers
- Valid for use in HTML `img` tags
- Valid for use in CSS `background-image`
- Embeddable in documents and emails

## Platform Support

SVG Viewer CLI works on:

- **macOS** - Uses the `open` command
- **Linux** - Uses `xdg-open`
- **Windows** - Uses the `start` command

Custom browser names are automatically mapped to the correct platform-specific command.

## Requirements

- Node.js 18 or higher

## Troubleshooting

### "Command not found" after global install

Make sure your npm global bin directory is in your PATH:

```bash
# Check the global bin path
npm bin -g

# Add to your shell profile (macOS/Linux)
export PATH="$(npm bin -g):$PATH"
```

### Browser doesn't open

If the browser doesn't open automatically:
1. Check that the SVG file exists and is readable
2. Try specifying the browser explicitly with `-b`
3. Check your system's default application associations

### Permission errors

If you encounter permission errors:
1. Ensure you have read access to the SVG file
2. When using `-o`, ensure you have write access to the output directory
3. The output directory will be created automatically if it doesn't exist

## License

MIT

## Support

For issues, feature requests, or contributions, please visit the [project repository](https://github.com/silvio-cavalcanti/svg-viewer).