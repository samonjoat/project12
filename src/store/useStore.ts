import create from 'zustand';

interface ColumnMapping {
  sourceNameColumn: string;
  sourceValueColumn: string;
  targetColumn: string;
}

interface FileMapping {
  fileName: string;
  columnMappings: ColumnMapping[];
}

interface FileState {
  masterFile: File | null;
  salesforceFiles: File[];
  columnMapping: Record<string, FileMapping>;
  masterColumns: string[];
  sourceColumns: string[];
  processingLogs: string[];
  activeStep: number;
  headerRow: number;
  nameColumn: string;
  setMasterFile: (file: File | null) => void;
  setSalesforceFiles: (files: File[]) => void;
  setColumnMapping: (mapping: Record<string, FileMapping>) => void;
  setMasterColumns: (columns: string[]) => void;
  setSourceColumns: (columns: string[]) => void;
  addProcessingLog: (log: string) => void;
  setActiveStep: (step: number) => void;
  clearLogs: () => void;
  setHeaderRow: (row: number) => void;
  setNameColumn: (column: string) => void;
}

export const useStore = create<FileState>((set) => ({
  masterFile: null,
  salesforceFiles: [],
  columnMapping: {},
  masterColumns: [],
  sourceColumns: [],
  processingLogs: [],
  activeStep: 0,
  headerRow: 1,
  nameColumn: '',
  setMasterFile: (file) => set({ masterFile: file }),
  setSalesforceFiles: (files) => set({ salesforceFiles: files }),
  setColumnMapping: (mapping) => set({ columnMapping: mapping }),
  setMasterColumns: (columns) => set({ masterColumns: columns }),
  setSourceColumns: (columns) => set({ sourceColumns: columns }),
  addProcessingLog: (log) => set((state) => ({ 
    processingLogs: [...state.processingLogs, log] 
  })),
  setActiveStep: (step) => set({ activeStep: step }),
  clearLogs: () => set({ processingLogs: [] }),
  setHeaderRow: (row) => set({ headerRow: row }),
  setNameColumn: (column) => set({ nameColumn: column })
}));