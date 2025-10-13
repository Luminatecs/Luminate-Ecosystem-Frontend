/**
 * CSV Utility Service
 * Handles CSV file reading, downloading, and parsing
 */

export class CSVUtilityService {
  /**
   * Read CSV file from File input
   */
  async readCSVFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as text'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Download CSV content as file
   */
  downloadCSV(csvContent: string, filename: string = 'download.csv'): void {
    // Create blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  }

  /**
   * Parse CSV string to array of objects
   */
  parseCSV(csvContent: string): Array<Record<string, string>> {
    const lines = csvContent.trim().split('\n');
    
    if (lines.length === 0) {
      return [];
    }

    // Get headers from first line
    const headers = this.parseCSVLine(lines[0]);

    // Parse data rows
    const data: Array<Record<string, string>> = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) continue;

      const values = this.parseCSVLine(line);
      
      // Create object from headers and values
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      data.push(row);
    }

    return data;
  }

  /**
   * Parse a single CSV line, handling quoted values
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote mode
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    // Add last field
    result.push(current.trim());

    return result;
  }

  /**
   * Validate CSV file
   */
  validateCSVFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (!file.name.endsWith('.csv')) {
      return {
        valid: false,
        error: 'File must be a CSV file (.csv extension)'
      };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size must be less than 5MB'
      };
    }

    // Check if file is empty
    if (file.size === 0) {
      return {
        valid: false,
        error: 'File is empty'
      };
    }

    return { valid: true };
  }

  /**
   * Format file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Convert array of objects to CSV string
   */
  arrayToCSV(data: Array<Record<string, any>>): string {
    if (data.length === 0) {
      return '';
    }

    // Get headers
    const headers = Object.keys(data[0]);
    
    // Create header row
    const headerRow = headers.map(header => this.escapeCSVValue(header)).join(',');

    // Create data rows
    const dataRows = data.map(row => {
      return headers.map(header => {
        const value = row[header];
        return this.escapeCSVValue(value);
      }).join(',');
    });

    // Combine header and data
    return [headerRow, ...dataRows].join('\n');
  }

  /**
   * Escape CSV value (add quotes if needed)
   */
  private escapeCSVValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    const str = String(value);

    // If value contains comma, quote, or newline, wrap in quotes
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      // Escape existing quotes by doubling them
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    }

    return str;
  }
}

export const csvUtilityService = new CSVUtilityService();
