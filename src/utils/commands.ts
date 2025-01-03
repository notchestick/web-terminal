import { fileSystem, currentPath, getCurrentDirectory } from './fileSystem';

interface CommandMap {
  [key: string]: (args: string[]) => string;
}

export const commands: CommandMap = {
  help: () => `Available commands:
  - help: Show this help message
  - ls [dir]: List directory contents
  - pwd: Print working directory
  - cd <dir>: Change directory
  - cat <file>: Display file contents
  - mkdir <name>: Create directory
  - touch <name>: Create file
  - clear: Clear the terminal`,
  
  ls: (args: string[]) => {
    const dir = getCurrentDirectory();
    if (!dir.children) return '';
    
    return Object.entries(dir.children)
      .map(([name, node]) => {
        if (node.type === 'directory') {
          return `\x1b[34m${name}/\x1b[0m`;
        }
        return name;
      })
      .join('  ');
  },
  
  pwd: () => currentPath[0],
  
  cd: (args: string[]) => {
    if (!args[0]) {
      currentPath[0] = '/home/guest';
      return '';
    }

    const newPath = args[0];
    if (newPath === '..') {
      const parts = currentPath[0].split('/').filter(Boolean);
      if (parts.length > 2) {
        parts.pop();
        currentPath[0] = '/' + parts.join('/');
      }
      return '';
    }

    const targetPath = currentPath[0] + '/' + newPath;
    const parts = targetPath.split('/').filter(Boolean);
    let current = fileSystem;
    
    for (const part of parts) {
      if (current.children?.[part] && current.children[part].type === 'directory') {
        current = current.children[part];
      } else {
        return `cd: ${newPath}: No such directory`;
      }
    }
    
    currentPath[0] = targetPath;
    return '';
  },

  cat: (args: string[]) => {
    if (!args[0]) return 'cat: missing file operand';
    
    const dir = getCurrentDirectory();
    if (dir.children?.[args[0]] && dir.children[args[0]].type === 'file') {
      return dir.children[args[0]].content || '';
    }
    return `cat: ${args[0]}: No such file`;
  },

  mkdir: (args: string[]) => {
    if (!args[0]) return 'mkdir: missing operand';
    
    const dir = getCurrentDirectory();
    if (!dir.children) dir.children = {};
    
    if (dir.children[args[0]]) {
      return `mkdir: cannot create directory '${args[0]}': File exists`;
    }
    
    dir.children[args[0]] = {
      name: args[0],
      type: 'directory',
      children: {}
    };
    
    return '';
  },

  touch: (args: string[]) => {
    if (!args[0]) return 'touch: missing file operand';
    
    const dir = getCurrentDirectory();
    if (!dir.children) dir.children = {};
    
    if (dir.children[args[0]]) {
      return `touch: cannot create file '${args[0]}': File exists`;
    }
    
    dir.children[args[0]] = {
      name: args[0],
      type: 'file',
      content: ''
    };
    
    return '';
  },

  clear: () => {
    const output = document.getElementById('terminal-output');
    if (output) {
      output.innerHTML = '';
    }
    return '';
  }
};

export function executeCommand(input: string): string {
  const [cmd, ...args] = input.trim().split(' ');
  const command = cmd.toLowerCase();
  
  if (command in commands) {
    return commands[command](args);
  }
  
  return `Command not found: ${input}. Type 'help' for available commands.`;
}