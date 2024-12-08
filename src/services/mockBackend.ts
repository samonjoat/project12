import { read, utils } from 'xlsx';
import { MockColumn, MockFile, MockResponse } from '../types/mock';

class MockBackendService {
  private storage: Map<string, any> = new Map();

  async healthCheck(): Promise<MockResponse> {
    return { status: 'healthy' };
  }

  private getHeaderRow(worksheet: any, headerRowIndex: number): string[] {
    const range = utils.decode_range(worksheet['!ref']);
    const headers: string[] = [];
    
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = worksheet[utils.encode_cell({ r: headerRowIndex - 1, c: C })];
      headers[C] = cell ? cell.v : '';
    }
    
    return headers.filter(Boolean);
  }

  async previewFile(file: File, headerRow: number = 1): Promise<MockResponse> {
    try {
      if (!file || !file.name) {
        throw new Error('No file provided');
      }

      if (!file.name.match(/\.(xlsx|xls)$/i)) {
        throw new Error('Invalid file type. Only Excel files (.xlsx, .xls) are allowed');
      }

      // Read the Excel file
      const arrayBuffer = await file.arrayBuffer();
      const workbook = read(arrayBuffer);
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      
      // Get headers from specified row
      const headers = this.getHeaderRow(firstSheet, headerRow);
      
      // Get data starting from the row after headers
      const data = utils.sheet_to_json(firstSheet, { 
        header: headers,
        range: headerRow // Start from the row after headers
      });

      // Store file info
      this.storage.set(file.name, {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        headers,
        data: data.slice(0, 5) // Get first 5 rows for preview
      });

      return {
        columns: headers,
        data: data.slice(0, 5)
      };
    } catch (error) {
      console.error('Error processing file:', error);
      throw error instanceof Error ? error : new Error('Error processing file');
    }
  }

  async processFiles(
    masterFile: File,
    salesforceFiles: File[],
    mapping: Record<string, any>
  ): Promise<MockResponse> {
    try {
      if (!masterFile || !salesforceFiles.length || !mapping) {
        throw new Error('Missing required files or mapping');
      }

      // Store the processed files and mapping
      this.storage.set('masterFile', masterFile);
      this.storage.set('salesforceFiles', salesforceFiles);
      this.storage.set('mapping', mapping);

      return { 
        message: 'Processing complete',
        success: true
      };
    } catch (error) {
      console.error('Error processing files:', error);
      throw error instanceof Error ? error : new Error('Error processing files');
    }
  }
}

export const mockBackend = new MockBackendService();