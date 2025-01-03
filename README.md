# Web Terminal

A browser-based terminal emulator built with Astro and TypeScript that simulates a Linux-like environment.

## Features

- Command-line interface with common Unix commands
- Virtual file system with directory navigation
- Command history with up/down arrow navigation
- File operations (create, read)
- Color-coded directory listings

## Available Commands

- `help` - Show available commands
- `ls` - List directory contents
- `pwd` - Print working directory
- `cd <dir>` - Change directory
- `cat <file>` - Display file contents
- `mkdir <name>` - Create directory
- `touch <name>` - Create file
- `clear` - Clear the terminal

## Tech Stack

- Astro
- TypeScript
- Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```