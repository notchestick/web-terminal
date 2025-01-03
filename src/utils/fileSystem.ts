interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

export const fileSystem: FileSystemNode = {
  name: 'root',
  type: 'directory',
  children: {
    home: {
      name: 'home',
      type: 'directory',
      children: {
        guest: {
          name: 'guest',
          type: 'directory',
          children: {
            Documents: {
              name: 'Documents',
              type: 'directory',
              children: {
                'notes.txt': {
                  name: 'notes.txt',
                  type: 'file',
                  content: 'Welcome to the terminal!'
                }
              }
            },
            Downloads: {
              name: 'Downloads',
              type: 'directory',
              children: {}
            }
          }
        }
      }
    }
  }
};

export let currentPath = ['/home/guest'];

export function getCurrentDirectory(): FileSystemNode {
  let current = fileSystem;
  const parts = currentPath[0].split('/').filter(Boolean);
  
  for (const part of parts) {
    if (current.children?.[part]) {
      current = current.children[part];
    }
  }
  
  return current;
}