import fs from 'fs';
import path from 'path';

// Base path for our JSON files
const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const fileService = {
  /**
   * Read data from a JSON file
   * @param fileName Name of the JSON file (without extension)
   */
  readJsonFile: async <T>(fileName: string): Promise<T> => {
    try {
      const filePath = path.join(DATA_DIR, `${fileName}.json`);
      
      if (!fs.existsSync(filePath)) {
        // Return empty array or object if file doesn't exist
        return ([] as unknown) as T;
      }
      
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error reading ${fileName}.json:`, error);
      throw new Error(`Failed to read data from ${fileName}.json`);
    }
  },

  /**
   * Write data to a JSON file
   * @param fileName Name of the JSON file (without extension)
   * @param data Data to write
   */
  writeJsonFile: async <T>(fileName: string, data: T): Promise<void> => {
    try {
      const filePath = path.join(DATA_DIR, `${fileName}.json`);
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
      console.error(`Error writing to ${fileName}.json:`, error);
      throw new Error(`Failed to write data to ${fileName}.json`);
    }
  },

  /**
   * Check if a file exists
   * @param fileName Name of the JSON file (without extension)
   */
  fileExists: (fileName: string): boolean => {
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    return fs.existsSync(filePath);
  },

  /**
   * Generate a unique ID
   */
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
};
